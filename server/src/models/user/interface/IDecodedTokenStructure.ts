import { RoleList } from "src/models/role/role-list";


export interface IDecodedTokenStructure {
    userId: number;
    userRoles: RoleList[];
}