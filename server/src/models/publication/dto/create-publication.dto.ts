import { Length } from "class-validator";


export class CreatePublicationDto {
    @Length(0, 100)
    header: string;
    
    @Length(0)
    text: string;
}