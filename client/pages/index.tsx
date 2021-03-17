import React from 'react';
import MainLayout from './../layouts/MainLayout';
import NavbarLayout from '../layouts/NavbarLayout';
import styles from "../styles/MainPage.module.scss";
import { Container, Grid } from '@material-ui/core';

const Index = () => {
    return (
        <>
            <MainLayout>
                <NavbarLayout>
                    <Grid maxWidth="100vw">
                        <div className={styles.main_page__container}>
                            <div className={styles.main_page__background_image}> </div>
                            <div className={styles.main_page__rectangle}> </div>
                        </div>

                        <div className={styles.main_page__grid_blocks}>
                            <div className={styles.main_page__left_grid_item}> </div>
                            <div className={styles.main_page__right_grid_item}>
                                <h1 className={styles.main_page__h1_white}>БАШКИРСКИЙ</h1>
                                <h1 className={styles.main_page__h1_white}>ГОСУДАРСТВЕННЫЙ</h1>
                                <h1 className={styles.main_page__h1_white}>УНИВЕРСИТЕТ</h1>
                                <h3 className={styles.main_page__h3_white}>БИРСКИЙ ФИЛИАЛ</h3>
                                <div className={styles.main_page__button_more_info_university_block}>
                                    <button className={styles.main_page__button_more_info_university}>подробнее о поступлении в вуз</button>
                                </div>
                            </div>
                        </div>


                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    </Grid>
                </NavbarLayout>
            </MainLayout>
        </>
    )
}

export default Index;