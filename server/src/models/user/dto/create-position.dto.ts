import { Length } from "class-validator";


export class CreatePositionDto {
    @Length(1, 255)
    name: string;
}