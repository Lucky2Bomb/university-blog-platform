import React from 'react';
import { Grid, Link } from '@material-ui/core';
import styles from '../styles/Footer.module.scss';

interface FooterProps {
}

export const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <footer>
            <hr />
            <Grid container>
                <Grid item xs={6}>
                    <div className={styles.footer__container}>
                        <div>Контакты:</div>
                        <div>
                            <Link href="tel:+79124567890" className={styles.footer__a}>+7(912)456-78-90</Link>
                        </div>
                        <div>
                            <Link href="mailto:mail@mail.ru" className={styles.footer__a}>mail@mail.ru</Link>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                    <Link href="/" className={styles.footer__footerbar_item}>главная</Link>
                    <Link href="/news" className={styles.footer__footerbar_item}>новости</Link>
                </Grid>
            </Grid>
        </footer>
    )
}
