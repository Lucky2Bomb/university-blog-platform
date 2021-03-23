import { RoleList } from "./role-list";

export const checkRoleInArray = (roles: RoleList[], checkRole: RoleList) => {
    if (typeof roles === "undefined") {
        return false;
    } else if (roles.length === 0) {
        return false;
    } else {
        return roles.find(item => checkRole === item);
    }
}