import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { UserModule } from './models/user/user.module';
import * as path from "path";
import { SequelizeModule } from "@nestjs/sequelize";
import { RoleModule } from "./models/role/role.module";
import { PublicationModule } from "./models/publication/publication.module";
import config from "config";
import { RoleList } from "./models/role/role-list";
import { AddUserIdInBodyMiddleware, CompareQueryUserIdAndTokenMiddleware, PushUserIdInQueryByTokenMiddleware, CompareBodyUserIdAndTokenMiddleware } from "./middleware/user.middleware";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { RoleMiddleware } from "./middleware/role.middleware";
import { TestConnectionModule } from "./models/test-connection/test-connection.module";

const { host, port, username, password, database, timezone } = config.database;

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static'), }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host, port, username, password, database, timezone,
            autoLoadModels: true,
            synchronize: true
        }),
        UserModule, RoleModule, PublicationModule, TestConnectionModule
    ]
})

export class AppModule
    implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.USER_POSITION))
            .forRoutes({ path: "position/create", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.USER_POSITION))
            .forRoutes({ path: "position/*", method: RequestMethod.DELETE });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.ADMIN))
            .forRoutes({ path: "roles/create", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.VERIFIED))
            .forRoutes({ path: "publication/create", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.VERIFIED))
            .forRoutes({ path: "publication/edit-publication", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.PUBLICATIONS))
            .forRoutes({ path: "publication/delete-user-publication/*", method: RequestMethod.DELETE });

        consumer
            .apply(AuthMiddleware, RoleMiddleware(RoleList.USER_POSITION))
            .forRoutes({ path: "position/add-position-to-user", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, AddUserIdInBodyMiddleware, RoleMiddleware(RoleList.VERIFIED))
            .forRoutes({ path: "bookmark/create", method: RequestMethod.POST });

        consumer
            .apply(AuthMiddleware, CompareQueryUserIdAndTokenMiddleware, RoleMiddleware(RoleList.VERIFIED))
            .forRoutes({ path: "bookmark/", method: RequestMethod.GET });

        consumer
            .apply(AuthMiddleware, PushUserIdInQueryByTokenMiddleware, RoleMiddleware(RoleList.VERIFIED))
            .forRoutes({ path: "bookmark/delete/:id", method: RequestMethod.DELETE });

        consumer
            .apply(AuthMiddleware)
            .forRoutes({ path: "test/auth", method: RequestMethod.GET });


        // consumer
        // .apply(AuthMiddleware, RoleMiddleware(RoleList.USER_POSITION))
        // .forRoutes({path: "position/create", method: RequestMethod.POST});

        // consumer
        // .apply(AuthMiddleware, RoleMiddleware(RoleList.USER_POSITION))
        // .forRoutes({path: "position/:name", method: RequestMethod.DELETE});
        //
    }
}

    // implements NestModule {
    //     configure(consumer: MiddlewareConsumer) {
    //         consumer
    //         .apply(AuthMiddleware)
    //         .forRoutes({path: "position/add-position-to-user", method: RequestMethod.POST});
    //     }
    // }