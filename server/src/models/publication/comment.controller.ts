import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters, UploadedFiles, UseInterceptors, Headers, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { RoleList } from "../role/role-list";
import { Roles } from "../role/role.decorator";
import { RolesGuard } from "../role/roles.guard";

@UseGuards(RolesGuard)
@Controller("/comment")
export class CommentController {

    constructor(private commentService: CommentService) { }

    @Get("/")
    get(
        @Query("count") count?: number,
        @Query("offset") offset?: number,
        @Query("publicationId") publicationId?: number
    ) {
        return this.commentService.get(count, offset, publicationId);
    }

    @Post("/create")
    @Roles(RoleList.VERIFIED)
    create(
        @Body() dto: CreateCommentDto
    ) {
        return this.commentService.create(dto);
    }
    
    @Delete("/delete/:id")
    @Roles(RoleList.USER_COMMENT)
    delete(
        @Param("id") id: number
    ) {
        return this.commentService.delete(id);
    }
}