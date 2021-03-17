import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters, UploadedFiles, UseInterceptors, Headers } from "@nestjs/common";
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { EditPublicationDto } from "./dto/edit-publication.dto";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";
import { BookmarkService } from "./bookmark.service";

@Controller("/bookmark")
export class BookmarkController {

    constructor(private bookmarkService: BookmarkService) { }

    @Get("/")
    get(
        @Query("count") count?: number,
        @Query("offset") offset?: number,
        @Query("userId") userId?: number
    ) {
        return this.bookmarkService.get(count, offset, userId);
    }

    @Post("/create")
    create(
        @Body() dto: CreateBookmarkDto
    ) {
        return this.bookmarkService.create(dto);
    }
    
    @Delete("/delete/:id")
    delete(
        @Param("id") id: number,
        @Query("userId") userId?: number
    ) {
        return this.bookmarkService.delete(id, userId);
    }


    // @Get("/list")
    // getAll(
    //     @Query("count") count?: number,
    //     @Query("offset") offset?: number,
    //     @Query("usersId") usersId?: string
    // ) {
    //     return this.publicationService.getAll(count, offset, usersId);
    // }

    // @Post("/create")
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'picture', maxCount: 1 },
    //     { name: 'file', maxCount: 1 }
    // ]))
    // create(
    //     @UploadedFiles() files,
    //     @Body() dto: CreatePublicationDto,
    //     @Headers("Authorization") authorization: string
    // ) {
    //     const { picture, file } = files;
    //     return this.publicationService.create(dto, authorization.split(' ')[1], picture, file);
    // }

    // @Post("/edit-publication")
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'picture', maxCount: 1 },
    //     { name: 'file', maxCount: 1 }
    // ]))
    // editPublication(
    //     @UploadedFiles() files,
    //     @Body() dto: EditPublicationDto,
    //     @Headers("Authorization") authorization: string
    // ) {
    //     const { picture, file } = files;
    //     return this.publicationService.editPublication(dto, authorization.split(' ')[1], picture, file);
    // }


    // @Post("/edit-user-publication")
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'picture', maxCount: 1 },
    //     { name: 'file', maxCount: 1 }
    // ]))
    // editUserPublication(
    //     @UploadedFiles() files,
    //     @Body() dto: EditPublicationDto,
    //     @Headers("Authorization") authorization: string
    // ) {
    //     const { picture, file } = files;
    //     return this.publicationService.editUserPublication(dto, authorization.split(' ')[1], picture, file);
    // }


    // @Delete("/delete-publication/:id")
    // deletePublication(
    //     @Param("id") id: number,
    //     @Headers("Authorization") authorization: string
    // ) {
    //     return this.publicationService.deletePublication(id, authorization.split(' ')[1]);
    // }

    // @Delete("/delete-user-publication/:id")
    // deleteUserPublication(
    //     @Param("id") id: number,
    //     @Headers("Authorization") authorization: string
    // ) {
    //     return this.publicationService.deleteUserPublication(id, authorization.split(' ')[1]);
    // }
}