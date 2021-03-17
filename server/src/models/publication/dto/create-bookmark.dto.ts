import { Length, IsInt } from "class-validator";


export class CreateBookmarkDto {
    @IsInt()
    userId: number;
    
    @IsInt()
    publicationId: number;
}