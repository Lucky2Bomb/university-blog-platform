import { makeAutoObservable } from "mobx";
import { IAuthStore } from "../types/Auth";

export default class AuthStore implements IAuthStore {
    constructor() {
        makeAutoObservable(this);
    }

    token: string = "";
    isAuth: boolean = false;

    setToken = (token: string): void => {
        this.token = token;
    }

    setAuth = (value: boolean): void => {
        this.isAuth = value;
    }
}