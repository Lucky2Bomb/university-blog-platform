import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import NavbarLayout from '../../layouts/NavbarLayout';
import HeaderLayout from '../../layouts/HeaderLayout';

const Index = () => {
    return (
        <>
            <MainLayout>
                <NavbarLayout>
                    <HeaderLayout headerText={"ПРОФИЛЬ"}>
                        
                    </HeaderLayout>
                </NavbarLayout>
            </MainLayout>
        </>
    )
}

export default Index;