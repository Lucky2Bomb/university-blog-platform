import { Length, IsInt } from "class-validator";


export class EditGroupDto {
    @IsInt()
    id: number;

    @Length(1)
    name: string;

    @Length(4)
    startDateTraining: string;

    @IsInt()
    numberSemestersTraining: number;

    @Length(1)
    universityName: string;

    @Length(1)
    facultyName: string;
    
    @Length(1)
    specialtyName: string;
}