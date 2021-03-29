import { RoleList } from '../other/role-list';
import { IRole } from './Role';
import { IGroup } from './University';

export interface IMyProfileStore {
    roles: RoleList[];
    // profile: IProfile;

    setRoles(roles: RoleList[]): void;
    // setProfile(profile: object): void;
}

export interface IProfile {
    id: number;
    username: string;
    password?: string;

    avatarUrl: string;
    backgroundUrl: string;

    updatedAt: string;
    createdAt: string;

    surname: string;
    name: string;
    patronymic: string;

    email: string;
    facebook: string;
    phone_number: string;
    positionName: string;
    telegram: string;
    vk: string;
    whatsapp: string;
    
    groupId?: number;
}

export interface IProfileWithTables {
    id: number;
    username: string;
    password?: string;

    avatarUrl: string;
    backgroundUrl: string;

    updatedAt: string;
    createdAt: string;

    surname: string;
    name: string;
    patronymic: string;

    email: string;
    facebook: string;
    phone_number: string;
    positionName: string;
    telegram: string;
    vk: string;
    whatsapp: string;
    
    groupId?: number;
    userRoleLists?: IRole[];
    group?: IGroup;
}

export interface IProfileWithTablesResponse {
    users: IProfileWithTables[],
    allCount: number,
    currentCount: number,
    offset: number
}

export interface IProfileEdit {
    userId: number;

    surname: string;
    name: string;
    patronymic: string;

    email: string;
    facebook: string;
    phone_number: string;
    telegram: string;
    vk: string;
    whatsapp: string;
}

export interface IProfileList {
    users: IProfile[];
    currentCount: number;
    allCount: number;
    offset: number;
}


export enum profileImageType {
    AVATAR = "avatar",
    BACKGROUND = "background"
}