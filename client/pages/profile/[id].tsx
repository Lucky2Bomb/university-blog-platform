import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import NavbarLayout from '../../layouts/NavbarLayout';
import HeaderLayout from '../../layouts/HeaderLayout';
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/rootStore';
import { GetServerSideProps } from 'next';
import config from '../../config';
import axios from 'axios';
import getMyProfile from '../../requests/user/my-profile';
import { Loading } from '../../components/Loading';
import { Profile } from '../../components/Profile';
import Router from 'next/router';
import { checkRelevanceOfToken } from '../../requests/auth/test-connection';
import { checkSubscribe } from './../../requests/user/subscibe';

interface IIsSubscibeResponce {
    message: boolean;
}

const anotherUserProfile = ({ profile }) => {
    const [anotherProfile, setAnotherProfile] = useState(profile);
    if (!profile) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <MainLayout>
                <NavbarLayout>
                    <HeaderLayout headerText={"ПРОФИЛЬ"}>
                        <Profile profile={anotherProfile} isMyProfile={false} />
                    </HeaderLayout>
                </NavbarLayout>
            </MainLayout>
        </>
    )
}

export default anotherUserProfile;


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get(`${config.serverURL}/user/${params.id}`);
    return {
        props: {
            profile: response.data,
        }
    }
}