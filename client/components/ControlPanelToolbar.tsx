import * as React from 'react';
import { Grid, IconButton, Tooltip, Select, InputLabel, MenuItem, Button } from '@material-ui/core';
import styles from '../styles/Common.module.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { observer } from 'mobx-react-lite';
import rootStore from '../store/rootStore';
import { ToolbarGroup } from './ControlPanelTools/ToolbarGroup';
import { ToolBarPageSize } from './ControlPanelTools/ToolBarPageSize';
import { verifyUsers } from './../requests/role/verify-users';
import { RoleList } from '../other/role-list';
import { deleteUsers } from '../requests/user/delete-user';


interface ControlToolbarProps {
}

export const ControlPanelToolbar: React.FC<ControlToolbarProps> = observer(({ }) => {
    const [group, setGroup] = React.useState("");
    const { controlPanelStore, universityStore, myProfile } = rootStore;
    const isAdmin = Boolean(myProfile.roles.find(role => role === RoleList.ADMIN));
    const isUserControl = Boolean(myProfile.roles.find(role => role === RoleList.USER_CONTROL));


    const groupHandle = (event: React.ChangeEvent<{ value: unknown }>) => {
        setGroup(event.target.value as string);
    };

    const isDisabledToolbar = controlPanelStore.selectedUsersId.size < 1;

    const deleteUsersHandler = () => {
        deleteUsers(getArrSelectedUsersId(), localStorage.getItem("token")).finally(() => {
            controlPanelStore.update();
            controlPanelStore.setUsers([]);
        });
    }

    const getArrSelectedUsersId = (): number[] => {
        const arr = [];
        controlPanelStore.selectedUsersId.forEach((value) => {
            arr.push(value);
        });
        return arr;
    }
    const verifyUsersHandle = () => {
        verifyUsers(localStorage.getItem("token"), getArrSelectedUsersId())
            .finally(() => {
                controlPanelStore.update();
                controlPanelStore.setUsers([]);
            });
    }

    return (
        <Grid container direction="row" justifyContent="space-between">
            {/* <Button onClick={() => {controlPanelStore.selectUserId(2)}}>click</Button> */}

            <Grid item container direction="row" xs={10} justifyContent="flex-start" className={styles.style_separator}>
                <Grid item className={styles.style_separator__item}>
                    <Tooltip title="Верефицировать пользователей">
                        <span>
                            <IconButton disabled={isDisabledToolbar} onClick={verifyUsersHandle}>
                                <VerifiedUserIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Grid>

                <Grid item className={styles.style_separator__item}>
                    <Tooltip title="Удалить выбранных пользователей">
                        <span>
                            <IconButton disabled={isDisabledToolbar && !(isAdmin || isUserControl)} onClick={deleteUsersHandler}>
                                <DeleteIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Grid>

                <Grid item className={styles.style_separator__item}>
                    <ToolbarGroup
                        disabled={isDisabledToolbar}
                    />
                </Grid>

                {/* <Grid item className={styles.style_separator__item}></Grid>
            
            <Grid item className={styles.style_separator__item}></Grid> */}
            </Grid>

            <Grid item container direction="row" xs={2} justifyContent="flex-end">
                <Grid item>
                    <ToolBarPageSize
                        pageSize={controlPanelStore.currentCount}
                        setPageSize={controlPanelStore.setCurrentCount}

                    />
                </Grid>
            </Grid>
        </Grid>
    )
});