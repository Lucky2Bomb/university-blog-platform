import React, { useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, Pagination } from '@material-ui/core';
import rootStore from '../store/rootStore';
import { observer } from 'mobx-react-lite';
import { getGuests } from '../requests/guest/get-guests';
import { ControlPanelGuestRequestRow } from './ControlPanelGuestRequestRow';
import { Loading } from './Loading';
import { ControlPanelReportRow } from './ControlPanelReportRow';
import { getReports } from './../requests/publication/get-reports';

interface ControlPanelReportsProps {
}

export const ControlPanelReports: React.FC<ControlPanelReportsProps> = observer(({ }) => {
    const [page, setPage] = React.useState(1);
    
    const { reportStore } = rootStore;
    const countPages = Math.ceil(Number(reportStore.allCount) / Number(reportStore.currentCount));

    let reportRows = typeof reportStore.reports === "undefined" ? null : reportStore.reports.map(report => <ControlPanelReportRow key={`report_row_${report.id}`} report={report} />);
    
    useEffect(() => {
        getReports(localStorage.getItem("token"), reportStore.currentCount, reportStore.offset).then(res => {
            reportStore.setAllCount(res.allCount);
            reportStore.setCurrentCount(res.currentCount);
            reportStore.setReports(res.reports);
            reportStore.setOffset(res.offset);
        });
    }, []);

    useEffect(() => {
        getReports(localStorage.getItem("token"), reportStore.currentCount, reportStore.offset).then(res => {
            reportStore.setAllCount(res.allCount);
            reportStore.setCurrentCount(res.currentCount);
            reportStore.setReports(res.reports);
            reportStore.setOffset(res.offset);
        });
    }, [reportStore.offset]);

    useEffect(() => {
        reportRows = typeof reportStore.reports === "undefined" ? null : reportStore.reports.map(report => <ControlPanelReportRow key={`report_row_${report.id}`} report={report} />);
    }, [reportStore.reports]);

    // useEffect(() => {
    //     guestRequestRows = typeof reportStore.reports === "undefined" ? null : reportStore.reports.map(guestRequest => <ControlPanelGuestRequestRow key={`guest_request_row_${guestRequest.id}`} guestRequest={guestRequest} />);
    // }, [reportStore.reports]);


    return (
        <Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"><b>№</b></TableCell>
                            <TableCell><b>ФИО</b></TableCell>
                            <TableCell align="right"><b>Публикация</b></TableCell>
                            <TableCell align="center"><b>Проверено</b></TableCell>
                            <TableCell align="right"><b>Дата создания заявки</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {typeof reportRows === undefined ? <TableRow><TableCell><Loading /></TableCell></TableRow> : reportRows}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container justifyContent="center">
                <Grid item marginTop="16px">
                    <Pagination count={countPages} tabIndex={page} onChange={(e, page) => { reportStore.setOffset(reportStore.currentCount * (page - 1)); }} color="primary" />
                </Grid>
            </Grid>
        </Grid>
    )
});