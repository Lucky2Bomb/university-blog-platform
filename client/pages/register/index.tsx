import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Grid, Link, TextField } from '@material-ui/core';
import MainLayout from './../../layouts/MainLayout';
import styles from "../../styles/Form.module.scss";
import { useInput } from './../../hooks/useInput';
import config from '../../config';
import axios from 'axios';
import Router from 'next/router';
import register from './../../requests/auth/register';

const Index = () => {
    const name = useInput("");
    const surname = useInput("");
    const patronymic = useInput("");

    const login = useInput("");
    const password = useInput("");
    const passwordAgain = useInput("");
    const [timer, setTimer] = useState(null);
    const [isLoginExist, setIsLoginExist] = useState(false);
    const [freezeButtons, setFreezeButtons] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);

    const [isDisabledRegistrationButton, setIsDisabledRegistrationButton] = useState(false);

    useEffect(() => {
        checkLogin();
    }, [login.value]);

    const checkLogin = () => {
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(() => {
            fetchCheckLogin();
        }, 1000));
    }

    const fetchCheckLogin = async () => {
        const response = await axios.get(`${config.serverURL}/user/check-username-exists?username=${login.value}`);
        setIsLoginExist(response.data.message);
    }

    const registration = async () => {
        if (
            name.value.length >= 2 &&
            surname.value.length >= 2 &&
            login.value.length >= 4 &&
            password.value.length >= 6 &&
            password.value === passwordAgain.value &&
            !isLoginExist
        ) {
            setIsDisabledRegistrationButton(true);

            await register(login.value, password.value, name.value, surname.value, patronymic.value)
                .then(() => {
                    setSuccessAlertVisible(true);
                    setTimeout(() => {
                        setSuccessAlertVisible(false);
                        Router.push("/login");
                    }, 5000);
                })
                .catch(
                    (e) => {
                        setAlertVisible(true);
                        setTimeout(() => {
                            setAlertVisible(false);
                        }, 3000);
                    }
                );

            setTimeout(() => {
                setIsDisabledRegistrationButton(false);
            }, 1000);
        }
    }

    const goLogin = () => {
        setFreezeButtons(true);
        Router.push("/login");
        setTimeout(() => {
            setFreezeButtons(false);
        }, 1000);
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            Router.push("/");
        }
    }, []);
 
    return (
        <MainLayout>
            <Grid
                container
                height="100%"
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid>
                    <Grid item container justifyContent="center">
                        <h1> Регистрация </h1>
                    </Grid>
                    <Grid item xl={2} width="300px" className={styles.auth_input_form} >
                        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                            <TextField
                                {...name}
                                id="name"
                                required={true}
                                label="имя"
                                variant="filled"
                                fullWidth
                                error={name.value.length < 2 && true}
                                className={styles.auth_input_form}
                            />

                            <TextField
                                {...surname}
                                id="surname"
                                required={true}
                                label="фамилия"
                                variant="filled"
                                fullWidth
                                error={surname.value.length < 2 && true}
                                className={styles.auth_input_form}
                            />

                            <TextField
                                {...patronymic}
                                id="patronymic"
                                required={false}
                                label="отчество (если есть)"
                                variant="filled"
                                fullWidth
                                error={patronymic.value != "" ? (patronymic.value.length < 2 ? true : false) : false}
                                className={styles.auth_input_form}
                            />

                            <TextField
                                {...login}
                                id="login"
                                required={true}
                                label="логин"
                                variant="filled"
                                fullWidth
                                className={styles.auth_input_form}
                                error={isLoginExist || login.value.length < 4}
                                helperText={isLoginExist ? "Логин занят" : (login.value.length < 4 ? "длинна логина минимум 4 символа" : "Логин свободен")}
                            />

                            <TextField
                                {...password}
                                id="password"
                                required={true}
                                label="пароль"
                                variant="filled"
                                error={password.value != passwordAgain.value || password.value.length < 6}
                                helperText={password.value.length < 6 ? "длинна пароля минимум 6 символов" : false}
                                type="password"
                                fullWidth className={styles.auth_input_form}
                            />

                            <TextField
                                {...passwordAgain}
                                id="passwordAgain"
                                required={true}
                                label="пароль ещё раз"
                                variant="filled"
                                type="password"
                                error={password.value != passwordAgain.value}
                                helperText={password.value != passwordAgain.value ? "пароли не совпадают" : false}
                                fullWidth
                                className={styles.auth_input_form}
                            />

                            <Grid width="300px" container justifyContent="space-evenly" className={styles.auth_input_form} >
                                <Button variant="contained" className={styles.auth_input_form} onClick={registration} disabled={isDisabledRegistrationButton || freezeButtons}>Регистрация</Button>
                                <Button className={styles.auth_input_form} onClick={goLogin} disabled={freezeButtons}>Войти</Button>
                            </Grid>

                            {alertVisible && <Alert variant="filled" severity="error">
                                Произошла ошибка при регистрации
                            </Alert>}
                            {successAlertVisible && <Alert variant="filled" severity="success">
                                Вы успешно зарегистрировались! Теперь вы можете войти в систему
                            </Alert>}
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </MainLayout>
    )

}

export default Index;