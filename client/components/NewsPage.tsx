import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import NavbarLayout from '../layouts/NavbarLayout';
import HeaderLayout from '../layouts/HeaderLayout';
import styles from '../styles/News.module.scss';
import { Button, Grid } from '@material-ui/core';
import { NewsLargeCardItem } from './NewsLargeCardItem';
import { NewsSmallCardItem } from './NewsSmallCardItem';
import { Footer } from './Footer';
import { getNews } from '../requests/news/get-news';
import { observer } from 'mobx-react-lite';
import rootStore from '../store/rootStore';
import { CardWithSmallCardItems } from './CardWithSmallCardItems';
import config from '../config';
import { INewsResponse } from '../types/News';
import { IPublication } from '../types/Publication';

interface NewsPageProps {
    publications: IPublication[];
    mainPublications: IPublication[];
    isDisabledMoreButton: boolean;
    setMorePublications;
    morePublications;
}

const NewsPage: React.FC<NewsPageProps> = observer(({ publications, mainPublications, setMorePublications, morePublications, isDisabledMoreButton }) => {
    const {
        allCount, currentCount, offset, countSize,
        setAllCount, setCurrentCount, setOffset
    } = rootStore.newsStore;

    const topSmallCardItems = mainPublications.slice(2, 6).map((publication) => {
        return <NewsSmallCardItem
            header={publication.header}
            src={`${config.serverURL}/${publication.pictureUrl ? publication.pictureUrl : config.noImage}`}
            datetime={new Date(publication.createdAt)}
            href={`/news/${publication.id}`}
            fileUrl={`${publication.fileUrl}`}
            key={publication.id}
        />
    }
    );

    const loadMoreNews = () => {
        setMorePublications(!morePublications);
    }
    return (
        <>
            <Grid container flexDirection="row" paddingTop="20px">
                <Grid item xs={12}>
                    <h2 className={styles.news_page__h2}>ПОСЛЕДНИЕ НОВОСТИ</h2>
                </Grid>
                <Grid item xs={6} paddingRight="10px">
                    <NewsLargeCardItem
                        header={mainPublications[0].header}
                        text={mainPublications[0].text}
                        src={`${config.serverURL}/${mainPublications[0].pictureUrl ? mainPublications[0].pictureUrl : config.noImage}`}
                        datetime={new Date((mainPublications[0].createdAt))}
                        href={`/news/${mainPublications[0].id}`}
                        key={mainPublications[0].id}
                    />
                    <NewsSmallCardItem
                        header={mainPublications[1].header}
                        src={`${config.serverURL}/${mainPublications[1].pictureUrl ? mainPublications[1].pictureUrl : config.noImage}`}
                        datetime={new Date(mainPublications[1].createdAt)}
                        href={`/news/${mainPublications[1].id}`}
                        fileUrl={`${mainPublications[1].fileUrl}`}
                        key={mainPublications[1].id}
                    />
                </Grid>

                <Grid item xs={6} paddingLeft="10px" container justifyContent="space-between" alignContent="space-between">
                    {topSmallCardItems}
                </Grid>
                <Grid item xs={12}>
                    <hr />
                    <h2 className={styles.news_page__h2}>ОСТАЛЬНЫЕ НОВОСТИ</h2>
                </Grid>
                <Grid item xs={12} container>

                    <CardWithSmallCardItems publications={publications} />

                    <Grid item xs={12} container justifyContent="center">
                        <Button onClick={loadMoreNews} disabled={isDisabledMoreButton}>Загрузить больше</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Footer />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
});

export default NewsPage;