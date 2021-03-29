import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import NavbarLayout from '../../layouts/NavbarLayout';
import { ControlPanel } from '../../components/ControlPanel';
import HeaderLayout from '../../layouts/HeaderLayout';

const Index = () => {
    return (
        <>
            <MainLayout>
                <NavbarLayout>
                    <HeaderLayout headerText="Панель управления">

                        <ControlPanel />
                    </HeaderLayout>
                </NavbarLayout>
            </MainLayout>
        </>
    )
}

export default Index;