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

@Module({
    imports: [SequelizeModule.forFeature([User, UserRole, Role, Position, Publication, Bookmark])],
    controllers: [UserController, PositionController],
    providers: [UserService, PositionService]
})

export class UserModule {
// implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//         consumer
//             .apply(CheckUserExistMiddleware)
//             .forRoutes(
//                 { path: "user/login", method: RequestMethod.POST },
//                 { path: "user/:id", method: RequestMethod.GET },
//                 { path: "user/:id", method: RequestMethod.DELETE },
//                 { path: "user/user-roles/:idUser", method: RequestMethod.GET },
//                 { path: "user/role-to-user/:id", method: RequestMethod.POST },
//                 { path: "user/role-to-user/:id", method: RequestMethod.POST },

//             );
//     }
}