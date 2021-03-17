import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Controller("/roles")
export class RoleController {

    constructor(private roleService: RoleService) { }

    @Post("/create")
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
    delete(
        @Param("name") name: string
    ) {
        return this.roleService.delete(name);
    }
}