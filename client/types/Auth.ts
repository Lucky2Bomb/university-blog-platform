export interface IAuthStore {
    isAuth: boolean;
    setAuth(value: boolean): void;
}

export interface IToken {
    token: string;
}