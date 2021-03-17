import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import styles from '../styles/News.module.scss';
import { MoreDetailsButton } from './MoreDetailsButton';

interface NewsSmallCardItemProps {
    header: string;
    src: string;
    datetime: Date;
    href: string;
}

export const NewsSmallCardItem: React.FC<NewsSmallCardItemProps> = ({ header, src, datetime, href }) => {
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
                    <time className={styles.news_page__datetime} dateTime={`<${datetime}>`}>{
                        Number(datetime.getDate()) > 9 ?
                            Number(datetime.getDate())
                            : `0${Number(datetime.getDate())}`
                    }.{
                            Number(datetime.getMonth()) + 1 > 9 ?
                                Number(datetime.getMonth()) + 1
                                : `0${Number(datetime.getMonth()) + 1}`
                        }.{datetime.getFullYear()}</time>
                    <MoreDetailsButton href={href} />
                </div>
            </Grid>
        </Grid>

    )
}
