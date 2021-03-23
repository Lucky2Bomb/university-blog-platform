import React from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import styles from '../styles/News.module.scss';
import { MoreDetailsButton } from './MoreDetailsButton';
import DownloadIcon from '@material-ui/icons/Download';
import { convertDateToDD_MM_YYYY } from '../other/convertTime';

interface NewsLargeCardItemProps {
    header: string;
    text: string;
    src: string;
    datetime: Date;
    href: string;
    fileUrl?: string;
}

export const NewsLargeCardItem: React.FC<NewsLargeCardItemProps> = ({ header, href, text, src, datetime, fileUrl ="" }) => {
    return (
        <Grid>
            <div className={styles.news_page__image_large_wrapper}>
                <img src={src} alt="" />
            </div>
            <div className={styles.news_page__large_body}>
                <h3 className={styles.news_page__h3}>{header}</h3>
                <div className={styles.news_page__datetime}>
                        <span>{convertDateToDD_MM_YYYY(datetime)}</span>
                    {fileUrl && <DownloadIcon fontSize="small" />}</div>
                <p className={styles.news_page__p}>{text.length < 200 ? text : `${text.substring(0, 200)}...`}</p>
                <MoreDetailsButton href={href} />
            </div>
        </Grid>

    )
}
