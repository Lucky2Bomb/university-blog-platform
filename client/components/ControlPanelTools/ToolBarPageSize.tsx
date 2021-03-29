import * as React from 'react';
import { Grid, IconButton, Tooltip, Select, InputLabel, MenuItem } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/rootStore';


interface ToolBarPageSizeProps {
    pageSize: number;
    setPageSize(value: number): void;
}

export const ToolBarPageSize: React.FC<ToolBarPageSizeProps> = observer(({ pageSize, setPageSize }) => {

    
    const pageSizeHandle = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPageSize(event.target.value as number);
    };

    return (
        <>
            <Select
                value={pageSize}
                onChange={pageSizeHandle}
                disabled={rootStore.controlPanelStore.selectedUsersId.size > 0}
            >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
            </Select>
        </>
    )
});