import { Length } from "class-validator";


export class EditPublicationDto {
    @Length(0, 100)
    header: string;
    
    @Length(0)
    text: string;
    
    @Length(0)
    id: number;
}