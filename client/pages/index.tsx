import React, { useState, useRef } from 'react';
import MainLayout from './../layouts/MainLayout';
import NavbarLayout from '../layouts/NavbarLayout';
import styles from "../styles/MainPage.module.scss";
import { Container, Grid, TextField, Link } from '@material-ui/core';
import { MainIconHeaderTextCard } from '../components/MainIconHeaderTextCard';
import { getListTeachers } from '../requests/user/get-list-teachers';
import { MainPageTeachers } from '../components/MainPageTeachers';
import { IProfile } from '../types/Profile';
import { createGuestApplication } from '../requests/guest/create-guest-application';
import { useInput } from './../hooks/useInput';
import { YandexMap } from '../components/YandexMap';

const Index = ({ teachers }) => {
    const [isDisabledFeedback, setIsDisabledFeedback] = useState(false);
    const feedbackRef = useRef(null);
    const inputFullNameRef = useRef(null);

    const moreInfoButton = () => {
        feedbackRef.current.scrollIntoView();
        inputFullNameRef.current.focus();
    }

    const fullname = useInput("");
    const contacts = useInput("");
    const sendApplication = () => {
        createGuestApplication(fullname.value, contacts.value).then(() => setIsDisabledFeedback(true));
    }
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
                                    <button className={styles.main_page__button_more_info_university} onClick={moreInfoButton}>подробнее о поступлении в вуз</button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid maxWidth="100vw" marginTop="100vh">
                        <div className={styles.main_page__container_2}>
                            <div className={styles.main_page__h1_container}>
                                <h1 className={styles.main_page__h1}>ОБУЧАЯСЬ В НАШЕМ УНИВЕРСИТЕТЕ, <span className={styles.main_page__h2_you}>ВЫ</span> ПОЛУЧИТЕ БОЛЬШЕ, ЧЕМ ПРОСТО ЗНАНИЯ</h1>
                            </div>
                            <div className={styles.main_page__content_container_wrapper}>
                                <div className={styles.main_page__content_container}>
                                    <MainIconHeaderTextCard
                                        icon={<div className={styles.main_page__icon_biology} />}
                                        header={"СОВРЕМЕННОЕ НАУЧНОЕ ОБОРУДОВАНИЕ"}
                                        text={"В аудиториях университета установленно самое современное оборудование для комфортной и удобной работы студентов, лабарантов и преподавателей"} />

                                    <MainIconHeaderTextCard
                                        icon={<div className={styles.main_page__icon_online_learning} />}
                                        header={"УДОБНАЯ УДАЛЁННАЯ СИСТЕМА ДЛЯ ОБУЧЕНИЯ СТУДЕНТОВ"}
                                        text={"Специально для студентов и была разработана система удалённого обучения, для комфортного получения знаний в любом месте."} />

                                    <MainIconHeaderTextCard
                                        icon={<div className={styles.main_page__icon_university} />}
                                        header={"ГОСУДАРСТВЕННАЯ АККРЕДИТАЦИЯ"}
                                        text={"Каждый студент имеет возможность претендовать на бесплатное обучение за счёт государства.Так же все выпускники получают диплом государственного образца."} />
                                </div>

                                <div className={styles.main_page__content_container}>
                                    <MainIconHeaderTextCard
                                        icon={<div className={styles.main_page__icon_education} />}
                                        header={"КАЧЕСТВЕННОЕ ОБРАЗОВАНИЕ И ТРУДОУСТРОЙСТВО"}
                                        text={"Университет тесно взаимодействует с работодателем и помогает своим выпускникам устроиться, благодоря отвественному подходу к обучению."} />

                                    <MainIconHeaderTextCard
                                        icon={<div className={styles.main_page__icon_physics} />}
                                        header={"БОЛЬШОЙ НАУЧНЫЙ ОПЫТ РАБОТЫ"}
                                        text={"Университет имеет большую базу знаний, высококвалифицированных научных сотрудников, а так же открытую библиотеку для студентов."} />

                                    <MainIconHeaderTextCard
                                        icon={<div className={styles.main_page__icon_book} />}
                                        header={"ЕВРОПЕЙСКОЕ ПРИЛОЖЕНИЕ К ДИПЛОМУ"}
                                        text={"Каждый выпускник университета может по  собственному желанию получить Европейское приложение к диплому."} />
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid maxWidth="100vw" marginTop="200vh">
                        <div className={styles.main_page__container_3}>
                            <div className={styles.main_page__rectange_2}></div>
                            <div className={styles.main_page__rectange_3}></div>
                            <div className={styles.main_page__rectange_4}></div>
                            <div className={styles.main_page__rectange_5}></div>

                            <div style={{ marginLeft: "185px" }}>
                                <h1 className={styles.main_page__h1}>НАШИ СПЕЦИАЛИСТЫ</h1>
                            </div>

                            <div className={styles.main_page__teachers_container}>
                                <div className={styles.main_page__teachers_wrapper}>
                                    <MainPageTeachers users={teachers} />
                                </div>
                            </div>
                        </div>
                    </Grid>

                    <Grid maxWidth="100vw" marginTop="300vh">
                        <div className={styles.main_page__container_4}>
                            <div className={styles.main_page__feedback_container} ref={feedbackRef}>
                                <div className={styles.main_page__feedback_background_wrapper}><div className={styles.main_page__feedback_background} /></div>
                                <div className={styles.main_page__feedback}>
                                    <h2 className={styles.main_page__feedback_h2}>УКАЖИТЕ СВОИ КОНТАКТЫ И МЫ СВЯЖЕМСЯ С <span className={styles.main_page__span_red}>ВАМИ</span></h2>
                                    <p className={styles.main_page__feedback_text}>Оставьте заявку, указав данные ниже, и мы сможем связаться с вами</p>
                                    <div className={styles.main_page__feedback_form}>
                                        <input type="text" disabled={isDisabledFeedback} {...fullname} placeholder="ФИО" ref={inputFullNameRef} />
                                        <input type="text" disabled={isDisabledFeedback} {...contacts} placeholder="Контакты" />
                                        <button disabled={isDisabledFeedback} onClick={sendApplication}>{isDisabledFeedback ? "ЗАЯВКА ОТПРАВЛЕНА" : "ОТПРАВИТЬ ЗАЯВКУ"}</button>
                                    </div>
                                </div>
                            </div>
                            <footer className={styles.main_page__footer_container}>
                                <div className={styles.main_page__footer_map} >
                                    <YandexMap />
                                </div>
                                <div className={styles.main_page__footer_content} >

                                    <div className={styles.main_page__footer_content_address} >
                                        <h1 className={styles.main_page__footer_content_header} >
                                            АДРЕС ФИЛИАЛА:
                                        </h1>
                                        <ul>
                                            <li>г. Бирск, улица Интернациональная, 10</li>
                                            <li>+7 (999) 999 99-99</li>
                                            <li>+7 (999) 999 99-99</li>
                                        </ul>
                                    </div>

                                    <div className={styles.main_page__footer_content_footer_nav} >
                                        <div className={styles.main_page__footer_content_line} />
                                        <nav>
                                            <Link href="/">Главная</Link>
                                            <Link href="/news">Новости</Link>
                                            <Link href="/login">Вход</Link>
                                            <Link href="/register">Регистрация</Link>
                                            <Link href="https://vk.com/birskbgu">Мы вконтакте</Link>
                                        </nav>
                                    </div>

                                </div>
                            </footer>
                        </div>

                    </Grid>


                </NavbarLayout>
            </MainLayout>
        </>
    )
}

export async function getStaticProps() {
    const teachers = await getListTeachers();
    return {
        props: {
            teachers
        }
    }
}

export default Index;