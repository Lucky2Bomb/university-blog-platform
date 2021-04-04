import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';

const mapState = { center: [55.411809, 55.525364], zoom: 17.5 };

export const YandexMap = () => {

    return (
        <YMaps>
            <Map width="100%" height="100%" state={mapState}>
            </Map>
        </YMaps>
    );
}