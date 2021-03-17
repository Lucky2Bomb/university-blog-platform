import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { Publication } from "./database/publication.model";
import { User } from "../user/database/user.model";
import { FileService } from "../file/file.service";
import { Bookmark } from "./database/bookmark.model";
import { BookmarkController } from "./bookmark.controller";
import { BookmarkService } from "./bookmark.service";

@Module({
    imports: [SequelizeModule.forFeature([Publication, User, Bookmark])],
    controllers: [PublicationController, BookmarkController],
    providers: [PublicationService, FileService, BookmarkService]
})

export class PublicationModule   {}
//     implements NestModule {
//         configure(consumer: MiddlewareConsumer) {
//             consumer
//             .apply(checkUserIdPublicationMiddleware)
//             .forRoutes({path: "publication/create", method: RequestMethod.POST});
//         }
// }