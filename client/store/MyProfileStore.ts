import { makeAutoObservable } from "mobx";
import { IMyProfileStore, IProfile } from './../types/Profile';
import { IUserRole } from './../types/Role';
import { RoleList } from "../other/role-list";

export default class MyProfileStore implements IMyProfileStore {
    constructor() {
        makeAutoObservable(this);
    }

    roles: RoleList[] = [];
    updateProfile: boolean = false;

    goUpdateProfile = (): void => {
        this.updateProfile = !this.updateProfile;
    }

    setRoles = (roles: RoleList[]): void => {
        this.roles = roles;
    }
}

