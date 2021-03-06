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
import { Comment } from "./database/comment.model";
import { AuthMiddleware } from "../../middleware/auth.middleware";
import { AddUserIdInBodyMiddleware,  } from "../../middleware/user.middleware";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { PublicationComplaint } from './database/publication-complaint.model';

@Module({
    imports: [SequelizeModule.forFeature([Publication, User, Bookmark, Comment, PublicationComplaint])],
controllers: [PublicationController, BookmarkController, CommentController],
    providers: [PublicationService, FileService, BookmarkService, CommentService]
})

export class PublicationModule
    implements NestModule {
        configure(consumer: MiddlewareConsumer) {
            consumer
            .apply(AuthMiddleware, AddUserIdInBodyMiddleware)
            .forRoutes({path: "comment/create", method: RequestMethod.POST});
            
            consumer
            .apply(AuthMiddleware)
            .forRoutes({path: "comment/delete/*", method: RequestMethod.DELETE});
            
            consumer
            .apply(AuthMiddleware, AddUserIdInBodyMiddleware)
            .forRoutes({path: "publication/report", method: RequestMethod.POST});

            consumer
            .apply(AuthMiddleware)
            .forRoutes({path: "publication/report/checked", method: RequestMethod.POST});
            
            consumer
            .apply(AuthMiddleware)
            .forRoutes({path: "publication/create", method: RequestMethod.POST});

            consumer
            .apply(AuthMiddleware)
            .forRoutes({path: "publication/report/all", method: RequestMethod.GET});
        }
}