import { Length, IsInt } from "class-validator";


export class CreateCommentDto {
    @Length(1)
    text: string;
    
    @IsInt()
    publicationId: number;

    @IsInt()
    userId: number;
}