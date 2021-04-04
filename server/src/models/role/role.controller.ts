import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
import { RolesGuard } from "./roles.guard";
import { RoleList } from "./role-list";
import { Roles } from "./role.decorator";

@UseGuards(RolesGuard)
@Controller("/roles")
export class RoleController {

    constructor(private roleService: RoleService) { }

    @Post("/create")
    @Roles(RoleList.ADMIN)
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.create(dto);
    }

    @Get()
    getAll() {
        return this.roleService.getAll();
    }

    @Get("/:name")
    getOne(
        @Param("name") name: string
    ) {
        return this.roleService.getOne(name);
    }

    @Delete("/:name")
    @Roles(RoleList.ADMIN)
    delete(
        @Param("name") name: string
    ) {
        return this.roleService.delete(name);
    }
}