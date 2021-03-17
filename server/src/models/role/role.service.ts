import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from './database/role.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role) private roleModel: typeof Role
    ) { }

    async create(dto: CreateRoleDto): Promise<Role> {
        try {
            const role = await this.roleModel.create({ ...dto });
            return role;
        } catch (error) {
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getAll(): Promise<Role[]> {
        try {
            const roles = await this.roleModel.findAll();
            return roles;
        } catch (error) {
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getOne(name: string) {
        try {
            const role = await this.roleModel.findByPk(name);
            return role;
        } catch (error) {
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async delete(name: string) {
        const role = await this.roleModel.findOne({ where: { name } });
        if (!role) {
            throw new BadRequestException("такой роли не существует!");
        }

        try {
            role.destroy();
            return { message: `роль ${name} удалена` };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }
}