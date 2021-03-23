import React from 'react';
import ForwardIcon from '@material-ui/icons/Forward';
import Link from 'next/link';
import styles from '../styles/Common.module.scss';

interface MoreDetailsButtonProps {
    href: string;
}

export const MoreDetailsButton: React.FC<MoreDetailsButtonProps> = ({ href }) => {
    return (
            <Link href={href} >
                <a style={{display: "flex", alignItems: "center"}} className={styles.button__more_details}>
                    Подробнее <ForwardIcon fontSize="medium"/>
                </a>
            </Link>
    )
}
