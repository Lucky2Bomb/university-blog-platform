import { IProfile, IProfileWithTables } from "./Profile";

export interface IControlPanelStore {
    selectedUsersId: Set<number>;
    users: IProfileWithTables[];
    allCount: number;
    currentCount: number;
    offset: number;

    dropSelected(): void;
    selectUserId(userId: number): void;
    unselectUserId(userId: number): void;
    setUsers(users: IProfileWithTables[]): void;
    setAllCount(allcount: number): void;
    setCurrentCount(currentCount: number): void;
    setOffset(offset: number): void;
}