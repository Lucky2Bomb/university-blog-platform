import * as React from 'react';
import { Grid, IconButton, Tooltip, Select, InputLabel, MenuItem, Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions } from '@material-ui/core';
import styles from '../styles/Common.module.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/rootStore';
import { addUsersToGroup } from '../../requests/group/add-users-to-group';
import { DialogCreateGroup } from './DialogGroup';
import { IGroup } from '../../types/University';
import EditIcon from '@material-ui/icons/Edit';


interface ToolbarGroupProps {
    disabled: boolean;
}

export const ToolbarGroup: React.FC<ToolbarGroupProps> = observer(({ disabled }) => {
    const { controlPanelStore, universityStore } = rootStore;
    const [open, setOpen] = React.useState(false);
    const [group, setGroup] = React.useState(null);

    const newGroupOpen = () => {
        setGroup(null);
        setOpen(true);
    };
    
    const editGroupOpen = () => {
        setGroup(universityStore.groups.find(group => group.id === universityStore.selectedGroupId));
        setOpen(true);
    };

    const getArrSelectedUsersId = (): number[] => {
        const arr = [];
        controlPanelStore.selectedUsersId.forEach((value) => {
            arr.push(value);
        });
        return arr;
    }

    const addUsersToGroupHandle = () => {
        addUsersToGroup(getArrSelectedUsersId(), universityStore.selectedGroupId, localStorage.getItem("token"))
            .finally(() => {
                controlPanelStore.update();
                controlPanelStore.setAllCount(0);
                controlPanelStore.setUsers([]);
            });
    }

    // React.useEffect(() => {
    //     universityStore.selectGroup(universityStore.groups.find(item => item.id === Number(group) - 1)[0]);
    // }, [group]);

    const groupsArr = universityStore.groups.map(value => <MenuItem key={`group_item_${value.id}`} value={value.id}>{value.name}</MenuItem>);
    return (
        <>
            <Select
                value={universityStore.selectedGroupId}
                onChange={(e) => universityStore.selectGroup(Number(e.target.value))}
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
                    <IconButton onClick={newGroupOpen}>
                        <GroupAddIcon />
                    </IconButton>
                </span>
            </Tooltip>

            <Tooltip title="Изменить группу">
                <span>
                    <IconButton onClick={editGroupOpen}>
                        <EditIcon />
                    </IconButton>
                </span>
            </Tooltip>



            <DialogCreateGroup open={open} setOpen={setOpen} group={group} />
        </>
    )
});