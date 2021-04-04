import * as React from 'react';
import { Grid, IconButton, Tooltip, Select, InputLabel, MenuItem, Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions, TextField, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/rootStore';
import { IProfileWithTables } from '../../types/Profile';
import { userInfo } from 'os';
import { RoleList } from '../../other/role-list';
import { deleteUser } from '../../requests/user/delete-user';
import { editAnotherUser } from '../../requests/user/edit-another-user';
import { IProfileEdit } from './../../types/Profile';
import { replaceRolesToUser } from '../../requests/role/replace-roles-to-user';
import { addPositionToUser } from '../../requests/position/add-position-to-user';
import { addUsersToGroup } from '../../requests/group/add-users-to-group';


interface DialogMoreInfoUserProps {
    open: any;
    setOpen(value: any): void;
    user: IProfileWithTables;
}

export const DialogMoreInfoUser: React.FC<DialogMoreInfoUserProps> = observer(({ open, setOpen, user = null }) => {
    const { controlPanelStore, universityStore, myProfile } = rootStore;
    const [surname, setSurname] = React.useState("");
    const [name, setName] = React.useState("");
    const [patronymic, setPatronymic] = React.useState("");
    const [selectedUserGroup, setSelectedUserGroup] = React.useState(1);
    const [selectedUserPosition, setSelectedUserPosition] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [telegram, setTelegram] = React.useState("");
    const [vk, setVk] = React.useState("");
    const [whatsapp, setWhatsapp] = React.useState("");
    const [accessIsAllowed, setAccessIsAllowed] = React.useState(Boolean(myProfile.roles.find(role => role === RoleList.USER_CONTROL)) || Boolean(myProfile.roles.find(role => role === RoleList.ADMIN)));

    const [roleUser, setRoleUser] = React.useState(false);
    const [roleAdmin, setRoleAdmin] = React.useState(false);
    const [roleVerified, setRoleVerified] = React.useState(false);
    const [roleAllInfoUsers, setRoleAllInfoUsers] = React.useState(false);
    const [rolePublications, setRolePublications] = React.useState(false);
    const [roleUniversity, setRoleUniversity] = React.useState(false);
    const [roleUserComment, setRoleUserComment] = React.useState(false);
    const [roleUserControl, setRoleUserControl] = React.useState(false);
    const [roleUserPosition, setRoleUserPosition] = React.useState(false);
    const [roleUserRole, setRoleUserRole] = React.useState(false);

    const handleClose = () => {
        controlPanelStore.setActiveMoreInfoUser(false);

        // console.log(roleUser);
        // console.log(roleAdmin);
        // console.log(roleVerified);
        // console.log(roleAllInfoUsers);
        // console.log(rolePublications);
        // console.log(roleUniversity);
        // console.log(roleUserComment);
        // console.log(roleUserControl);
        // console.log(roleUserPosition);
        // console.log(roleUserRole);


        setOpen(false);
    }

    const handleDelete = () => {
        deleteUser(user.id, localStorage.getItem("token")).finally(() => {
            setOpen(false);
            controlPanelStore.update();
            controlPanelStore.setUsers([]);
        });
    }

    const sendEditUserhandle = () => {
        const userEdit: IProfileEdit = {
            userId: user.id,
            phone_number: phoneNumber,
            surname,
            name,
            patronymic,
            email,
            vk,
            telegram,
            whatsapp,
            facebook: ""
        }
        const token = localStorage.getItem("token");
        editAnotherUser(userEdit, token);

        const activatedRoles: string[] = [];
        activatedRoles.push(RoleList.USER);
        // roleUser
        // roleAdmin
        // roleVerified
        // roleAllInfoUsers
        // rolePublications
        // roleUniversity,
        // roleUserComment
        // roleUserControl
        // roleUserPosition
        // roleUserRole
        if (roleAdmin) {
            activatedRoles.push(RoleList.ADMIN);
        }
        if (roleVerified) {
            activatedRoles.push(RoleList.VERIFIED);
        }

        if (roleAllInfoUsers) {
            activatedRoles.push(RoleList.ALL_INFO_USERS);
        }

        if (rolePublications) {
            activatedRoles.push(RoleList.PUBLICATIONS);
        }

        if (roleUniversity) {
            activatedRoles.push(RoleList.UNIVERSITY);
        }

        if (roleUserComment) {
            activatedRoles.push(RoleList.USER_COMMENT);
        }

        if (roleUserControl) {
            activatedRoles.push(RoleList.USER_CONTROL);
        }

        if (roleUserPosition) {
            activatedRoles.push(RoleList.USER_POSITION);
        }

        if (roleUserRole) {
            activatedRoles.push(RoleList.USER_ROLE);
        }
        replaceRolesToUser(user.id, activatedRoles, token).finally(() => {
            addPositionToUser(user.id, selectedUserPosition, token).finally(() => {
                addUsersToGroup([user.id], universityStore.selectedGroupId, localStorage.getItem("token")).finally(() => {
                    controlPanelStore.update();
                    controlPanelStore.setAllCount(0);
                    controlPanelStore.setUsers([]);
                });
            });
        });


        controlPanelStore.setActiveMoreInfoUser(false);
        setOpen(false);
    }

    const groupsArr = universityStore.groups.map(value => <MenuItem key={`user_group_item_${value.id}`} value={value.id}>{value.name}</MenuItem>);
    const positionsArr = controlPanelStore.positions.map(value => <MenuItem key={`user_group_item_${value.name}`} value={value.name}>{value.name}</MenuItem>);
    React.useEffect(() => {
        if (user) {
            // const obj = {};
            // for (let key in user) {
            //     obj[key] = user[key];
            // }
            // console.log(obj);
            // console.log(accessIsAllowed)

            setSurname(user.surname ? user.surname : "");
            setName(user.name ? user.name : "");
            setPatronymic(user.patronymic ? user.patronymic : "");
            setSelectedUserGroup(user.groupId ? user.groupId : 1);
            setSelectedUserPosition(user.positionName ? user.positionName : "");
            setEmail(user.email ? user.email : "");
            setPhoneNumber(user.phone_number ? user.phone_number : "");
            setTelegram(user.telegram ? user.telegram : "");
            setVk(user.vk ? user.vk : "");
            setWhatsapp(user.whatsapp ? user.whatsapp : "");
            // setSelectedUserRoles(user.userRoleLists ? user.userRoleLists : []);


            setRoleUser(Boolean(user.userRoleLists.find(roleUser => roleUser.roleName === RoleList.USER)));
            setRoleUserComment(Boolean(user.userRoleLists.find(roleUser => roleUser.roleName === RoleList.USER_COMMENT)));
            setRoleUserControl(Boolean(user.userRoleLists.find(roleUser => roleUser.roleName === RoleList.USER_CONTROL)));
            setRoleUserPosition(Boolean(user.userRoleLists.find(roleUser => roleUser.roleName === RoleList.USER_POSITION)));
            setRoleUserRole(Boolean(user.userRoleLists.find(roleUser => roleUser.roleName === RoleList.USER_ROLE)));

            setRoleAdmin(Boolean(user.userRoleLists.find(roleUser => roleUser.roleName === RoleList.ADMIN)));
            setRoleAllInfoUsers(Boolean(user.userRoleLists.find(roleUser => roleUser.roleName === RoleList.ALL_INFO_USERS)));
            setRolePublications(Boolean(user.userRoleLists.find(roleUser => roleUser.roleName === RoleList.PUBLICATIONS)));
            setRoleUniversity(Boolean(user.userRoleLists.find(roleUser => roleUser.roleName === RoleList.UNIVERSITY)));
            setRoleVerified(Boolean(user.userRoleLists.find(roleUser => roleUser.roleName === RoleList.VERIFIED)));
        }
    }, [user]);
    if (user) {
        return (

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Данные пользователя</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" gap={2}>

                        <Grid item container direction="row" justifyContent="space-around">
                            <Grid item container direction="column" xs={5} gap={2}>
                                <Grid item>
                                    <TextField label="Фамилия" fullWidth value={surname} onChange={(e) => setSurname(e.target.value)} />
                                </Grid>
                                <Grid item>
                                    <TextField label="Имя" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                                </Grid>
                                <Grid item>
                                    <TextField label="Отчество" fullWidth value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
                                </Grid>

                                <Grid item>
                                    <TextField label="Почта" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Grid>
                            </Grid>
                            <Grid item container direction="column" xs={5} gap={2}>
                                <Grid item>
                                    <TextField label="Номер телефона" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </Grid>
                                <Grid item>
                                    <TextField label="Телеграм" fullWidth value={telegram} onChange={(e) => setTelegram(e.target.value)} />
                                </Grid>
                                <Grid item>
                                    <TextField label="Вк" fullWidth value={vk} onChange={(e) => setVk(e.target.value)} />
                                </Grid>
                                <Grid item>
                                    <TextField label="Whatsapp" fullWidth value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                                </Grid>
                            </Grid>

                        </Grid>


                        <Grid item>
                            <Select
                                fullWidth
                                value={selectedUserGroup}
                                onChange={(e) => setSelectedUserGroup(Number(e.target.value))}
                                label="Age"
                                style={{ minWidth: "150px" }}
                            >
                                {groupsArr}
                            </Select>
                        </Grid>

                        <Grid item>
                            <Select
                                fullWidth
                                value={selectedUserPosition}
                                onChange={(e) => setSelectedUserPosition(e.target.value)}
                                label="Age"
                                style={{ minWidth: "150px" }}
                            >
                                {positionsArr}
                            </Select>
                        </Grid>

                        <Grid item container direction="row">
                            <Grid item container direction="row" xs={6}>
                                <FormGroup>
                                    <FormControlLabel control={<Switch onChange={(e) => setRoleUser(e.target.value === "false")} disabled checked={roleUser} value={roleUser} />} label={RoleList.USER} />
                                    <FormControlLabel control={<Switch onChange={(e) => setRoleUserComment(e.target.value === "false")} checked={roleUserComment} value={roleUserComment} />} label={RoleList.USER_COMMENT} />
                                    <FormControlLabel control={<Switch onChange={(e) => setRoleUserControl(e.target.value === "false")} checked={roleUserControl} value={roleUserControl} />} label={RoleList.USER_CONTROL} />
                                    <FormControlLabel control={<Switch onChange={(e) => setRoleUserPosition(e.target.value === "false")} checked={roleUserPosition} value={roleUserPosition} />} label={RoleList.USER_POSITION} />
                                    <FormControlLabel control={<Switch onChange={(e) => setRoleUserRole(e.target.value === "false")} checked={roleUserRole} value={roleUserRole} />} label={RoleList.USER_ROLE} />
                                </FormGroup>
                            </Grid>

                            <Grid item container direction="row" xs={6}>
                                <FormGroup>
                                    <FormControlLabel control={<Switch onChange={(e) => setRoleAdmin(e.target.value === "false")} checked={roleAdmin} value={roleAdmin} />} label={RoleList.ADMIN} />
                                    <FormControlLabel control={<Switch onChange={(e) => setRoleAllInfoUsers(e.target.value === "false")} checked={roleAllInfoUsers} value={roleAllInfoUsers} />} label={RoleList.ALL_INFO_USERS} />
                                    <FormControlLabel control={<Switch onChange={(e) => setRolePublications(e.target.value === "false")} checked={rolePublications} value={rolePublications} />} label={RoleList.PUBLICATIONS} />
                                    <FormControlLabel control={<Switch onChange={(e) => setRoleUniversity(e.target.value === "false")} checked={roleUniversity} value={roleUniversity} />} label={RoleList.UNIVERSITY} />
                                    <FormControlLabel control={<Switch onChange={(e) => setRoleVerified(e.target.value === "false")} checked={roleVerified} value={roleVerified} />} label={RoleList.VERIFIED} />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={handleDelete} disabled={!accessIsAllowed}>Удалить профиль</Button>
                    <Button variant="outlined" onClick={handleClose}>Закрыть</Button>
                    <Button variant="contained" onClick={sendEditUserhandle} disabled={!accessIsAllowed}>Изменить</Button>
                </DialogActions>
            </Dialog>

        )
    } else {
        return <></>
    }
});