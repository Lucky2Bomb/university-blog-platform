import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link, Button } from '@material-ui/core';
import rootStore from '../store/rootStore';
import { observer } from 'mobx-react-lite';
import { IGuestRequest } from './../types/Guest';
import { convertDateToDD_MM_YYYY, convertDateToHH_MM } from '../other/convertTime';
import { checkGuestApplication } from '../requests/guest/check-guest-application';

interface ControlPanelGuestRequestRowProps {
    guestRequest: IGuestRequest;
}

export const ControlPanelGuestRequestRow: React.FC<ControlPanelGuestRequestRowProps> = observer(({ guestRequest }) => {
    const [checked, setChecked] = useState(Boolean(guestRequest.checked));
    const [loading, setLoading] = useState(false);

    const [id, setId] = useState(guestRequest.id);
    const [fullName, setFullName] = useState(guestRequest.full_name);
    const [email, setEmail] = useState(guestRequest.email);
    const [createdAt, setCreatedAt] = useState(guestRequest.createdAt);
    const [updatedAt, setUpdatedAt] = useState(guestRequest.updatedAt);
    const [user, setUser] = useState(guestRequest.user);
    const [fullNameUser, setFullNameUser] = useState(user ? user.surname ?
        `${user.surname} ${user.name[0]}.${user.patronymic ? `${user.patronymic[0]}.` : ""}` :
        `${user.name}` : null);


    const dateCreate = new Date(createdAt);
    const dateUpdate = new Date(updatedAt);
    const sendChecked = () => {
        setLoading(true);
        checkGuestApplication(localStorage.getItem("token"), guestRequest.id).then((res) => {
            setUser(res.user);
            setChecked(Boolean(res.checked));
            setUpdatedAt(res.updatedAt);
            setFullNameUser(res.user ? res.user.surname ?
                `${res.user.surname} ${res.user.name[0]}.${res.user.patronymic ? `${res.user.patronymic[0]}.` : ""}` :
                `${res.user.name}` : null);
        }).finally(() => setLoading(false));
    }

    return (
        <TableRow>
            <TableCell align="right">{id}</TableCell>
            <TableCell>{fullName}</TableCell>
            <TableCell align="right">{email}</TableCell>
            <TableCell align="center"><Button onClick={sendChecked} variant={checked ? "outlined" : "contained"} disabled={checked}>{checked ? "проверено" : loading ? "загрузка..." : "отметить"}</Button></TableCell>
            <TableCell>{user && <Link href={`/profile/${user.id}`}>{fullNameUser}</Link>}</TableCell>
            <TableCell align="right">{convertDateToDD_MM_YYYY(dateCreate)} {convertDateToHH_MM(dateCreate)}</TableCell>
            <TableCell align="right">{convertDateToDD_MM_YYYY(dateUpdate)} {convertDateToHH_MM(dateUpdate)}</TableCell>
        </TableRow>
    );
});
