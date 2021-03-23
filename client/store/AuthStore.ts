import { makeAutoObservable } from "mobx";
import { IAuthStore } from "../types/Auth";

export default class AuthStore implements IAuthStore {
    constructor() {
        makeAutoObservable(this);
    }

    token: string = "";
    isAuth: boolean = false;

    setAuth = (value: boolean): void => {
        this.isAuth = value;
    }
}