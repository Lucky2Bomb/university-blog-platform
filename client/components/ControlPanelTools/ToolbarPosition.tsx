import * as React from 'react';
import { Grid, IconButton, Tooltip, Select, InputLabel, MenuItem } from '@material-ui/core';

import ControlPointIcon from '@material-ui/icons/ControlPoint';
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate';
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/rootStore';


interface ToolbarPositionProps {
    disabled: boolean;
}

export const ToolbarPosition: React.FC<ToolbarPositionProps> = observer(({ disabled }) => {
    const [group, setGroup] = React.useState("");
    const { controlPanelStore, universityStore } = rootStore;
    const groupHandle = (event: React.ChangeEvent<{ value: unknown }>) => {
        setGroup(event.target.value as string);
    };

    const addUsersToGroupHandle = () => {

    }

    const groupsArr = universityStore.groups.map(value => <MenuItem key={`group_item_${value.id}`} value={value.id}>{value.name}</MenuItem>);
    return (
        <>
            <Select
                disabled={disabled}
                value={group}
                onChange={groupHandle}
                label="Age"
                style={{ minWidth: "150px" }}
            >
                {groupsArr}
            </Select>

            <Tooltip title="Добавить пользователям должность">
                <span>
                    <IconButton disabled={disabled} onClick={addUsersToGroupHandle}>
                        <ControlPointIcon />
                    </IconButton>
                </span>
            </Tooltip>

            <Tooltip title="Создать новую должность">
                <span>
                    <IconButton disabled={disabled}>
                        <ControlPointDuplicateIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </>
    )
});