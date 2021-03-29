import { makeAutoObservable } from "mobx";
import { IMyProfileStore, IProfile, IProfileWithTables } from './../types/Profile';
import { IRole } from './../types/Role';
import { RoleList } from "../other/role-list";
import { IControlPanelStore } from './../types/ControlPanel';

export default class ControlPanelStore implements IControlPanelStore {
    constructor() {
        makeAutoObservable(this);
    }

    selectedUsersId = new Set<number>();
    users: IProfileWithTables[] = [];
    allCount: number = 0;
    currentCount: number = 10;
    offset: number = 0;
    isUpdate: boolean = false;

    update = () => {
        this.isUpdate = !this.isUpdate;
    }
    
    selectUserId = (userId: number): void => {
        this.selectedUsersId.add(userId);
    }

    unselectUserId = (userId: number): void => {
        this.selectedUsersId.delete(userId);
    }

    dropSelected = (): void => {
        this.selectedUsersId.clear();
    }

    setUsers = (users: IProfileWithTables[]): void => {
        this.users = users;
    }

    setAllCount = (allcount: number): void => {
        this.allCount = allcount;
    }

    setCurrentCount = (currentCount: number): void => {
        this.currentCount = currentCount;
    }

    setOffset = (offset: number): void => {
        this.offset = offset;
    }
}

