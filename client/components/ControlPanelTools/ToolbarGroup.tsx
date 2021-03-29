import * as React from 'react';
import { Grid, IconButton, Tooltip, Select, InputLabel, MenuItem } from '@material-ui/core';
import styles from '../styles/Common.module.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/rootStore';


interface ToolbarGroupProps {
    disabled: boolean;
}

export const ToolbarGroup: React.FC<ToolbarGroupProps> = observer(({ disabled }) => {
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

            <Tooltip title="Присоеденить пользователей к группе">
                <span>
                    <IconButton disabled={disabled} onClick={addUsersToGroupHandle}>
                        <GroupIcon />
                    </IconButton>
                </span>
            </Tooltip>

            <Tooltip title="Создать новую группу">
                <span>
                    <IconButton disabled={disabled}>
                        <GroupAddIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </>
    )
});