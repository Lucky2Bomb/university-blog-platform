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

interface ProfileBackgroundProps {
    profile: IProfile;
    isMyProfile?: boolean;
}

export const ProfileBackground: React.FC<ProfileBackgroundProps> = observer(({ profile, isMyProfile = true }) => {

    const [background, setBackground] = useState(null);
    const { goUpdateProfile } = rootStore.myProfile;

    useEffect(() => {
        if (background) {
            const formData = new FormData();
            formData.append("picture", background);
            uploadImage(formData, localStorage.getItem("token"), profileImageType.BACKGROUND).finally(() => goUpdateProfile());
        }
    }, [background]);

    return (
        <>
            <img src={`${config.serverURL}/${profile.backgroundUrl ? profile.backgroundUrl : `${config.noImage}`}`} alt=""
                style={{
                    width: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                    height: "250px"
                }} />
            {isMyProfile && <div className={styles.profile__background_upload}>
                <FileUpload setFile={setBackground} accept="image/*">
                    <span>Загрузить фон (до 2 мб)</span>
                </FileUpload>
            </div>}
        </>
    )
});
