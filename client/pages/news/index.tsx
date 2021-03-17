import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import NavbarLayout from '../../layouts/NavbarLayout';
import HeaderLayout from '../../layouts/HeaderLayout';
import styles from '../../styles/News.module.scss';
import { Button, Grid } from '@material-ui/core';
import { NewsLargeCardItem } from '../../components/NewsLargeCardItem';
import { NewsSmallCardItem } from '../../components/NewsSmallCardItem';
import { Footer } from '../../components/Footer';
import { getNews } from '../../requests/news/get-news';
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/rootStore';
import { CardWithSmallCardItems } from './../../components/CardWithSmallCardItems';
import config from '../../config';
import { INewsResponse } from '../../types/News';

const Index = ({newsResponse}) => {
    console.log(newsResponse.publications);
    const {
        allCount, currentCount, offset, publications,
        setAllCount, setCurrentCount, setOffset, setPublications
    } = rootStore.newsStore;

    let largeCardItem;
    let smallCardItem;

    useEffect(() => {
            setAllCount(newsResponse.allCount);
            setCurrentCount(newsResponse.currentCount);
            setOffset(newsResponse.offset);
            setPublications(publications.concat(newsResponse.publications));
    }, []);

    // largeCardItem = <NewsLargeCardItem
    //     header={publications[0].header}
    //     text={publications[0].text}
    //     src={`${config.serverURL}/${publications[0].pictureUrl}`}
    //     datetime={new Date(publications[0].createdAt)}
    //     href={`/news/${publications[0].id}`}
    // />

    // smallCardItem = <NewsSmallCardItem
    //     header={publications[1].header}
    //     src={`${config.serverURL}/${publications[1].pictureUrl}`}
    //     datetime={new Date(publications[1].createdAt)}
    //     href={`/news/${publications[1].id}`}
    // />
    return (
        <>
            <MainLayout>
                <NavbarLayout>
                    <HeaderLayout headerText={"НОВОСТИ"}>
                        <Grid container flexDirection="row" paddingTop="20px">
                            <Grid item xs={12}>
                                <h2 className={styles.news_page__h2}>ПОСЛЕДНИЕ НОВОСТИ</h2>
                            </Grid>
                            <Grid item xs={6} paddingRight="10px">
                                {/* {largeCardItem}
                                {smallCardItem} */}
                            </Grid>

                            <Grid item xs={6} paddingLeft="10px" container justifyContent="space-between" alignContent="space-between">
                                {/* <NewsSmallCardItem
                                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                                    datetime={new Date(2021, 0, 1)}
                                    href={"/"}
                                />

                                <NewsSmallCardItem
                                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                                    datetime={new Date(2021, 0, 1)}
                                    href={"/"}
                                />
                                <NewsSmallCardItem
                                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                                    datetime={new Date(2021, 0, 1)}
                                    href={"/"}
                                />
                                <NewsSmallCardItem
                                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                                    datetime={new Date(2021, 0, 1)}
                                    href={"/"}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <hr />
                                <h2 className={styles.news_page__h2}>ОСТАЛЬНЫЕ НОВОСТИ</h2>
                            </Grid>
                            <Grid item xs={12} container>

                                <CardWithSmallCardItems publications={[]} /> */}

                                <Grid item xs={12} container justifyContent="center">
                                    <Button>Загрузить больше</Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Footer />
                                </Grid>
                            </Grid>
                        </Grid>
                    </HeaderLayout>
                </NavbarLayout>
            </MainLayout>
        </>
    )
}

export default Index;

export async function getStaticProps() {
    const newsResponse = await getNews(16, 0);
    console.log(newsResponse)
    return {
        props: { newsResponse }
    }
}