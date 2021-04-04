import React from 'react';
import styles from "../styles/MainPage.module.scss";
import { IProfile } from '../types/Profile';
import config from '../config';
import { Link } from '@material-ui/core';

interface MainPageTeachersCardProps {
    user: IProfile;
}

export const MainPageTeachersCard: React.FC<MainPageTeachersCardProps> = ({ user }) => {
    return (
        <Link href={`/profile/${user.id}`}>
            <div className={styles.main_page__teacher_item}>
                <div className={styles.main_page__teacher_item_data}>
                    <div className={styles.main_page__teacher_item_data_surname}>{user.surname}</div>
                    <div className={styles.main_page__teacher_item_data_name}>{user.name}</div>
                    <div className={styles.main_page__teacher_item_data_patronymic}>{user.patronymic}</div>
                </div>
                <img src={`${config.serverURL}/${user.avatarUrl ? user.avatarUrl : config.noImage}`} />
            </div>
        </Link>
    )
}
