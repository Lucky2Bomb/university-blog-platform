import { IsInt, Length } from "class-validator";

export class AddRoleToUser {
    @IsInt()
    userId: number;

    @Length(1, 50)
    roleName: string;
}