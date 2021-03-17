import { Length } from "class-validator";

export class MyProfileDto {
    @Length(1)
    token: string;
}