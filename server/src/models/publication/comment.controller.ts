import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters, UploadedFiles, UseInterceptors, Headers } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

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
    create(
        @Body() dto: CreateCommentDto
    ) {
        return this.commentService.create(dto);
    }
    
    @Delete("/delete/:id")
    delete(
        @Param("id") id: number
    ) {
        return this.commentService.delete(id);
    }
}