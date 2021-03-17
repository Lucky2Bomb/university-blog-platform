import { IsEmail, Length } from "class-validator";


export class EditUserDto {
    @Length(2, 50)
    name?: string;

    @Length(2, 50)
    surname?: string;

    @Length(0, 50)
    patronymic?: string;

    @IsEmail()
    email?: string;

    @Length(0, 255)
    avatarUrl?: string;

    @Length(0, 255)
    backgroundUrl?: string;

    @Length(0, 255)
    vk?: string;

    @Length(0, 255)
    facebook?: string;

    @Length(0, 255)
    telegram?: string;

    @Length(0, 50)
    whatsapp?: string;

    @Length(0, 50)
    phone_number?: string;
}