import { IsInt, Length } from "class-validator";

export class ReplaceRolesToUser {
    @IsInt()
    userId: number;

    roleNames: string[];
}