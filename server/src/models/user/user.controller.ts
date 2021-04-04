import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters, UseInterceptors, UploadedFiles, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AddRoleToUser } from './dto/add-role-to-user.dto';
import { MyProfileDto } from './dto/my-profile.dto';
import { EditUserDto } from "./dto/edit-user.dto";
import { SubscribeDto } from "./dto/subscribe.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { FileType, SectionType } from "../file/file.service";
import { AddRoleToUsers } from "./dto/add-role-to-users.dto";
import { RolesGuard } from "../role/roles.guard";
import { RoleList } from "../role/role-list";
import { Roles } from "../role/role.decorator";
import { ReplaceRolesToUser } from './dto/replace-roles-to-user.dto';

@UseGuards(RolesGuard)
@Controller("/user")
export class UserController {

    constructor(private userService: UserService) { }

    @Get("/subscribe/:id")
    checkCountSubscribes(
        @Param("id") id: number
    ) {
        return this.userService.checkCountSubscribes(id);
    }

    @Get("/subscriptions/publications")
    publishingSubscriptions(
        @Query("userId") userId: number,
        @Query("count") count?: number,
        @Query("offset") offset?: number
    ) {
        return this.userService.publishingSubscriptions(userId, count, offset);
    }

    @Get("/subscriptions/users")
    subscriptionsUsers(
        @Query("userId") userId: number,
        @Query("count") count?: number,
        @Query("offset") offset?: number
    ) {
        return this.userService.subscriptionsUsers(userId, count, offset);
    }

    @Get("/subscribers")
    subscribersUser(
        @Query("userId") userId: number,
        @Query("count") count?: number,
        @Query("offset") offset?: number
    ) {
        return this.userService.subscribersUser(userId, count, offset);
    }


    @Post("/subscribe")
    subscribe(@Body() dto: SubscribeDto) {
        return this.userService.subscribe(dto);
    }

    @Post("/unsubscribe")
    unsubscribe(@Body() dto: SubscribeDto) {
        return this.userService.unsubscribe(dto);
    }

    @Post("/check-subscribe")
    checkSubscribe(@Body() dto: SubscribeDto) {
        return this.userService.checkSubscribe(dto);
    }

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

    @Get("/list-all-teachers")
    getAllTeachers() {
        return this.userService.getAllTeachers();
    }


    @Get("/list-with-include")
    getAllWithTables(
        @Query("count") count?: number,
        @Query("offset") offset?: number,
        @Query("tables") tables?: string
    ) {
        return this.userService.getAllWithTables(count, offset, tables);
    }

    @Get("/:id")
    getOne(
        @Param("id") id: number
    ) {
        return this.userService.getOne(id);
    }

    @Delete("/")
    @Roles(RoleList.USER_CONTROL)
    delete(
        @Body("id") id?: number,
        @Body("usersId") usersId?: number[]
    ) {
        return this.userService.delete({ id, usersId });
    }

    @Get("/user-roles/:idUser")
    getUserRoles(
        @Param("idUser") idUser: number
    ) {
        return this.userService.getUserRoles(idUser);
    }

    @Post("/user-roles")
    getUserRolesByToken(
        @Body("token") token: string
    ) {
        return this.userService.getUserRolesByToken(token);
    }

    @Post("/role-to-user")
    @Roles(RoleList.USER_ROLE)
    addRoleToUser(@Body() dto: AddRoleToUser) {
        return this.userService.addRoleToUser(dto);
    }

    @Post("/replace-roles-to-user")
    @Roles(RoleList.USER_ROLE)
    replaceRolesToUser(@Body() dto: ReplaceRolesToUser) {
        return this.userService.replaceRolesToUser(dto);
    }

    @Post("/role-to-users")
    @Roles(RoleList.USER_ROLE)
    addRoleToUsers(@Body() dto: AddRoleToUsers) {
        return this.userService.addRoleToUsers(dto);
    }

    @Delete("/role-to-user/:idUserRole")
    @Roles(RoleList.USER_ROLE)
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
    @Roles(RoleList.USER)
    edit(
        @Body() editUserDto: EditUserDto
    ) {
        return this.userService.edit(editUserDto);
    }

    @Post("/edit-another-user")
    @Roles(RoleList.USER_CONTROL)
    editAnotherUser(
        @Body() editUserDto: EditUserDto
    ) {
        return this.userService.editAnotherUser(editUserDto);
    }


    @Post("/upload-avatar")
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 }
    ]))
    addAvatar(
        @UploadedFiles() files,
        @Query("userId") userId: number
    ) {
        const { picture } = files;
        return this.userService.uploadImage(picture, userId, SectionType.PROFILE_AVATAR);
    }

    @Post("/delete-avatar")
    deleteAvatar(
        @Query("userId") userId: number
    ) {
        return this.userService.deleteImage(userId, SectionType.PROFILE_AVATAR);
    }

    @Post("/upload-background")
    @Roles(RoleList.VERIFIED)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 }
    ]))
    addBackground(
        @UploadedFiles() files,
        @Query("userId") userId: number
    ) {
        const { picture } = files;
        return this.userService.uploadImage(picture, userId, SectionType.PROFILE_BACKGROUND);
    }

    @Post("/delete-background")
    @Roles(RoleList.VERIFIED)
    deleteBackground(
        @Query("userId") userId: number
    ) {
        return this.userService.deleteImage(userId, SectionType.PROFILE_BACKGROUND);
    }
}