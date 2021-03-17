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
                        <div><Link href="tel:+79124567890"><a className={styles.footer__a} href="tel:+79124567890">+7(912)456-78-90</a></Link></div>
                        <div><Link href="mailto:mail@mail.ru"><a className={styles.footer__a} href="mailto:mail@mail.ru">mail@mail.ru</a></Link></div>
                    </div>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                    <Link href="/"><a href="/" className={styles.footer__footerbar_item}>главная</a></Link>
                    <Link href="/news"><a href="/news" className={styles.footer__footerbar_item}>новости</a></Link>
                </Grid>
            </Grid>
        </footer>
    )
}
