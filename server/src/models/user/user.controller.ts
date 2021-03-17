import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AddRoleToUser } from './dto/add-role-to-user.dto';
import { MyProfileDto } from './dto/my-profile.dto';

@Controller("/user")
export class UserController {

    constructor(private userService: UserService) { }

    @Post("/create")
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Post("/login")
    signin(@Body() dto: LoginUserDto) {
        return this.userService.login(dto);
    }

    @Get("/check-username-exists")
    checkNameExists(@Query("username") username: string) {
        return this.userService.checkNameExists(username);
    }

    @Get("/list")
    getAll(
        @Query("count") count?: number,
        @Query("offset") offset?: number
    ) {
        return this.userService.getAll(count, offset);
    }

    @Get("/:id")
    getOne(
        @Param("id") id: number
    ) {
        return this.userService.getOne(id);
    }

    @Delete("/:id")
    delete(
        @Param("id") id: number
    ) {
        return this.userService.delete(id);
    }

    @Get("/user-roles/:idUser")
    getUserRoles(
        @Param("idUser") idUser: number
    ) {
        return this.userService.getUserRoles(idUser);
    }

    @Post("/role-to-user")
    addRoleToUser(@Body() dto: AddRoleToUser) {
        return this.userService.addRoleToUser(dto);
    }

    @Delete("/role-to-user/:idUserRole")
    deleteRoleToUser(
        @Param("idUserRole") idUserRole: number
    ) {
        return this.userService.deleteRoleToUser(idUserRole);
    }

    @Post("/my-profile")
    getMyProfile(
        @Body() myProfileDto: MyProfileDto
    ) {
        return this.userService.getMyProfile(myProfileDto);
    }

    @Post("/edit")
    edit() {

    }
}