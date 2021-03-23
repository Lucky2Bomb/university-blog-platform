import { IsEmail, Length, IsInt } from "class-validator";


export class EditUserDto {

    @IsInt()
    userId: number;

    @Length(2, 50)
    name: string;

    @Length(2, 50)
    surname: string;

    patronymic: string;

    @IsEmail()
    email: string;

    @Length(0, 255)
    vk: string;

    @Length(0, 255)
    facebook: string;

    @Length(0, 255)
    telegram: string;

    @Length(0, 50)
    whatsapp: string;

    @Length(0, 50)
    phone_number: string;
}