import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import styles from '../styles/News.module.scss';
import { MoreDetailsButton } from './MoreDetailsButton';

interface NewsLargeCardItemProps {
    header: string;
    text: string;
    src: string;
    datetime: Date;
    href: string;
}

export const NewsLargeCardItem: React.FC<NewsLargeCardItemProps> = ({ header, href, text, src, datetime }) => {
    return (
        <Grid>
            <div className={styles.news_page__image_large_wrapper}>
                <img src={src} alt="" />
            </div>
            <div className={styles.news_page__large_body}>
                <h3 className={styles.news_page__h3}>{header}</h3>
                <time className={styles.news_page__datetime} dateTime={`<${datetime}>`}>{
                    Number(datetime.getDate()) > 9 ?
                        Number(datetime.getDate())
                        : `0${Number(datetime.getDate())}`
                }.{
                        Number(datetime.getMonth()) + 1 > 9 ?
                            Number(datetime.getMonth()) + 1
                            : `0${Number(datetime.getMonth()) + 1}`
                    }.{datetime.getFullYear()}</time>
                <p className={styles.news_page__p}>{text.length < 200 ? text : `${text.substring(0, 200)}...`}</p>
                <MoreDetailsButton href={href} />
            </div>
        </Grid>

    )
}
