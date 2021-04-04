import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { GuestService } from "./guest.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { RolesGuard } from "../role/roles.guard";
import { Roles } from "../role/role.decorator";
import { RoleList } from "../role/role-list";


@UseGuards(RolesGuard)
@Controller("/guest")
export class GuestController {

    constructor(private guestService: GuestService) { }

    @Post("/create-application")
    getAll(
        @Body() dto: CreateApplicationDto
    ) {
        return this.guestService.createApplication(dto);
    }

    @Get("/get-applications")
    @Roles(RoleList.USER_CONTROL)
    getApplications (
        @Query("count") count?: number,
        @Query("offset") offset?: number
    ) {
        return this.guestService.getApplications(count, offset);
    }

    @Post("/checked")
    @Roles(RoleList.USER_CONTROL)
    checked(
        @Body("userId") userId: number,
        @Body("applicationId") applicationId: number
    ) {
        return this.guestService.checked(userId, applicationId);
    }

}