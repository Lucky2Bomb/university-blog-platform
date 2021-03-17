import React, { useEffect } from 'react';
import rootStore from '../store/rootStore';
import { observer } from 'mobx-react-lite';
import { NavbarItem } from './NavbarItem';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.scss';
import axios from 'axios';
import config from '../config';
import { checkRelevanceOfToken } from '../requests/auth/test-connection';

export const Navbar = observer(() => {
    const { isAuth, setAuth } = rootStore.authStore;
    const router = useRouter();
    useEffect(() => {
        const { isAuth, setAuth } = rootStore.authStore;
        if (localStorage.getItem("token")) {
            checkRelevanceOfToken(localStorage.getItem("token"))
                .then(value => {
                    setAuth(value);
                    if (!value) {
                        setAuth(value);
                        localStorage.removeItem("token");
                    }
                });
        }

    }, []);
    const styleNavbarContainer = router.pathname === "/" ? styles.navbar__container_special_style : styles.navbar__container;
    const styleLeftBlock = router.pathname === "/" ? styles.navbar__left_block_special_style : styles.navbar__left_block;
    const styleRightBlock = router.pathname === "/" ? styles.navbar__right_block_special_style : styles.navbar__right_block;
    const styleNavbarItem = router.pathname === "/" ? styles.navbar__item_special_style : styles.navbar__item;
    const styleNavbarItemActive = router.pathname === "/" ? styles.navbar__item_special_style_active : styles.navbar__item_active;
    return (
        <div className={styleNavbarContainer}>
            <div className={styleLeftBlock}>
                <NavbarItem href="/" text="Главная" className={router.pathname === "/" ? styleNavbarItemActive : styleNavbarItem} />
                <NavbarItem href="/news" text="Новости" className={router.pathname === "/news" ? styleNavbarItemActive : styleNavbarItem} />
            </div>

            <div className={styleRightBlock}>
                {!isAuth && <>
                    <NavbarItem href="/login" text="Вход" className={router.pathname === "/login" ? styleNavbarItemActive : styleNavbarItem} />
                    <NavbarItem href="/register" text="Регистрация" className={router.pathname === "/register" ? styleNavbarItemActive : styleNavbarItem} />
                </>}
                {isAuth && <>
                    <NavbarItem href="/profile" text="Профиль" className={router.pathname === "/profile" ? styleNavbarItemActive : styleNavbarItem} />
                    <NavbarItem href="/control-panel" text="Панель управления" className={router.pathname === "/control-panel" ? styleNavbarItemActive : styleNavbarItem} />
                    <a className={styleNavbarItem} onClick={() => {
                        localStorage.removeItem("token");
                        setAuth(false);
                        console.log("logout")
                    }}>Выход</a>
                </>}
            </div>
        </div>
    )
});