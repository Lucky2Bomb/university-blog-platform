import React from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import styles from '../styles/News.module.scss';
import { MoreDetailsButton } from './MoreDetailsButton';
import DownloadIcon from '@material-ui/icons/Download';
import { convertDateToDD_MM_YYYY } from '../other/convertTime';

interface NewsSmallCardItemProps {
    header: string;
    src: string;
    datetime: Date;
    href: string;
    fileUrl?: string;
}

export const NewsSmallCardItem: React.FC<NewsSmallCardItemProps> = ({ header, src, datetime, href, fileUrl = "" }) => {
    const router = useRouter();
    return (
        <Grid container flexDirection="row">
            <Grid item xs={5}>
                <div className={styles.news_page__image_small_wrapper}>
                    <img src={src} alt="" />
                </div>
            </Grid>

            <Grid item xs={7}>
                <div className={styles.news_page__small_body}>
                    <h4 className={styles.news_page__h4}>{header.length < 120 ? header : `${header.substring(0, 120)}...`}</h4>
                    <div className={styles.news_page__datetime}>
                        {convertDateToDD_MM_YYYY(datetime)}
                    {fileUrl && <DownloadIcon fontSize="small" />}</div>
                    <MoreDetailsButton href={href} />
                </div>
            </Grid>
        </Grid>

    )
}
