import React, { useState, useEffect } from 'react';
import { Grid, Button, Link } from '@material-ui/core';
import styles from '../styles/Profile.module.scss';
import { IProfile, profileImageType } from '../types/Profile';
import config from '../config';

interface ProfileSubscriptionCardProps {
    profile: IProfile;
}

export const ProfileSubscriptionCard: React.FC<ProfileSubscriptionCardProps> = ({ profile }) => {
    return (
        <Grid item xs={2} container justifyContent="center">
            <Link href={`/profile/${profile.id}`} >
                <img src={`${config.serverURL}/${profile.avatarUrl ? profile.avatarUrl : `/${config.noImage}`}`} alt=""
                    style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "50%"
                    }}
                />
                <div className={styles.profile__surname}>{profile.surname}</div>
                <div className={styles.profile__name}>{profile.name}</div>
                {profile.patronymic && <div className={styles.profile__patronymic}>{profile.patronymic}</div>}
                <div className={styles.profile__position_name}>{profile.positionName}</div>
            </Link>
        </Grid>
    )
}