import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import rootStore from '../store/rootStore';
import { observer } from 'mobx-react-lite';

interface ControlPanelRolesProps {
}

export const ControlPanelRoles: React.FC<ControlPanelRolesProps> = observer(({ }) => {
    const { allRoles } = rootStore.controlPanelStore;
    const rolesArr = allRoles.map(role => <TableRow key={`role_row_${role.name}`}>
        <TableCell>{role.name}</TableCell>
        <TableCell>{role.description}</TableCell>
    </TableRow>)
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Название роли</b></TableCell>
                        <TableCell><b>Описание</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {rolesArr}
                </TableBody>
            </Table>
        </TableContainer>
    )
});

{/* 
<TableCell>ФИО</TableCell>
<TableCell align="right">ID</TableCell>
<TableCell align="right">Должность</TableCell>
<TableCell align="right">Группа</TableCell>
<TableCell align="right">Дата регистрации</TableCell>
<TableCell align="right">Верификация</TableCell> */}
