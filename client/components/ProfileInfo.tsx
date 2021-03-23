import React from 'react';
import { Grid, Button, TableContainer, Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import styles from '../styles/Common.module.scss';
import { IProfile } from '../types/Profile';
import config from '../config';

interface ProfileInfoProps {
    profile: IProfile;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
    return (
        <>
            <h2 className={styles.text__h2}>Данные профиля</h2>
            <Grid container gap={1}>
                <Grid item xs={2}>Имя:</Grid> <Grid item xs={8}>{profile.name}</Grid>
                <Grid item xs={2}>Фамилия:</Grid> <Grid item xs={8}>{profile.surname}</Grid>
                {profile.patronymic && <><Grid item xs={2}>Отчество:</Grid> <Grid item xs={8}>{profile.patronymic}</Grid></>}
                <Grid item xs={2}>Должность:</Grid> <Grid item xs={8}>{profile.positionName}</Grid>
                <Grid item xs={2}>Email:</Grid> <Grid item xs={8}>{profile.email}</Grid>
                <Grid item xs={2}>Телефон:</Grid> <Grid item xs={8}>{profile.phone_number}</Grid>
                <Grid item xs={2}>Facebook:</Grid> <Grid item xs={8}>{profile.facebook}</Grid>
                <Grid item xs={2}>Telegram:</Grid> <Grid item xs={8}>{profile.telegram}</Grid>
                <Grid item xs={2}>Vk:</Grid> <Grid item xs={8}>{profile.vk}</Grid>
                <Grid item xs={2}>Whatsapp:</Grid> <Grid item xs={8}>{profile.whatsapp}</Grid>
            </Grid>
        </>
    )
}