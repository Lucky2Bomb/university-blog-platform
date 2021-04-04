import React, { useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, Pagination } from '@material-ui/core';
import rootStore from '../store/rootStore';
import { observer } from 'mobx-react-lite';
import { getGuests } from '../requests/guest/get-guests';
import { ControlPanelGuestRequestRow } from './ControlPanelGuestRequestRow';
import { Loading } from './Loading';

interface ControlPanelGuestRequestsProps {
}

export const ControlPanelGuestRequests: React.FC<ControlPanelGuestRequestsProps> = observer(({ }) => {
    const [page, setPage] = React.useState(1);
    
    const { guestStore } = rootStore;
    const countPages = Math.ceil(Number(guestStore.allCount) / Number(guestStore.currentCount));

    let guestRequestRows = typeof guestStore.guestRequests === "undefined" ? null : guestStore.guestRequests.map(guestRequest => <ControlPanelGuestRequestRow key={`guest_request_row_${guestRequest.id}`} guestRequest={guestRequest} />);
    
    useEffect(() => {
        getGuests(localStorage.getItem("token"), guestStore.currentCount, guestStore.offset).then(res => {
            guestStore.setAllCount(res.allCount);
            guestStore.setCurrentCount(res.currentCount);
            guestStore.setGuestRequests(res.guestRequests);
            guestStore.setOffset(res.offset);
        });
    }, []);

    useEffect(() => {
        getGuests(localStorage.getItem("token"), guestStore.currentCount, guestStore.offset).then(res => {
            guestStore.setAllCount(res.allCount);
            guestStore.setCurrentCount(res.currentCount);
            guestStore.setGuestRequests(res.guestRequests);
            guestStore.setOffset(res.offset);
        });
    }, [guestStore.offset]);

    useEffect(() => {
        guestRequestRows = typeof guestStore.guestRequests === "undefined" ? null : guestStore.guestRequests.map(guestRequest => <ControlPanelGuestRequestRow key={`guest_request_row_${guestRequest.id}`} guestRequest={guestRequest} />);
    }, [guestStore.guestRequests]);

    // useEffect(() => {
    //     guestRequestRows = typeof guestStore.guestRequests === "undefined" ? null : guestStore.guestRequests.map(guestRequest => <ControlPanelGuestRequestRow key={`guest_request_row_${guestRequest.id}`} guestRequest={guestRequest} />);
    // }, [guestStore.guestRequests]);


    return (
        <Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"><b>№</b></TableCell>
                            <TableCell><b>ФИО</b></TableCell>
                            <TableCell align="right"><b>Контакты</b></TableCell>
                            <TableCell align="center"><b>Проверено</b></TableCell>
                            <TableCell><b>Кто проверил</b></TableCell>
                            <TableCell align="right"><b>Дата создания заявки</b></TableCell>
                            <TableCell align="right"><b>Дата изменения</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {typeof guestRequestRows === undefined ? <TableRow><TableCell><Loading /></TableCell></TableRow> : guestRequestRows}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container justifyContent="center">
                <Grid item marginTop="16px">
                    <Pagination count={countPages} tabIndex={page} onChange={(e, page) => { guestStore.setOffset(guestStore.currentCount * (page - 1)); }} color="primary" />
                </Grid>
            </Grid>
        </Grid>
    )
});