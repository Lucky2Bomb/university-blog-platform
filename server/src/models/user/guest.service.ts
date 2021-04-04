import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Position } from "./database/position.model";
import { User } from "./database/user.model";
import { AddPositionToUser } from "./dto/add-position-to-user.dto";
import { CreatePositionDto } from "./dto/create-position.dto";
import { GuestRequest } from "./database/guest_request.model";
import { CreateApplicationDto } from "./dto/create-application.dto";
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

@Injectable()
export class GuestService {
    constructor(
        @InjectModel(GuestRequest) private guestRequestModel: typeof GuestRequest,
        @InjectModel(User) private userModel: typeof User,
    ) { }

    async createApplication(dto: CreateApplicationDto) {
        try {
            const guestRequest = await this.guestRequestModel.create({ ...dto });
            return guestRequest;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getApplications(count: number = 10, offset: number = 0) {
        try {
            const guestRequests = await this.guestRequestModel.findAndCountAll({ 
                limit: Number(count),
                offset:  Number(offset),
                include: User,
                order: [['id', 'DESC']], });
            const allCountRequests = await this.guestRequestModel.count();
            return {
                guestRequests: guestRequests.rows,
                allCount: allCountRequests,
                currentCount: Number(count),
                offset: Number(offset)
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async checked(userId: number, applicationId: number) {
        try {
            const guestRequest = await this.guestRequestModel.findByPk(applicationId, {include: User});
            const user = await this.userModel.findByPk(userId);
            guestRequest.checked = true;
            guestRequest.user = user;
            guestRequest.userId = userId;
            await guestRequest.save();

            return guestRequest;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }
}