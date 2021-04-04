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
import { EditUserDto } from "./dto/edit-user.dto";
import { Subscriber } from "./database/subscriber.model";
import { SubscribeDto } from "./dto/subscribe.dto";
import { FileService, SectionType, FileType } from "../file/file.service";
import { Publication } from "../publication/database/publication.model";
import { PublicationService } from './../publication/publication.service';
import { Group } from "../university/database/group.model";
import { tablesList } from "./interface/Tables-list";
import { AddRoleToUsers } from "./dto/add-role-to-users.dto";
import { ReplaceRolesToUser } from './dto/replace-roles-to-user.dto';
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
        @InjectModel(Subscriber) private subscriberModel: typeof Subscriber,
        @InjectModel(Publication) private publicationModel: typeof Publication,
        @InjectModel(Group) private groupModel: typeof Group,
        private fileService: FileService,
        private publcationService: PublicationService
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

    async getAll(count = 20, offset = 0, where = {}, attributes = null): Promise<IUserPageList> {
        try {
            const users = await this.userModel.findAndCountAll({
                limit: Number(count <= config.pagination_settings.max_count ? count : config.pagination_settings.max_count),
                offset: Number(offset),
                order: [['createdAt', 'DESC']],
                where,
                attributes
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

    async getAllTeachers(): Promise<User[]> {
        try {
            const users = await this.userModel.findAll({where: {
                positionName: "преподаватель"
            }});

            return users;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getAllWithTables(count: number = 10, offset: number = 0, tables: string = ""): Promise<IUserPageList> {

        try {

            const arrTables = JSON.parse(tables) as string[];
            const includes = [];
            if (arrTables.indexOf(tablesList.GROUP) > -1) {
                includes.push(Group);
            }

            if (arrTables.indexOf(tablesList.ROLE) > -1) {
                includes.push(UserRole);
            }

            const users = await this.userModel.findAndCountAll({
                limit: Number(count <= config.pagination_settings.max_count ? count : config.pagination_settings.max_count),
                offset: Number(offset),
                order: [['createdAt', 'DESC']],
                include: includes
            });
            const usersAllCount = await this.userModel.count();

            return {
                users: users.rows,
                allCount: usersAllCount,
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

    async delete({ id, usersId }): Promise<object> {
        try {
            if (id) {
                const user = await this.userModel.findByPk(id);
                if (!user) {
                    throw new NotFoundException("пользователь не найден");
                }
                await user.destroy();
                return { message: "пользователь удалён" };
            } else if (usersId.length > 0) {
                const users = await this.userModel.findAll({
                    where: {
                        id: usersId
                    }
                });

                await users.map(async user => {
                    await user.destroy();
                });
                return { message: "пользователи удалёны" };

            } else {
                throw new NotFoundException("пользователь не найден");
            }
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


    async replaceRolesToUser(dto: ReplaceRolesToUser): Promise<object> {
        try {
            const user = await this.userModel.findByPk(Number(dto.userId));
            if (!user) {
                throw new NotFoundException("пользователь не найден");
            }

            const userRoles = await this.userRoleModel.findAll({ where: { userId: user.id } });
            await userRoles.map(async userRole => await userRole.destroy());
            const newUserRoles = [];

            await dto.roleNames.map(async roleName => {
                newUserRoles.push(await this.userRoleModel.create({ roleName, userId: user.id }));
            });


            return newUserRoles;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async addRoleToUsers(dto: AddRoleToUsers): Promise<object> {
        try {
            if (dto.usersId.length < 1) {
                throw new InternalServerErrorException("массив ролей пуст");
            }
            const arrUserRoles = [];
            await dto.usersId.map(async value => {
                if (!await this.userRoleModel.findOne({ where: { userId: Number(value), roleName: dto.roleName } })) {
                    [].push(await this.userRoleModel.create({ roleName: dto.roleName, userId: Number(value) }));
                }
            });

            return arrUserRoles;
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

    async getUserRolesByToken(token: string) {
        let decodedTokenData: IDecodedTokenStructure = jsonwebtoken.verify(token, config.secret_key);
        if (!decodedTokenData.userId) {
            throw new BadRequestException("токен не верно указан либо устарел");
        }
        try {
            const userRoles = await this.userRoleModel.findAll({ where: { userId: decodedTokenData.userId } });
            return userRoles;
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

    async getMyProfile(myProfileDto: MyProfileDto): Promise<User> {
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

    async edit(dto: EditUserDto): Promise<object> {
        try {
            const user = await this.userModel.findByPk(dto.userId);
            if (!user) {
                throw new InternalServerErrorException("пользователь не найден");
            }

            if (dto.email) {
                user.email = dto.email;
            }

            if (dto.facebook) {
                user.facebook = dto.facebook;
            }

            if (dto.phone_number) {
                user.phone_number = dto.phone_number;
            }

            if (dto.telegram) {
                user.telegram = dto.telegram;
            }

            if (dto.vk) {
                user.vk = dto.vk;
            }

            if (dto.whatsapp) {
                user.whatsapp = dto.whatsapp;
            }

            if (dto.name) {
                user.name = dto.name;
            }

            if (dto.surname) {
                user.surname = dto.surname;
            }

            if (dto.patronymic) {
                user.patronymic = dto.patronymic;
            }
            user.save().catch((e) => console.log(e));

            return {
                message: "профиль изменён"
            };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async editAnotherUser(dto: EditUserDto) {
        this.edit(dto);
    }

    async subscribe(dto: SubscribeDto) {
        let decodedTokenData: IDecodedTokenStructure = await jsonwebtoken.verify(dto.token, config.secret_key);
        if (!decodedTokenData.userId) {
            throw new BadRequestException("токен не верно указан либо устарел");
        }

        try {
            const user = await this.userModel.findByPk(Number(dto.idAnotherUser));
            if (!user) {
                throw new InternalServerErrorException("пользователь не найден");
            }
            if (Number(decodedTokenData.userId) === Number(dto.idAnotherUser)) {
                throw new InternalServerErrorException("нельзя подписаться на себя");
            }
            const findSubscribe = await this.subscriberModel.findAll({
                where: {
                    subscriberId: Number(decodedTokenData.userId),
                    userId: Number(dto.idAnotherUser)
                }
            });
            if (findSubscribe.length > 0) {
                console.log(findSubscribe);
                throw new InternalServerErrorException("уже подписан");
            }
            const subscriber = await this.subscriberModel.create({
                subscriberId: Number(decodedTokenData.userId),
                userId: Number(dto.idAnotherUser)
            });
            return subscriber;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async unsubscribe(dto: SubscribeDto) {
        let decodedTokenData: IDecodedTokenStructure = jsonwebtoken.verify(dto.token, config.secret_key);
        if (!decodedTokenData.userId) {
            throw new BadRequestException("токен не верно указан либо устарел");
        }

        try {
            const user = await this.userModel.findByPk(Number(dto.idAnotherUser));
            if (!user) {
                throw new InternalServerErrorException("пользователь не найден");
            }
            if (Number(decodedTokenData.userId) === Number(dto.idAnotherUser)) {
                throw new InternalServerErrorException("нельзя отписаться от себя");
            }
            if (Number(decodedTokenData.userId) !== Number(decodedTokenData.userId)) {
                throw new InternalServerErrorException("токен не совпадает");
            }
            const findSubscribe = await this.subscriberModel.findAll({
                where: {
                    subscriberId: Number(decodedTokenData.userId),
                    userId: Number(dto.idAnotherUser)
                }
            });
            if (findSubscribe.length === 0) {
                console.log(findSubscribe);
                throw new InternalServerErrorException("уже отписан");
            }
            findSubscribe[0].destroy();
            return {
                message: "отписан"
            };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async checkSubscribe(dto: SubscribeDto) {
        let decodedTokenData: IDecodedTokenStructure = jsonwebtoken.verify(dto.token, config.secret_key);
        if (!decodedTokenData.userId) {
            throw new BadRequestException("токен не верно указан либо устарел");
        }
        try {
            if (Number(decodedTokenData.userId) !== Number(decodedTokenData.userId)) {
                throw new InternalServerErrorException("токен не совпадает");
            }
            const findSubscribe = await this.subscriberModel.findAll({
                where: {
                    subscriberId: Number(decodedTokenData.userId),
                    userId: Number(dto.idAnotherUser)
                }
            });

            const check = findSubscribe.length > 0;
            return {
                message: check
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async checkCountSubscribes(userId: number) {
        try {
            const user = await this.userModel.findByPk(Number(userId));
            if (!user) {
                throw new InternalServerErrorException("пользователь не найден");
            }

            const countSubscribers = await this.subscriberModel.findAll({
                where: {
                    userId: user.id
                }
            });

            return {
                message: countSubscribers.length
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async publishingSubscriptions(userId: number, count = 10, offset = 0) {
        try {
            const subscriptionsArray = await this.subscriberModel.findAll({
                where: {
                    subscriberId: Number(userId)
                }
            });
            const usersId = `[${subscriptionsArray.map(item => item.userId)}]`;
            const publications = await this.publcationService.getAll(count, offset, usersId, "");
            return publications;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async subscriptionsUsers(userId: number, count: number = 10, offset: number = 0) {
        try {
            const subscriptionsArray = await this.subscriberModel.findAll({
                where: {
                    subscriberId: Number(userId)
                }
            });
            const usersId = subscriptionsArray.map(item => item.userId);
            const users = await this.getAll(count, offset, { id: usersId }, { exclude: ["password"] });
            return users;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async subscribersUser(userId: number, count: number = 10, offset: number = 0) {
        try {
            const subscribers = await this.subscriberModel.findAll({
                where: {
                    userId: Number(userId)
                }
            });
            const usersId = subscribers.map(item => item.subscriberId);
            const users = await this.getAll(count, offset, { id: usersId }, { exclude: ["password"] });
            return users;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async uploadImage(picture, userId: number, type: SectionType) {
        try {
            const user = await this.userModel.findByPk(userId);
            if (!user) {
                throw new InternalServerErrorException("пользователь не найден");
            }

            if (type === SectionType.PROFILE_AVATAR && user.avatarUrl) {
                await this.fileService.removeFile(user.avatarUrl);
            }

            if (type === SectionType.PROFILE_BACKGROUND && user.backgroundUrl) {
                await this.fileService.removeFile(user.avatarUrl);
            }

            let picturePath;

            if (picture.length > 0) {
                if (type === SectionType.PROFILE_AVATAR && picture[0].size > config.file_settings.profile.max_avatar_size) {
                    throw new BadRequestException("слишком большой размер картинки, нужен размер <1MB");
                }

                if (type === SectionType.PROFILE_BACKGROUND && picture[0].size > config.file_settings.profile.max_background_size) {
                    throw new BadRequestException("слишком большой размер картинки, нужен размер <2MB");
                }

                picturePath = this.fileService.createFile(userId, type, FileType.IMAGE, picture[0]);
            } else {
                picturePath = "";
            }
            if (type === SectionType.PROFILE_AVATAR) {
                user.avatarUrl = picturePath;
            }
            if (type === SectionType.PROFILE_BACKGROUND) {
                user.backgroundUrl = picturePath;
            }
            user.save();
            return {
                message: "картинка загружена"
            }

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async deleteImage(userId: number, type: SectionType) {
        try {
            const user = await this.userModel.findByPk(userId);
            if (!user) {
                throw new InternalServerErrorException("пользователь не найден");
            }
            if (type === SectionType.PROFILE_AVATAR) {
                this.fileService.removeFile(user.avatarUrl);
                user.avatarUrl = "";
                user.save();
            }

            if (type === SectionType.PROFILE_BACKGROUND) {
                this.fileService.removeFile(user.backgroundUrl);
                user.backgroundUrl = "";
                user.save();
            }

            return {
                message: "картинка удалена"
            }

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }
}