import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Position } from "./database/position.model";
import { User } from "./database/user.model";
import { AddPositionToUser } from "./dto/add-position-to-user.dto";
import { CreatePositionDto } from "./dto/create-position.dto";
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

@Injectable()
export class PositionService {
    constructor(
        @InjectModel(Position) private positionModel: typeof Position,
        @InjectModel(User) private userModel: typeof User,
    ) { }

    async create(dto: CreatePositionDto): Promise<Position> {
        if (await this.positionModel.findOne({ where: { name: dto.name } })) {
            throw new BadRequestException("такая должность существует!");
        }

        try {
            const position = await this.positionModel.create({ name: dto.name });
            return position;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getAll(): Promise<Position[]> {
        try {
            const positions = await this.positionModel.findAll();
            return positions;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getOne(name: string): Promise<Position> {
        const position = await this.positionModel.findOne({ where: { name } });
        if (!position) {
            throw new BadRequestException("такой должности не существует!");
        }
        try {
            return position;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async delete(name: string): Promise<Object> {
        const position = await this.positionModel.findOne({ where: { name } });
        if (!position) {
            throw new BadRequestException("такой должности не существует!");
        }

        try {
            if(position.name === "студент") {
                throw new InternalServerErrorException("должность студент нельзя удалить!");
            }
            position.destroy();
            return { message: `должность ${name} удалена` };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async addPositionToUser(dto: AddPositionToUser): Promise<Object>  {
        const user = await this.userModel.findOne({where: {id: dto.userId}});
        if(!user) {
            throw new BadRequestException("пользователь не найден");
        }
        const position = await this.positionModel.findOne({ where: { name: dto.namePosition } });
        if (!position) {
            throw new BadRequestException("должность не найдена");
        }

        try {
            user.positionName = position.name;
            user.position = position;
            await user.save();

            return { message: `пользователю ${user.username} была присвоена должность ${position.name}`}
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }
}