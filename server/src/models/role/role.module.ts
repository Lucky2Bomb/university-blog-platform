import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from './database/role.model';
import { UserRole } from "./database/user-role.model";
import { RoleController } from "./role.controller";
import { RoleService } from './role.service';

@Module({
    imports: [SequelizeModule.forFeature([Role, UserRole])],
    controllers: [RoleController],
    providers: [RoleService]
})

export class RoleModule { }