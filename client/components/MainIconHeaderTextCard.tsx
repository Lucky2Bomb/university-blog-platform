import React from 'react';
import styles from "../styles/MainPage.module.scss";

interface MainIconHeaderTextCardProps {
    icon: any;
    header: string;
    text: string;
}

export const MainIconHeaderTextCard: React.FC<MainIconHeaderTextCardProps> = ({ icon, header, text }) => {
    return (
        <div className={styles.main_page__content_container_item}>
            <div className={styles.main_page__content_container_item_logo}>
                {icon}
            </div>

            <div className={styles.main_page__content_container_item_header}>
                <h3 className={styles.main_page__h3}>{header}</h3>
            </div>

            <div className={styles.main_page__content_container_item_text}>
                <p>{text}</p>
            </div>


        </div>
    )
}
