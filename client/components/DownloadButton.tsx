import React from 'react';
import styles from '../styles/Common.module.scss';

interface DownloadButtonProps {
    href: string;
    text: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ href, text }) => {
    return (
        <a href={href} style={{ display: "flex", alignItems: "center" }} className={styles.button__download}>
            {text}
        </a>
    )
}
