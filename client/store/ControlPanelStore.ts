import { makeAutoObservable } from "mobx";
import { IProfileWithTables } from './../types/Profile';
import { IControlPanelStore } from './../types/ControlPanel';
import { IPosition } from "../types/IPosition";
import { IRole } from "../types/Role";

export default class ControlPanelStore implements IControlPanelStore {
    constructor() {
        makeAutoObservable(this);
    }

    selectedMoreInfoUserId: number = 0;
    isActiveMoreInfoUser: boolean = false;

    selectedUsersId = new Set<number>();
    users: IProfileWithTables[] = [];
    positions: IPosition[] = [];
    allRoles: IRole[] = [];
    allCount: number = 0;
    currentCount: number = 10;
    offset: number = 0;
    isUpdate: boolean = false;


    update = () => {
        this.isUpdate = !this.isUpdate;
    }

    setAllRoles = (roles: IRole[]) => {
        this.allRoles = roles;
    }

    setActiveMoreInfoUser = (value: boolean): void => {
        this.isActiveMoreInfoUser = value;
    }

    selectMoreInfoUserId = (userId: number): void => {
        this.selectedMoreInfoUserId = userId;
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
    
    setPositions = (positions: IPosition[]): void => {
        this.positions = positions;
    }
}

