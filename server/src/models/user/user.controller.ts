import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters, UseInterceptors, UploadedFiles } from "@nestjs/common";
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

    @Post("/user-roles")
    getUserRolesByToken(
        @Body("token") token: string
    ) {
        return this.userService.getUserRolesByToken(token);
    }

    @Post("/role-to-user")
    addRoleToUser(@Body() dto: AddRoleToUser) {
        return this.userService.addRoleToUser(dto);
    }

    @Post("/role-to-users")
    addRoleToUsers(@Body() dto: AddRoleToUsers) {
        return this.userService.addRoleToUsers(dto);
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
    edit(
        @Body() editUserDto: EditUserDto
    ) {
        return this.userService.edit(editUserDto);
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
    deleteBackground(
        @Query("userId") userId: number
    ) {
        return this.userService.deleteImage(userId, SectionType.PROFILE_BACKGROUND);
    }
}