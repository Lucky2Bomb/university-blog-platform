import React from 'react';
import { Grid } from '@material-ui/core';
import styles from '../styles/Comment.module.scss';
import { IComment } from './../types/Comment';
import { convertDateToDD_MM_YYYY, convertDateToHH_MM } from '../other/convertTime';
import Position from './Position';

interface CommentCardProps {
    comment: IComment;
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    const commentDateCreate = new Date(comment.createdAt);
    return (
        <Grid container direction="row" paddingBottom="10px">
            <Grid item container gap={1}>
                <Grid className={styles.comment__author}>{comment.author}</Grid>
                <Grid className={styles.comment__position}>{<Position positionName={comment.authorPosition} className={null} />}</Grid>
                <Grid className={styles.comment__datetime}>{convertDateToDD_MM_YYYY(commentDateCreate)} {convertDateToHH_MM(commentDateCreate)}</Grid>
            </Grid>
            <Grid item className={styles.comment__text}>
                {comment.text}
            </Grid>
        </Grid>

    )
}
