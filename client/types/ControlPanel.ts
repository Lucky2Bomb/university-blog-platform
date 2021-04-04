import { IProfile, IProfileWithTables } from "./Profile";
import { IPosition } from "./IPosition";
import { IRole } from "./Role";

export interface IControlPanelStore {

    selectedMoreInfoUserId: number;
    isActiveMoreInfoUser: boolean;
    selectedUsersId: Set<number>;
    users: IProfileWithTables[];
    positions: IPosition[];
    allCount: number;
    currentCount: number;
    offset: number;
    allRoles: IRole[];

    dropSelected(): void;
    setAllRoles(roles: IRole[]): void;
    selectMoreInfoUserId(userId: number): void;
    setActiveMoreInfoUser(value: boolean): void;
    selectUserId(userId: number): void;
    unselectUserId(userId: number): void;
    setUsers(users: IProfileWithTables[]): void;
    setPositions(positions: IPosition[]): void;
    setAllCount(allcount: number): void;
    setCurrentCount(currentCount: number): void;
    setOffset(offset: number): void;
}