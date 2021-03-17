import { Length } from "class-validator";


export class LoginUserDto {
    @Length(4, 20)
    username: string;

    @Length(6, 20)
    password: string;
}