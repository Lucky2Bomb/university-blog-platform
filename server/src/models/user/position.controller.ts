import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters, UseGuards } from "@nestjs/common";
import { PositionService } from "./position.service";
import { CreatePositionDto } from "./dto/create-position.dto";
import { AddPositionToUser } from "./dto/add-position-to-user.dto";
import { RolesGuard } from "../role/roles.guard";
import { Roles } from "../role/role.decorator";
import { RoleList } from "../role/role-list";

@UseGuards(RolesGuard)
@Controller("/position")
export class PositionController {

    constructor(private positionService: PositionService) { }


    @Post("/create")
    @Roles(RoleList.USER_POSITION)
    create(@Body() dto: CreatePositionDto) {
        return this.positionService.create(dto);
    }

    @Get("/list")
    getAll() {
        return this.positionService.getAll();
    }

    @Get("/:name")
    getOne(
        @Param("name") name: string
    ) {
        return this.positionService.getOne(name);
    }

    @Delete("/:name")
    @Roles(RoleList.USER_POSITION)
    delete(
        @Param("name") name: string
    ) {
        return this.positionService.delete(name);
    }

    @Post("/add-position-to-user")
    @Roles(RoleList.USER_POSITION)
    addPositionToUser(@Body() dto: AddPositionToUser) {
        return this.positionService.addPositionToUser(dto);
    }
}