import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { ControlPanelToolbar } from './ControlPanelToolbar';
import { IProfile, IProfileWithTables } from '../types/Profile';
import { RoleList } from '../other/role-list';
import { IRole } from './../types/Role';
import { convertDateToDD_MM_YYYY, convertDateToHH_MM } from './../other/convertTime';
import rootStore from '../store/rootStore';

interface ControlPanelTableRowProps {
    profile: IProfileWithTables;
    checkBoxHandle?(value: number, checked: boolean): void;
}

export const ControlPanelTableRow: React.FC<ControlPanelTableRowProps> = ({ profile, checkBoxHandle }) => {
    const date = new Date(profile.createdAt);
    const surnameNamePatronymic = `${profile.surname} ${profile.name} ${profile.patronymic}`;
    const roles = profile.userRoleLists.map(role => role.roleName);
    return (
        <TableRow key={`profile_row${profile.id}`}>
            <TableCell align="right"><input type="checkbox" onChange={(e) => checkBoxHandle(profile.id, e.target.checked)} /></TableCell>
            <TableCell align="right" onClick={() => { console.log(profile.id) }}>{profile.id}</TableCell>
            <TableCell component="th" scope="row">{surnameNamePatronymic}</TableCell>
            <TableCell align="right">{profile.positionName}</TableCell>
            <TableCell align="right">{profile.group && profile.group.name}</TableCell>
            <TableCell align="right">{convertDateToDD_MM_YYYY(date)} {convertDateToHH_MM(date)}</TableCell>
            <TableCell align="right">{roles.indexOf(RoleList.VERIFIED) > -1 ? <CheckIcon /> : <ClearIcon />}</TableCell>
        </TableRow>
    )
}

{/* 
<TableCell>ФИО</TableCell>
<TableCell align="right">ID</TableCell>
<TableCell align="right">Должность</TableCell>
<TableCell align="right">Группа</TableCell>
<TableCell align="right">Дата регистрации</TableCell>
<TableCell align="right">Верификация</TableCell> */}
