import { IsInt } from "class-validator";

export class ReportPublicationDto {
    @IsInt()
    userId: number;
    @IsInt()
    publicationId: number;
}