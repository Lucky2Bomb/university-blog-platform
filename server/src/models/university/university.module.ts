import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthMiddleware } from "../../middleware/auth.middleware";
import { AddUserIdInBodyMiddleware, CompareBodyUserIdAndTokenMiddleware, } from "../../middleware/user.middleware";
import { RoleMiddleware } from "../../middleware/role.middleware";
import { RoleList } from "../role/role-list";
import { Group } from "./database/group.model";
import { User } from "../user/database/user.model";
import { University } from "./database/university.model";
import { Specialty } from "./database/specialty.model";
import { Faculty } from "./database/faculty.model";
import { UniversityController } from "./university.controller";
import { UniversityService } from "./university.service";

@Module({
    imports: [SequelizeModule.forFeature([User, Group, University, Specialty, Faculty])],
    controllers: [UniversityController],
    providers: [UniversityService]
})

export class UniversityModule
    implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.UNIVERSITY))
            .forRoutes({ path: "university/:type", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.UNIVERSITY))
            .forRoutes({ path: "university/:type/:name", method: RequestMethod.DELETE });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.UNIVERSITY))
            .forRoutes({ path: "university/group/create", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.UNIVERSITY))
            .forRoutes({ path: "university/group/edit", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.UNIVERSITY))
            .forRoutes({ path: "university/group/delete/:id", method: RequestMethod.DELETE });

        consumer
            .apply(AuthMiddleware, CompareBodyUserIdAndTokenMiddleware)
            .forRoutes({ path: "university/group/join", method: RequestMethod.POST });
    }
}