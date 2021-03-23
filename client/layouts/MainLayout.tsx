import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import styles from "../styles/MainLayout.module.scss";
import globalStyles from "../styles/global.js";
import Head from 'next/head';
import { observer } from 'mobx-react-lite';
import rootStore from '../store/rootStore';
import { checkRelevanceOfToken } from '../requests/auth/test-connection';
import { getUserRoles } from '../requests/role/get-user-roles';
import { config } from 'process';
import { RoleList } from '../other/role-list';

interface IMainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: React.FC<IMainLayoutProps> = observer(({
    title,
    children,
    description,
    keywords
}) => {
    const { setAuth } = rootStore.authStore;
    const { setRoles } = rootStore.myProfile;
    useEffect(() => {
        if (localStorage.getItem("token")) {
            checkRelevanceOfToken(localStorage.getItem("token"))
                .then(value => {
                    setAuth(value);
                    if (!value) {
                        setAuth(value);
                        localStorage.removeItem("token");
                    }
                    getUserRoles(localStorage.getItem("token"))
                        .then(value => {
                            if (typeof value.map !== "undefined") {
                                setRoles(value.map(item => RoleList[item.roleName]));
                            }
                        });
                });

        }
    }, []);
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
});

export default MainLayout;