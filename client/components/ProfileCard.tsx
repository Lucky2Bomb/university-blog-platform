import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import styles from '../styles/Profile.module.scss';
import { IProfile, profileImageType } from '../types/Profile';
import config from '../config';
import FileUpload from './FileUpload';
import { uploadImage } from './../requests/user/upload-image';
import Router from 'next/router';
import rootStore from '../store/rootStore';
import { observer } from 'mobx-react-lite';
import { getCountSubscribers, subscribe, unsubscribe, checkSubscribe } from '../requests/user/subscibe';

interface ProfileCardProps {
    profile: IProfile;
    isMyProfile?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = observer(({ profile, isMyProfile = true }) => {
    const [avatar, setAvatar] = useState(null);
    const { goUpdateProfile } = rootStore.myProfile;
    const [isSubscribe, setIsSubscribe] = useState(null);
    const [countSubscribers, setCountSubscribers] = useState(0);
    useEffect(() => {
        if (avatar) {
            const formData = new FormData();
            formData.append("picture", avatar);
            uploadImage(formData, localStorage.getItem("token"), profileImageType.AVATAR).finally(() => goUpdateProfile());
        }
    }, [avatar]);
    useEffect(() => {
        getCountSubscribers(profile.id).then((data) => {
            setCountSubscribers(data.message);
        });
    }, [isSubscribe]);

    const subscribeHandler = () => {
        subscribe(profile.id, localStorage.getItem("token")).then(() => {
            setIsSubscribe(true);
            setCountSubscribers(countSubscribers + 1);
        });
    }

    const unsubscribeHandler = () => {
        unsubscribe(profile.id, localStorage.getItem("token")).then(() => {
            setIsSubscribe(false);
            setCountSubscribers(countSubscribers - 1);
        });
    }

    let button = (!isSubscribe) ?
        <Button variant="contained" onClick={subscribeHandler} fullWidth>Подписаться</Button>
        : <Button variant="outlined" onClick={unsubscribeHandler} fullWidth>Отписаться</Button>;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            checkSubscribe(profile.id, localStorage.getItem("token")).then(value => {
                setIsSubscribe(value.message);
            }).catch(() => {
                setIsSubscribe(null);
            });
        }
    }, []);
    return (
        <div className={styles.profile__wrapper}>
            <img src={`${config.serverURL}/${profile.avatarUrl ? profile.avatarUrl : `/${config.noImage}`}`} alt=""
                style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                }}
            />
            {isMyProfile && <div className={styles.profile__avatar_upload}>
                <FileUpload setFile={setAvatar} accept="image/*">
                    <p>загрузить аватар (до 1 мб)</p>
                </FileUpload>
            </div>}
            <div className={styles.profile__surname}>{profile.surname}</div>
            <div className={styles.profile__name}>{profile.name}</div>
            {profile.patronymic && <div className={styles.profile__patronymic}>{profile.patronymic}</div>}
            <div className={styles.profile__position_name}>{profile.positionName}</div>

            {isSubscribe !== null && !isMyProfile ? button : null}
            <div className={styles.profile__readers}>
                Читателей: <span className={styles.profile__readers_count}>{countSubscribers}</span>
            </div>
        </div>
    )
});