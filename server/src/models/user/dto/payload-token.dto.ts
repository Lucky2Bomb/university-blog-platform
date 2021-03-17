import { UserRole } from "../../role/database/user-role.model";

export class PayloadTokenDto {
    userId: number;
    userRoles: string[];
}