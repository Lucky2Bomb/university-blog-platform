import React from 'react';
import { Grid, Link } from '@material-ui/core';
import styles from '../styles/Footer.module.scss';
import { NewsSmallCardItem } from './NewsSmallCardItem';
import { IPublication } from '../types/Publication';

interface CardWithSmallCardItemsProps {
    publications: IPublication[];
}

export const CardWithSmallCardItems: React.FC<CardWithSmallCardItemsProps> = ({ publications }) => {

    return (
        <>
            <Grid item xs={6} paddingRight="10px" paddingBottom="40px">
                <NewsSmallCardItem
                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    datetime={new Date(2021, 0, 1)}
                    href={"/"}
                />
            </Grid>

            <Grid item xs={6} paddingLeft="10px" paddingBottom="40px">
                <NewsSmallCardItem
                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    datetime={new Date(2021, 0, 1)}
                    href={"/"}
                />
            </Grid>

            <Grid item xs={6} paddingRight="10px" paddingBottom="40px">
                <NewsSmallCardItem
                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    datetime={new Date(2021, 0, 1)}
                    href={"/"}
                />
            </Grid>

            <Grid item xs={6} paddingLeft="10px" paddingBottom="40px">
                <NewsSmallCardItem
                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    datetime={new Date(2021, 0, 1)}
                    href={"/"}
                />
            </Grid>

            <Grid item xs={6} paddingRight="10px" paddingBottom="40px">
                <NewsSmallCardItem
                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    datetime={new Date(2021, 0, 1)}
                    href={"/"}
                />
            </Grid>

            <Grid item xs={6} paddingLeft="10px" paddingBottom="40px">
                <NewsSmallCardItem
                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    datetime={new Date(2021, 0, 1)}
                    href={"/"}
                />
            </Grid>

            <Grid item xs={6} paddingRight="10px" paddingBottom="40px">
                <NewsSmallCardItem
                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    datetime={new Date(2021, 0, 1)}
                    href={"/"}
                />
            </Grid>

            <Grid item xs={6} paddingLeft="10px" paddingBottom="40px">
                <NewsSmallCardItem
                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    datetime={new Date(2021, 0, 1)}
                    href={"/"}
                />
            </Grid>

            <Grid item xs={6} paddingRight="10px" paddingBottom="40px">
                <NewsSmallCardItem
                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    datetime={new Date(2021, 0, 1)}
                    href={"/"}
                />
            </Grid>

            <Grid item xs={6} paddingLeft="10px" paddingBottom="40px">
                <NewsSmallCardItem
                    header="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec turpis ex, laoreet at orci at, lobortis condimentum tellus."
                    src={"https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                    datetime={new Date(2021, 0, 1)}
                    href={"/"}
                />
            </Grid>
            
            <Grid item xs={12}>
                <hr />
            </Grid>
        </>
    )
}
