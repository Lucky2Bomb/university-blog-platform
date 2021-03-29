import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { Grid } from '@material-ui/core';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name'},
    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    // },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    // },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 11, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 12, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 13, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 14, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 15, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 16, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 17, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 18, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 19, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 20, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 21, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 22, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 23, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 24, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 25, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

interface ControlTableProps {
    columns: GridColDef[];
    rows: any[]
}

export const ControlTable: React.FC<ControlTableProps> = ({ }) => {
    return (
            <Grid>
                <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection={false} autoHeight={true} />
            </Grid>
    )
}
