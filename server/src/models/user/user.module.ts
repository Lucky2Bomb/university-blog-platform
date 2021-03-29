import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './database/user.model';
import { UserRole } from "../role/database/user-role.model";
import { Role } from "../role/database/role.model";
import { Position } from "./database/position.model";
import { PositionController } from "./position.controller";
import { PositionService } from "./position.service";
import { Publication } from "../publication/database/publication.model";
import { Bookmark } from "../publication/database/bookmark.model";
import { Subscriber } from "./database/subscriber.model";
import { AuthMiddleware } from "src/middleware/auth.middleware";
import { RoleMiddleware } from "src/middleware/role.middleware";
import { RoleList } from "../role/role-list";
import { CompareBodyUserIdAndTokenMiddleware, AddUserIdInBodyMiddleware, PushUserIdInQueryByTokenMiddleware } from "src/middleware/user.middleware";
import { Comment } from "../publication/database/comment.model";
import { FileService } from "../file/file.service";
import { PublicationService } from "../publication/publication.service";
import { PublicationComplaint } from "../publication/database/publication-complaint.model";
import { Group } from "../university/database/group.model";
import { University } from "../university/database/university.model";
import { Specialty } from "../university/database/specialty.model";
import { Faculty } from "../university/database/faculty.model";

@Module({
    imports: [SequelizeModule.forFeature([User, UserRole, Role, Position, Publication, Bookmark, Subscriber, Comment, PublicationComplaint, Group, University, Faculty, Specialty])],
    controllers: [UserController, PositionController],
    providers: [UserService, PositionService, FileService, PublicationService]
})

export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        // consumer
        //     .apply(AuthMiddleware)
        //     .forRoutes({ path: "user/subscribe", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.USER_CONTROL))
            .forRoutes({ path: "user/*/", method: RequestMethod.DELETE });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.USER_ROLE))
            .forRoutes({ path: "user/role-to-user/*/", method: RequestMethod.DELETE });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.USER_ROLE))
            .forRoutes({ path: "user/role-to-user", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.USER_ROLE))
            .forRoutes({ path: "user/role-to-users", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, CompareBodyUserIdAndTokenMiddleware)
            .forRoutes({ path: "user/edit", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, PushUserIdInQueryByTokenMiddleware)
            .forRoutes({ path: "user/upload-avatar", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, PushUserIdInQueryByTokenMiddleware)
            .forRoutes({ path: "user/delete-avatar", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, PushUserIdInQueryByTokenMiddleware)
            .forRoutes({ path: "user/upload-background", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, PushUserIdInQueryByTokenMiddleware)
            .forRoutes({ path: "user/delete-background", method: RequestMethod.POST });
    }
}