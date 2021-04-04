import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters, UploadedFiles, UseInterceptors, Headers, UseGuards } from "@nestjs/common";
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { EditPublicationDto } from "./dto/edit-publication.dto";
import { ReportPublicationDto } from "./dto/report-publication.dto";
import { RolesGuard } from "../role/roles.guard";
import { Roles } from "../role/role.decorator";
import { RoleList } from "../role/role-list";

@UseGuards(RolesGuard)
@Controller("/publication")
export class PublicationController {

    constructor(private publicationService: PublicationService) { }

    @Get("/:id")
    getOne(
        @Param("id") id: number,
    ) {
        return this.publicationService.getOne(id);
    }


    @Get("/")
    getAll(
        @Query("count") count?: number,
        @Query("offset") offset?: number,
        @Query("usersId") usersId?: string,
        @Query("publicationsId") publicationsId?: string
    ) {
        return this.publicationService.getAll(count, offset, usersId, publicationsId);
    }

    @Post("/create")
    @Roles(RoleList.VERIFIED)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]))
    create(
        @UploadedFiles() files,
        @Body() dto: CreatePublicationDto,
        @Headers("Authorization") authorization: string
    ) {
        const { picture, file } = files;
        return this.publicationService.create(dto, authorization.split(' ')[1], picture, file);
    }

    @Post("/edit-publication")
    @Roles(RoleList.PUBLICATIONS)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]))
    editPublication(
        @UploadedFiles() files,
        @Body() dto: EditPublicationDto,
        @Headers("Authorization") authorization: string
    ) {
        const { picture, file } = files;
        return this.publicationService.editPublication(dto, authorization.split(' ')[1], picture, file);
    }

    @Post("/report")
    @Roles(RoleList.VERIFIED)
    reportPublication(
        @Body() dto: ReportPublicationDto
    ) {
        return this.publicationService.reportPublication(dto);
    }

    @Post("/report/checked")
    @Roles(RoleList.PUBLICATIONS)
    checkReportPublication(
        @Body("reportId") reportId: number
    ) {
        return this.publicationService.checkReportPublication(reportId);
    }

    @Get("/report/all")
    @Roles(RoleList.PUBLICATIONS)
    getReports(
        @Query("count") count?: number,
        @Query("offset") offset?: number,
        @Query("onlyNotChecked") onlyNotChecked?: string
    ) {
        return this.publicationService.getReports(count, offset, onlyNotChecked);
    }

    @Post("/edit-user-publication")
    @Roles(RoleList.PUBLICATIONS)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]))
    editUserPublication(
        @UploadedFiles() files,
        @Body() dto: EditPublicationDto,
        @Headers("Authorization") authorization: string
    ) {
        const { picture, file } = files;
        return this.publicationService.editUserPublication(dto, authorization.split(' ')[1], picture, file);
    }


    @Delete("/delete-publication/:id")
    @Roles(RoleList.VERIFIED)
    deleteMyPublication(
        @Param("id") id: number,
        @Headers("Authorization") authorization: string
    ) {
        return this.publicationService.deleteMyPublication(id, authorization.split(' ')[1]);
    }

    @Delete("/delete-user-publication/:id")
    @Roles(RoleList.PUBLICATIONS)
    deleteUserPublication(
        @Param("id") id: number,
        @Headers("Authorization") authorization: string
    ) {
        return this.publicationService.deleteUserPublication(id, authorization.split(' ')[1]);
    }
}