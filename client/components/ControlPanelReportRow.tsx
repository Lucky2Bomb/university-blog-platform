import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link, Button } from '@material-ui/core';
import rootStore from '../store/rootStore';
import { observer } from 'mobx-react-lite';
import { convertDateToDD_MM_YYYY, convertDateToHH_MM } from '../other/convertTime';
import { checkGuestApplication } from '../requests/guest/check-guest-application';
import { IReport } from '../types/Report';
import { checkReport } from './../requests/publication/report';

interface ControlPanelReportRowProps {
    report: IReport;
}

export const ControlPanelReportRow: React.FC<ControlPanelReportRowProps> = observer(({ report }) => {
    const [checked, setChecked] = useState(Boolean(report.checked));
    const [loading, setLoading] = useState(false);

    const [id, setId] = useState(report.id);
    const [createdAt, setCreatedAt] = useState(report.createdAt);
    const [user, setUser] = useState(report.user);
    const [fullNameUser, setFullNameUser] = useState(user ? user.surname ?
        `${user.surname} ${user.name[0]}.${user.patronymic ? `${user.patronymic[0]}.` : ""}` :
        `${user.name}` : null);


    const dateCreate = new Date(createdAt);
    const sendChecked = () => {
        setLoading(true);
        checkReport(report.id, localStorage.getItem("token")).then((res) => {
            setChecked(Boolean(res.checked));
        }).finally(() => setLoading(false));
    }

    return (
        <TableRow>
            <TableCell align="right">{id}</TableCell>
            <TableCell><Link href={`/profile/${user.id}`}>{fullNameUser}</Link></TableCell>
            <TableCell align="right"><Link href={`/news/${report.publicationId}`}>ссылка на публикацию</Link></TableCell>
            <TableCell align="center"><Button onClick={sendChecked} variant={checked ? "outlined" : "contained"} disabled={checked}>{checked ? "проверено" : loading ? "загрузка..." : "отметить"}</Button></TableCell>
            <TableCell align="right">{convertDateToDD_MM_YYYY(dateCreate)} {convertDateToHH_MM(dateCreate)}</TableCell>
        </TableRow>
    );
});

{/* <TableCell align="right"><b>№</b></TableCell>
<TableCell><b>ФИО</b></TableCell>
<TableCell align="right"><b>Публикация</b></TableCell>
<TableCell align="center"><b>Проверено</b></TableCell>
<TableCell align="right"><b>Дата создания заявки</b></TableCell> */}