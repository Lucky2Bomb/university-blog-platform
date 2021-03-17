import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Publication } from "./database/publication.model";
import { FileService, SectionType, FileType } from './../file/file.service';
import { User } from "../user/database/user.model";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";
import { Bookmark } from "./database/bookmark.model";
import config from "config";


@Injectable()
export class BookmarkService {
    constructor(
        @InjectModel(Publication) private publicationModel: typeof Publication,
        @InjectModel(Bookmark) private bookmarkModel: typeof Bookmark,
        @InjectModel(User) private userModel: typeof User,
        private fileService: FileService
    ) { }

    async get(count: number = 10, offset: number = 0, userId: number) {
        try {
            const bookmarks = await this.bookmarkModel.findAndCountAll({
                limit: Number(count <= config.pagination_settings.max_count ? count : config.pagination_settings.max_count),
                offset: Number(offset),
                order: [['createdAt', 'DESC']]
            });
            return {
                bookmarks: bookmarks.rows,
                allCount: bookmarks.count,
                currentCount: Number(count),
                offset: Number(offset)
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async create(dto: CreateBookmarkDto) {
        try {
            return await this.bookmarkModel.create({ ...dto });
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async delete(id: number, userId: number) {
        try {
            const bookmark = await this.bookmarkModel.findByPk(id);
            if(Number(userId) != Number(bookmark.userId)) {
                throw new InternalServerErrorException(`userId ${userId} токена не равен закладке userId ${bookmark.userId}`);
            }
            await bookmark.destroy();
            return { message: `закладка удалена` };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }
}