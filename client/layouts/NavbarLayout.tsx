import React from 'react';
import { Container } from '@material-ui/core';
import styles from "../styles/Main.module.scss";
import { Navbar } from '../components/Navbar';

interface INavbarLayoutProps { }

const NavbarLayout: React.FC<INavbarLayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}

        </>
    )
}

export default NavbarLayout;