import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Pagination, Button } from '@material-ui/core';
import { ControlPanelToolbar } from './ControlPanelToolbar';
import rootStore from '../store/rootStore';
import { ControlPanelTableRow } from './ControlPanelTableRow';
import { getUsersWithTables } from '../requests/user/get-users-with-tables';
import { Loading } from './Loading';
import { observer } from 'mobx-react-lite';
import { DialogMoreInfoUser } from './ControlPanelTools/DialogMoreInfoUser';

export const ControlPanelUsers: React.FC = observer(({ }) => {
    const { controlPanelStore, universityStore } = rootStore;
    let tableRows = controlPanelStore.users.map(user => <ControlPanelTableRow key={`user_${user.id}`} profile={user} checkBoxHandle={checkBoxHandle} />);
    const countPages = Math.ceil(Number(controlPanelStore.allCount) / Number(controlPanelStore.currentCount));
    const [page, setPage] = React.useState(1);
    const [openDialogMoreInfoUser, setOpenDialogMoreInfoUser] = React.useState(false);
    const [moreInfoUser, setMoreInfoUser] = React.useState(null);

    function checkBoxHandle(value: number, checked: boolean) {
        checked ? controlPanelStore.selectUserId(value) : controlPanelStore.unselectUserId(value);
    }

    const [selectUserId, setSelectUserId] = React.useState(-1);

    // React.useEffect(() => {
    //     console.log(selectUserId);
    // }, [selectUserId]);


    React.useEffect(() => {
        tableRows = controlPanelStore.users.map(user => <ControlPanelTableRow key={`user_${user.id}`} profile={user} checkBoxHandle={checkBoxHandle}/>);
    }, [controlPanelStore.users]);

    React.useEffect(() => {
        if (controlPanelStore.isActiveMoreInfoUser && controlPanelStore.selectedMoreInfoUserId > 0) {
            setMoreInfoUser(controlPanelStore.users.find(user => user.id === controlPanelStore.selectedMoreInfoUserId));
            setOpenDialogMoreInfoUser(true);
        }
    }, [controlPanelStore.isActiveMoreInfoUser, controlPanelStore.selectedMoreInfoUserId]);

    return (
        <Grid>
            <Grid item xs={12} margin="10px"> <ControlPanelToolbar /> </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">ID</TableCell>
                            <TableCell>ФИО</TableCell>
                            <TableCell align="right">Должность</TableCell>
                            <TableCell align="right">Группа</TableCell>
                            <TableCell align="right">Дата регистрации</TableCell>
                            <TableCell align="right">Верификация</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {typeof tableRows !== "undefined" && tableRows.length > 0 ? tableRows : <TableRow><TableCell> <Loading /></TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container justifyContent="center">
                <Grid item marginTop="16px">
                    <Pagination count={countPages} tabIndex={page} onChange={(e, page) => { controlPanelStore.setOffset(controlPanelStore.currentCount * (page - 1)) }} color="primary" />
                </Grid>
            </Grid>
            <DialogMoreInfoUser open={openDialogMoreInfoUser} setOpen={setOpenDialogMoreInfoUser} user={moreInfoUser} />
        </Grid>
    )
});