import { makeAutoObservable } from "mobx";
import { IMyProfileStore } from './../types/Profile';

export default class MyProfileStore implements IMyProfileStore {
    constructor() {
        makeAutoObservable(this);
    }

    roles: string[] = null;
    profile: object = null;

    setRoles = (roles: string[]): void => {
        this.roles = roles;
    }
    setProfile = (profile: object): void => {
        this.profile = profile;
    }
}