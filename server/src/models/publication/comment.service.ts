import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Publication } from "./database/publication.model";
import { FileService, SectionType, FileType } from './../file/file.service';
import { User } from "../user/database/user.model";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";
import { Bookmark } from "./database/bookmark.model";
import config from "config";
import { Comment } from "./database/comment.model";
import { CreateCommentDto } from "./dto/create-comment.dto";


@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Publication) private publicationModel: typeof Publication,
        @InjectModel(Comment) private commentModel: typeof Comment,
        @InjectModel(User) private userModel: typeof User,
    ) { }

    async get(count: number = 10, offset: number = 0, publicationId: number) {
        try {
            const commentModel = await this.commentModel.findAndCountAll({
                where: {
                    publicationId
                },
                limit: Number(count <= config.pagination_settings.max_count ? count : config.pagination_settings.max_count),
                offset: Number(offset),
                order: [['createdAt', 'DESC']]
            });
            return {
                comments: commentModel.rows,
                allCount: Number(commentModel.count),
                currentCount: Number(count),
                offset: Number(offset)
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async create(dto: CreateCommentDto) {
        try {
            const publication = await this.publicationModel.findByPk(dto.publicationId);
            if (!publication) {
                throw new InternalServerErrorException("публикация не найдена");
            }

            const user = await this.userModel.findByPk(dto.userId);
            if(!user) {
                throw new InternalServerErrorException("пользователь не найден");
            }

            const comment = await this.commentModel.create({
                author: `${user.surname} ${user.name}`,
                text: dto.text,
                authorPosition: user.positionName,
                publicationId: dto.publicationId,
                userId: dto.userId
            });

            return comment;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async delete(id: number) {
        try {
            const comment = await this.commentModel.findByPk(id);
            await comment.destroy();
            return { message: `комментарий удалён` };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }
}