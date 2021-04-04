import React from 'react';
import styles from "../styles/MainPage.module.scss";
import { IProfile } from '../types/Profile';
import { MainPageTeachersCard } from './MainPageTeachersCard';

interface MainPageTeachersProps {
    users: IProfile[];
}

export const MainPageTeachers: React.FC<MainPageTeachersProps> = ({ users }) => {
    const usersArr = users.map(user => <MainPageTeachersCard key={`main_page_user_teacher_${user.id}`} user={user} />);
    return (
        // <div className={styles.main_page______}>
        <>
            {usersArr}
        </>
        // </div>
    )
}
