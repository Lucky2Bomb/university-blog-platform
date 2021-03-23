import React from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import styles from '../styles/Common.module.scss';
import { IProfile } from '../types/Profile';
import config from '../config';
import { useInput } from '../hooks/useInput';
import { IProfileEdit } from './../types/Profile';
import { editMyProfile } from './../requests/user/edit-my-profile';
import Router from 'next/router';

interface ProfileSettingsProps {
    profile: IProfile;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile }) => {
    const name = useInput(profile.name);
    const surname = useInput(profile.surname);
    const patronymic = useInput(profile.patronymic);
    const phone_number = useInput(profile.phone_number);
    const email = useInput(profile.email);
    const facebook = useInput(profile.facebook);
    const telegram = useInput(profile.telegram);
    const vk = useInput(profile.vk);
    const whatsapp = useInput(profile.whatsapp);

    const send = () => {
        const profileData: IProfileEdit = {
            userId: profile.id,
            name: name.value,
            surname: surname.value,
            patronymic: patronymic.value,
            phone_number: phone_number.value,
            email: email.value,
            facebook: facebook.value,
            telegram: telegram.value,
            vk: vk.value,
            whatsapp: whatsapp.value
        }
        editMyProfile(localStorage.getItem("token"), profileData).then(() => {
            Router.reload();
        });
    };
    return (
        <>
            <h2 className={styles.text__h2}>Настройки профиля</h2>
            <Grid container direction="row">
                <Grid item xs={6} container gap={1} direction="column">
                    <Grid item><TextField {...name} label="имя" variant="standard" /></Grid>
                    <Grid item><TextField {...surname} label="фамилия" variant="standard" /></Grid>
                    <Grid item><TextField {...patronymic} label="отчество" variant="standard" /></Grid>
                    <Grid item><TextField {...phone_number} label="телефон" variant="standard" /></Grid>
                    <Grid item><TextField {...email} label="email" variant="standard" /></Grid>
                </Grid>

                <Grid item xs={6} container gap={1} direction="column">
                    <Grid item><TextField {...facebook} label="facebook" variant="standard" /></Grid>
                    <Grid item><TextField {...telegram} label="telegram" variant="standard" /></Grid>
                    <Grid item><TextField {...vk} label="vk" variant="standard" /></Grid>
                    <Grid item><TextField {...whatsapp} label="whatsapp" variant="standard" /></Grid>
                </Grid>
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={6} marginTop="10px">
                    <Button variant="contained" onClick={send}>Сохранить</Button>
                </Grid>
            </Grid>
        </>
    )
}