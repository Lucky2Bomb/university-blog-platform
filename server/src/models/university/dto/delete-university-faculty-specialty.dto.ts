import { Length, IsInt } from "class-validator";


export class DeleteUniversityFacultySpecialtyDto {
    @Length(1, 255)
    universityName?: string;

    @Length(1, 255)
    facultyName?: string;

    @Length(1, 255)
    specialtyName?: string;
}