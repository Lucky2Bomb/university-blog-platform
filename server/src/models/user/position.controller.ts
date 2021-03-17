import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters } from "@nestjs/common";
import { PositionService } from "./position.service";
import { CreatePositionDto } from "./dto/create-position.dto";
import { AddPositionToUser } from "./dto/add-position-to-user.dto";

@Controller("/position")
export class PositionController {

    constructor(private positionService: PositionService) { }

    @Post("/create")
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
    delete(
        @Param("name") name: string
    ) {
        return this.positionService.delete(name);
    }

    @Post("/add-position-to-user")
    addPositionToUser(@Body() dto: AddPositionToUser) {
        return this.positionService.addPositionToUser(dto);
    }
}