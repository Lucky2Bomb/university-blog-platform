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

const Index = observer(() => {
    const [profile, setProfile] = useState(null);
    const { updateProfile } = rootStore.myProfile;
    useEffect(() => {
        getMyProfile(localStorage.getItem("token"))
            .then(profile => setProfile(profile))
            .catch(() => {
                Router.push("/login");
            });
    }, [updateProfile]);
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
                        <Profile profile={profile} isMyProfile={true}/>
                    </HeaderLayout>
                </NavbarLayout>
            </MainLayout>
        </>
    )
});

export default Index;

// const { setProfile } = rootStore.myProfile;

// useEffect(() => {
//     getMyProfile(localStorage.getItem("token")).then((item) => setProfile(item));
// }, []);