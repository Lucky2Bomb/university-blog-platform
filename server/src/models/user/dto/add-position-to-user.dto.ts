import { IsInt, Length } from "class-validator";

export class AddPositionToUser {
    @IsInt()
    userId: number;

    @Length(1, 255)
    namePosition: string;
}