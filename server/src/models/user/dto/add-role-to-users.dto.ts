import { IsInt, Length } from "class-validator";

export class AddRoleToUsers {
    usersId: number[];

    @Length(1, 50)
    roleName: string;
}