import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Paper, IconButton, Link } from '@material-ui/core';
import styles from '../styles/News.module.scss';
import { MoreDetailsButton } from './MoreDetailsButton';
import config from '../config';
import CloseIcon from '@material-ui/icons/Close';
import { deleteMyPublication } from '../requests/user/delete-my-publication';
import { DownloadButton } from './DownloadButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { convertDateToDD_MM_YYYY } from '../other/convertTime';
import { Comments } from './Comments';

interface ProfilePublicationCardProps {
    header: string;
    text: string;
    imageUrl: string;
    fileUrl: string;
    datetime: Date;
    href: string;
    publicationId: number;
    isMyProfile?: boolean;
    author: string;
    userId: number;
}

export const ProfilePublicationCard: React.FC<ProfilePublicationCardProps> = ({ header, href, text, imageUrl, fileUrl, datetime, author, userId, publicationId, isMyProfile = true }) => {

    const [isDisableDeleteButton, setIsDisableDeleteButton] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const deletePublication = () => {
        setIsDisableDeleteButton(true);
        deleteMyPublication(publicationId, localStorage.getItem("token")).then(() => {
            setIsDisableDeleteButton(false);
            setIsDelete(true);
        });
    }

    if (isDelete) {
        return null;
    }

    return (
        <Grid margin="10px 0" padding="0 15px 10px" border={`1px solid ${config.colors.gray300}`} borderRadius="5px">
            <div className={styles.news_page__large_body}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    flexWrap="nowrap"
                    gap={2}
                >
                    <Grid item>
                        <h3 className={styles.news_page__h3}>{header}</h3>
                    </Grid>
                    <Grid item>
                        {isMyProfile && <IconButton onClick={deletePublication} disabled={isDisableDeleteButton}>
                            <CloseIcon fontSize="small" />
                        </IconButton>}
                    </Grid>
                </Grid>
                <Link href={`${config.serverURL}/profile/${userId}`}>
                    <span>{author}</span>
                </Link>
                <div className={styles.news_page__datetime}>{convertDateToDD_MM_YYYY(datetime)}</div>
                <p className={styles.news_page__p}>{text.length < 200 ? text : `${text.substring(0, 200)}...`}</p>
                <Grid container direction="row" justifyContent="space-between">
                    <MoreDetailsButton href={href} /> {fileUrl && <DownloadButton href={fileUrl} text={"скачать прикреплённый файл"} />}
                </Grid>
            </div>
            <div className={styles.news_page__image_profile_publication_wrapper}>
                <img src={imageUrl} alt="" />
            </div>
            <Comments publicationId={publicationId} row={3}/>
        </Grid>

    )
}