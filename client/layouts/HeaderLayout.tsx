import React from 'react';
import styles from "../styles/Common.module.scss";

interface IHeaderLayoutProps { 
    headerText: string;
}

const HeaderLayout: React.FC<IHeaderLayoutProps> = ({ children, headerText }) => {
    return (
        <>
            <h1 className={styles.header__h1}>
                {headerText}
            </h1>
            <div className={styles.header__background}>
            </div>
            <div className={styles.header__margin_bottom}>
            </div>
            {children}
        </>
    )
}

export default HeaderLayout;