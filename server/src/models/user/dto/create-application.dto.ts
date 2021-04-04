import { Length, IsEmail } from "class-validator";


export class CreateApplicationDto {
    @Length(1, 255)
    full_name: string;

    email: string;
}