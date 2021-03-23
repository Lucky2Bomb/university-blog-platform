import React, { useState, useEffect } from 'react';
import { Grid, Button, TableContainer, Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import styles from '../styles/Common.module.scss';
import { IProfile } from '../types/Profile';
import config from '../config';
import { getListSubscriptions } from './../requests/user/get-list-subscriptions';
import { Loading } from './Loading';
import { ProfileSubscriptionCard } from './ProfileSubscriptionCard';

interface ProfileSubscriptionsProps {
    profile: IProfile;
}

export const ProfileSubscriptions: React.FC<ProfileSubscriptionsProps> = ({ profile }) => {
    const [users, setUsers] = useState([]);
    const [allCount, setAllCount] = useState(11);
    const [currentCount, setCurrentCount] = useState(10);
    const [offset, setOffset] = useState(0);
    const [isDisabledMoreButton, setIsDisabledMoreButton] = useState(false);

    let userCards;
    const getMore = () => {
        getListSubscriptions(profile.id, currentCount, offset).then((item) => {
            setUsers([...users, ...item.users]);
            setAllCount(item.allCount);
            setCurrentCount(item.currentCount);
            setOffset(item.offset + currentCount);
            if (offset >= allCount) {
                setIsDisabledMoreButton(true);
            }
        });
    }

    useEffect(() => {
        getMore();
    }, []);

    if (users) {
        userCards = users.map((profile: IProfile) =>
            <ProfileSubscriptionCard profile={profile} key={`userSubCard${profile.id}`} />);
    }

    if (!users) {
        return <Loading />
    }
    return (
        <div>
            <Grid container justifyContent="flex-start" direction="row" gap={2}>
                {userCards}
            </Grid>
            <Grid container justifyContent="center">
                <Button disabled={isDisabledMoreButton} onClick={getMore}>Загрузить больше</Button>
            </Grid>
        </div>
    )
}