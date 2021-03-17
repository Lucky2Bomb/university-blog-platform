import { Length } from "class-validator";


export class CreateUserDto {

    @Length(2, 50)
    name: string;
    
    @Length(2, 50)
    surname: string;
    
    @Length(0, 50)
    patronymic?: string;

    @Length(4, 20)
    username: string;

    @Length(6, 50)
    password: string;
}