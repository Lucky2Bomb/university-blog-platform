import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Grid, TextField } from '@material-ui/core';
import MainLayout from './../../layouts/MainLayout';
import styles from "../../styles/Form.module.scss";
import { useInput } from '../../hooks/useInput';
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/rootStore';
import login from './../../requests/auth/login';
import Router from 'next/router';

const Index = observer(() => {
    const loginField = useInput("");
    const passwordField = useInput("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [freezeButtons, setFreezeButtons] = useState(false);

    const { isAuth, setAuth, } = rootStore.authStore;

    const signin = async () => {
        try {
            setFreezeButtons(true);
            const token = (await login(loginField.value, passwordField.value)).token;
            localStorage.setItem("token", token);
            setAuth(true);
            setTimeout(() => {
                Router.push("/");
            }, 1000);
        } catch (error) {
            setAlertVisible(true);
            setAuth(false);
            console.log(error);
            setTimeout(() => {
                setAlertVisible(false);
            }, 5000);

        } finally {
            setTimeout(() => {
                setFreezeButtons(false);
            }, 1000);
        }
    }

    const signup = () => {
        setFreezeButtons(true);
        Router.push("/register");
        setTimeout(() => {
            setFreezeButtons(false);
        }, 1000);
    }

    const goMain = () => {
        setFreezeButtons(true);
        Router.push("/");
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
                        <h1> Вход </h1>
                    </Grid>
                    <Grid item xl={2} width="300px" className={styles.auth_input_form}  >
                        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                            <TextField {...loginField} required id="login" label="логин" variant="filled" fullWidth className={styles.auth_input_form} />
                            <TextField {...passwordField} required id="password" label="пароль" variant="filled" type="password" fullWidth className={styles.auth_input_form} />

                            <Grid width="300px" container justifyContent="space-evenly" className={styles.auth_input_form} >
                                <Button variant="outlined" className={styles.auth_input_form} onClick={signin} disabled={freezeButtons}>Войти</Button>
                                <Button variant="contained" className={styles.auth_input_form} onClick={signup} disabled={freezeButtons}>Регистрация</Button>
                            </Grid>

                            <Grid width="300px" container justifyContent="space-evenly">
                                <Button disabled={freezeButtons}>Забыл пароль</Button>
                            </Grid>

                            <Grid width="300px" container justifyContent="space-evenly">
                                <Button onClick={goMain} disabled={freezeButtons}>На главную</Button>
                            </Grid>

                            {alertVisible && <Grid width="300px" container justifyContent="space-evenly">
                                <Alert variant="filled" severity="error">
                                    Не правильный логин или пароль
                                    </Alert>
                            </Grid>}
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </MainLayout>
    )

});

export default Index;