import React from 'react';
import { Grid, Link } from '@material-ui/core';
import styles from '../styles/Footer.module.scss';
import { NewsSmallCardItem } from './NewsSmallCardItem';
import { IPublication } from '../types/Publication';
import config from '../config';

interface CardWithSmallCardItemsProps {
    publications: IPublication[];
}

export const CardWithSmallCardItems: React.FC<CardWithSmallCardItemsProps> = ({ publications }) => {
    let everySecond = true;
    let smallCardItems = publications.map(publication => {
        everySecond = !everySecond;
        return <Grid item xs={6} paddingRight={!everySecond ? "10px" : "0"} paddingLeft={everySecond ? "10px" : "0"} paddingBottom="40px" key={`0${publication.id}`}>
            <NewsSmallCardItem
                header={publication.header}
                datetime={new Date(publication.createdAt)}
                src={`${config.serverURL}/${publication.pictureUrl ? publication.pictureUrl : "no-image.jpg"}`}
                href={`/news/${publication.id}`}
                key={publication.id}
                fileUrl={`${publication.fileUrl}`}
            />
        </Grid>
    });
    return (
        <>
            {smallCardItems}

            <Grid item xs={12}>
                <hr />
            </Grid>
        </>
    )
}
