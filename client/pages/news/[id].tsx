import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Button, Grid, TextField, Link } from '@material-ui/core';
import Router from 'next/router';
import config from '../../config';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import styles from '../../styles/News.module.scss';
import { useInput } from './../../hooks/useInput';
import NavbarLayout from '../../layouts/NavbarLayout';
import HeaderLayout from '../../layouts/HeaderLayout';
import { MoreDetailsButton } from '../../components/MoreDetailsButton';
import { DownloadButton } from '../../components/DownloadButton';
import { Comments } from '../../components/Comments';
import { Footer } from '../../components/Footer';
import { convertDateToDD_MM_YYYY } from '../../other/convertTime';
import rootStore from '../../store/rootStore';
import { RoleList } from '../../other/role-list';
import { ReportPublication } from '../../components/ReportPublication';

const NewsMorePage = ({ serverPublicationData }) => {
    const { header, createdAt, text, author, userId, fileUrl, id } = serverPublicationData;
    const datetime = new Date(createdAt);
    const paragraphs = text.split('\\n').map((item, index) => <p key={index} className={styles.news_page__p} style={{ textIndent: "32px" }}>{item}</p>);

    return (
        <MainLayout>
            <NavbarLayout>
                <HeaderLayout headerText={"НОВОСТИ"}>
                    <Grid container gap={2}>
                        <Grid container item paddingTop="20px" justifyContent="space-between" xs={12}>
                            <Button
                                onClick={() => Router.push("/news")}
                                variant="outlined"
                            > Назад </Button>
                            <ReportPublication publicationId={id}/>
                        </Grid>
                        <Grid container item xs={12}>
                            <img src={`${config.serverURL}/${serverPublicationData.pictureUrl}`} alt=""
                                style={{
                                    width: "100%",
                                    maxWidth: "100%",
                                    objectFit: "cover",
                                    height: "400px"
                                }} />
                            <div className={styles.news_page__large_body}>
                                <h3 className={styles.news_page__h3}>{header}</h3>

                                <Grid container direction="row" gap={2} className={styles.news_page__datetime}>
                                    <Link href={`${config.serverURL}/profile/${userId}`}>
                                        <span>{author}</span>
                                    </Link>
                                    <div >{convertDateToDD_MM_YYYY(datetime)}</div>
                                </Grid>

                                {paragraphs}
                            </div>
                            <Grid container direction="row" justifyContent="space-between">
                                {fileUrl && <DownloadButton href={`${config.serverURL}/${fileUrl}`} text={"скачать прикреплённый файл"} />}
                            </Grid>
                            <Comments publicationId={id} />

                            <Grid item xs={12}>
                                <Footer />
                            </Grid>
                        </Grid>
                    </Grid>
                </HeaderLayout>
            </NavbarLayout>
        </MainLayout>
    )
}

export default NewsMorePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get(`${config.serverURL}/publication/${params.id}`);
    return {
        props: {
            serverPublicationData: response.data
        }
    }
}