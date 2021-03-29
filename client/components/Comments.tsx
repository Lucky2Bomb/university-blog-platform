import React, { useState, useEffect } from 'react';
import styles from '../styles/Common.module.scss';
import { Grid, Button, TextField } from '@material-ui/core';
import { getPublicationComments } from '../requests/user/get-publication-comments';
import { IComment, ICommentsResponse } from './../types/Comment';
import { CommentCard } from './CommentCard';
import { useInput } from './../hooks/useInput';
import { sendComment } from '../requests/news/send-comment';
import { observer } from 'mobx-react-lite';
import { RoleList } from '../other/role-list';
import { checkRoleInArray } from '../other/checkRoles';
import rootStore from '../store/rootStore';
import Router from 'next/router';

interface CommentsProps {
    publicationId: number;
    row?: number;
}

export const Comments: React.FC<CommentsProps> = observer(({ publicationId, row = 6 }) => {
    const [comments, setComments] = useState([]);
    const [allCount, setAllCount] = useState(11);
    const [currentCount, setCurrentCount] = useState(10);
    const [offset, setOffset] = useState(0);
    const [commentText, setCommentText] = useState("");
    // const [isLoadComments, setIsLoadComments] = useState(false);
    const [isDisabledMoreButton, setIsDisabledMoreButton] = useState(false);
    const [isDisabledSendCommentButton, setIsDisabledSendCommentButton] = useState(false);
    const { roles } = rootStore.myProfile;


    const setPageData = (item: ICommentsResponse) => {
        setComments([...comments, ...item.comments]);
        setAllCount(item.allCount);
        setCurrentCount(item.currentCount);
        setOffset(item.offset + currentCount);
        if (offset >= allCount) {
            setIsDisabledMoreButton(true);
        }
    }
    const sendCommentEvent = () => {
        setIsDisabledSendCommentButton(true);
        sendComment(commentText, publicationId, localStorage.getItem("token")).then((item: IComment) => {
            setComments([item, ...comments]);
            setCommentText("");
        }).catch(e => {
            console.log(JSON.parse(e));

            Router.reload();
        }).finally(() => {
            setIsDisabledSendCommentButton(false);
        });
    }
    let commentCards = comments.map((comment: IComment) => <CommentCard comment={comment} key={`comment-${comment.id}`} />);
    const loadComments = () => {
        getPublicationComments(publicationId, currentCount, offset).then((item: ICommentsResponse) => {
            setPageData(item);
        });
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <hr />
                {commentCards}
            </Grid>
            <Grid container justifyContent="center">
                <Button onClick={loadComments} disabled={isDisabledMoreButton}>Загрузить комментарии</Button>
            </Grid>

            {(typeof roles !== "undefined" &&
                (checkRoleInArray(roles, RoleList.ADMIN) ||
                    checkRoleInArray(roles, RoleList.VERIFIED))
            ) && <Grid container marginTop="10px">
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Текст комментария..."
                        rows={row}
                        fullWidth
                        multiline
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <Grid container justifyContent="flex-end" marginTop="10px">
                        <Button variant="contained" disabled={isDisabledSendCommentButton} onClick={sendCommentEvent}>Отправить</Button>
                    </Grid>
                </Grid>}
        </Grid >
    )
});
