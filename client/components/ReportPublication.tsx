import React, { useState, useEffect } from 'react';
import { Grid, Button, Link } from '@material-ui/core';
import rootStore from '../store/rootStore';
import { RoleList } from '../other/role-list';
import { reportPublication } from './../requests/publication/report';

interface ReportPublicationProps {
    publicationId: number,
}

export const ReportPublication: React.FC<ReportPublicationProps> = ({ publicationId }) => {
    const { roles } = rootStore.myProfile;
    const [textButton, setTextButton] = useState("Пожаловаться на публикацию");
    const [isDisableButton, setIsDisableButton] = useState(false);
    const sendReport = () => {
        reportPublication(publicationId, localStorage.getItem("token")).then(() => {
            setIsDisableButton(true);
            setTimeout(() => setTextButton("Жалоба отправлена"), 500);
        });
    }
    return (
        <>
            {roles.indexOf(RoleList.VERIFIED) > -1 && <Button variant="contained" disabled={isDisableButton} onClick={sendReport}>{textButton}</Button>}
        </>
    )
}