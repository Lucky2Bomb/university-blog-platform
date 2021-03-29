import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UniversityService } from "./university.service";
import { CreateUniversityFacultySpecialtyDto } from "./dto/create-university-faculty-specialty.dto";
import { EditGroupDto } from "./dto/edit-group.dto";

enum type {
    university = "university",
    faculty = "faculty",
    specialty = "specialty"
}

@Controller("/university")
export class UniversityController {

    constructor(private universityService: UniversityService) { }

    @Get("/all")
    getAll() {
        return this.universityService.getAll();
    }

    @Post("/group/create")
    createGroup(@Body() dto: CreateGroupDto) {
        return this.universityService.createGroup(dto);
    }
    
    @Post("/group/edit")
    editGroup(@Body() dto: EditGroupDto) {
        return this.universityService.editGroup(dto);
    }


    @Get("/group")
    getAllGroup() {
        return this.universityService.getAllGroup();
    }

    //getting group and users
    @Get("/group/:id")
    getOneGroup(
        @Param("id") id: number
    ) {
        return this.universityService.getOneGroup(id);
    }

    @Delete("/group/delete/:id")
    deleteGroup(
        @Param("id") id: number
    ) {
        return this.universityService.deleteGroup(id);
    }

    @Post("/group/join")
    joinGroup(
        @Body("userId") userId: number,
        @Body("groupId") groupId: number
    ) {
        return this.universityService.joinGroup(userId, groupId);
    }
    
    @Post("/group/add-users")
    addUsersInGroup(
        @Body("usersId") usersId: number[],
        @Body("groupId") groupId: number
    ) {
        return this.universityService.addUsersInGroup(usersId, groupId);
    }

    // @Length(1, 255)
    // universityName?: string;

    // @Length(1, 255)
    // facultyName?: string;

    // @Length(1, 255)
    // specialtyName?: string;

    @Post("/:type")
    createUniversityFacultySpecialty(
        @Param("type") type: type,
        @Body("name") name: string,
    ) {
        return this.universityService.createUniversityFacultySpecialty(type, name);
    }

    @Get("/")
    getAllUniversityFacultySpecialty(
        @Query("isUniversity") isUniversity: boolean = false,
        @Query("isFaculty") isFaculty: boolean = false,
        @Query("isSpecialty") isSpecialty: boolean = false
    ) {
        return this.universityService.getAllUniversityFacultySpecialty({isUniversity, isFaculty, isSpecialty});
    }

    // type:
        // university
        // faculty
        // specialty
    @Delete("/:type/:name")
    deleteUniversityFacultySpecialty(
        @Param("type") type: type,
        @Param("name") name: string,
        ) {
        return this.universityService.deleteUniversityFacultySpecialty(type, name);
    }



}