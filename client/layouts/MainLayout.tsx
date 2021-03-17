import React from 'react';
import { Container, Grid } from '@material-ui/core';
import styles from "../styles/MainLayout.module.scss";
import globalStyles from "../styles/global.js";
import Head from 'next/head';
import rootStore from '../store/rootStore';

interface IMainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: React.FC<IMainLayoutProps> = ({
    title,
    children,
    description,
    keywords
}) => {
    return (
        <>
            <Head>
                <title>{title || "Блог платформа БашГУ"}</title>
                <meta name="description" content={`Блог платформа Бирского филиала Башкирского государственного университета. ${description}`} />
                <meta name="robots" content="index, follow" />
                <meta name="keyword" content={keywords || "бирский филиал БашГУ, БашГУ, БГУ, сайт бирского филиала БашГУ"} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Container className={styles.main_container}>
                <Grid
                    justifyContent="center"
                    height="100vh"
                    maxHeight="100vh"
                    maxWidth="100vw"
                >
                    {children}
                    <style jsx global>{globalStyles}</style>
                </Grid>
            </Container>

        </>
    )
}

export default MainLayout;