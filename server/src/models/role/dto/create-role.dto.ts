import { Length } from "class-validator";

export class CreateRoleDto {
    @Length(1, 50)
    readonly name;

    @Length(0, 255)
    readonly description;
}