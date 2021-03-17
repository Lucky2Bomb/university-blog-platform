import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from './database/user.model';
import { CreateUserDto } from "./dto/create-user.dto";
import { IUserPageList } from './interface/IUserPageList';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRole } from '../role/database/user-role.model';
import { Role } from "../role/database/role.model";
import config from "config";
import { ITokenResponse } from "./interface/ITokenResponse";
import { PayloadTokenDto } from "./dto/payload-token.dto";
import { AddRoleToUser } from './dto/add-role-to-user.dto';
import { Position } from "./database/position.model";
import { IDecodedTokenStructure } from "./interface/IDecodedTokenStructure";
import { MyProfileDto } from "./dto/my-profile.dto";
import { RoleList } from "../role/role-list";
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (dto: PayloadTokenDto) => {
    const payload = { ...dto };
    return jsonwebtoken.sign(payload, config.secret_key, { expiresIn: config.token_auth_lifetime });
}

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(UserRole) private userRoleModel: typeof UserRole,
        @InjectModel(Role) private roleModel: typeof Role,
        @InjectModel(Position) private positionModel: typeof Position,
    ) { }

    async create(dto: CreateUserDto): Promise<User> {

        if (await this.userModel.findOne({ where: { username: dto.username } })) {
            throw new BadRequestException("такой пользователь уже существует!");
        }

        try {
            const hashPassword = bcrypt.hashSync(dto.password, 7);
            const user = await this.userModel.create({ ...dto, password: hashPassword, positionName: "студент" });
            const userRole = await this.roleModel.findByPk("USER");
            const userRoleList = await this.userRoleModel.create({ roleName: userRole.name, userId: user.id });
            user.password = null;
            return user;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async login(dto: LoginUserDto): Promise<Object> {
        const user = await this.userModel.findOne({ where: { username: dto.username } });
        if (!user) {
            throw new NotFoundException("пользователь не найден");
        }
        const validPassword = bcrypt.compareSync(dto.password, user.password);
        if (!validPassword) {
            throw new BadRequestException("не верный пароль");
        }
        try {

            const userRoles = await this.userRoleModel.findAll({ where: { userId: user.id } });
            const arrStringUserRoles: RoleList[] = [];
            userRoles.map(role => arrStringUserRoles.push(RoleList[role.roleName]));

            let tokenStructure: IDecodedTokenStructure = { userId: Number(user.id), userRoles: arrStringUserRoles };
            const token = generateToken(tokenStructure);
            return { token: token };

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async checkNameExists(username: string): Promise<object> {
        try {
            const user = await this.userModel.findOne({ where: { username: username } })
            return { message: user ? true : false };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getAll(count = 20, offset = 0): Promise<IUserPageList> {
        try {
            const users = await this.userModel.findAndCountAll({
                limit: Number(count <= config.pagination_settings.max_count ? count : config.pagination_settings.max_count),
                offset: Number(offset),
                order: [['createdAt', 'DESC']]
            });

            return {
                users: users.rows,
                allCount: users.count,
                currentCount: Number(count),
                offset: Number(offset)
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getOne(id: number): Promise<User> {
        try {
            const user = await this.userModel.findByPk(id);
            if (!user) {
                throw new NotFoundException("пользователь не найден");
            }
            user.password = null;
            return user;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async delete(id: number): Promise<object> {
        try {
            const user = await this.userModel.findByPk(id);
            if (!user) {
                throw new NotFoundException("пользователь не найден");
            }
            user.destroy();
            return { message: "пользователь удалён" };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async addRoleToUser(dto: AddRoleToUser): Promise<object> {
        const user = await this.userModel.findByPk(Number(dto.userId));
        if (!user) {
            throw new NotFoundException("пользователь не найден");
        }
        const role = await this.roleModel.findByPk(dto.roleName);
        if (!role) {
            throw new NotFoundException("роль не найдена");
        }
        const checkUserRole = await this.userRoleModel.findOne({ where: { roleName: role.name, userId: user.id } });
        if (checkUserRole) {
            throw new NotFoundException(`пользователь ${user.username} уже обладает ролью ${role.name}`);
        }

        try {
            const userRole = await this.userRoleModel.create({ roleName: role.name, userId: user.id });

            return { message: `роль ${role.name} добавлена пользователю ${user.username}` };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async deleteRoleToUser(idUserRole: number) {
        const userRole = await this.userRoleModel.findByPk(Number(idUserRole));
        if (!userRole) {
            throw new NotFoundException("У пользователя нет такой роли");
        }
        try {
            userRole.destroy();
            return { message: `Пользователь утратил роль ${userRole.roleName}` }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }



    async getUserRoles(idUser: number): Promise<UserRole[]> {
        const user = await this.userModel.findByPk(Number(idUser));
        if (!user) {
            throw new NotFoundException("пользователь не найден");
        }

        try {
            const userRoles = await this.userRoleModel.findAll({ where: { userId: idUser } });
            return userRoles;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getMyProfile( myProfileDto: MyProfileDto): Promise<User> {
        if (!myProfileDto.token) {
            throw new BadRequestException("токен не верно указан либо устарел");
        }

        let decodedTokenData: IDecodedTokenStructure = jsonwebtoken.verify(myProfileDto.token, config.secret_key);
        if (!decodedTokenData.userId) {
            throw new BadRequestException("токен не верно указан либо устарел");
        }
        try {
            const user = await this.userModel.findByPk(Number(decodedTokenData.userId));
            user.password = "";
            return user;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async edit() {

    }
}