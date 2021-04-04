import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UniversityService } from "./university.service";
import { CreateUniversityFacultySpecialtyDto } from "./dto/create-university-faculty-specialty.dto";
import { EditGroupDto } from "./dto/edit-group.dto";
import { Roles } from "../role/role.decorator";
import { RoleList } from "../role/role-list";
import { RolesGuard } from "../role/roles.guard";

enum type {
    university = "university",
    faculty = "faculty",
    specialty = "specialty"
}

@UseGuards(RolesGuard)
@Controller("/university")
export class UniversityController {

    constructor(private universityService: UniversityService) { }

    @Get("/all")
    getAll() {
        return this.universityService.getAll();
    }

    @Post("/group/create")
    @Roles(RoleList.UNIVERSITY)
    createGroup(@Body() dto: CreateGroupDto) {
        return this.universityService.createGroup(dto);
    }
    
    @Post("/group/edit")
    @Roles(RoleList.UNIVERSITY)
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
    @Roles(RoleList.UNIVERSITY)
    deleteGroup(
        @Param("id") id: number
    ) {
        return this.universityService.deleteGroup(id);
    }

    @Post("/group/join")
    @Roles(RoleList.USER)
    joinGroup(
        @Body("userId") userId: number,
        @Body("groupId") groupId: number
    ) {
        return this.universityService.joinGroup(userId, groupId);
    }
    
    @Post("/group/add-users")
    @Roles(RoleList.UNIVERSITY)
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
    @Roles(RoleList.UNIVERSITY)
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
    @Roles(RoleList.UNIVERSITY)
    deleteUniversityFacultySpecialty(
        @Param("type") type: type,
        @Param("name") name: string,
        ) {
        return this.universityService.deleteUniversityFacultySpecialty(type, name);
    }



}