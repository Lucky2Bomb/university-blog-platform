import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Publication } from "./database/publication.model";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import * as jsonwebtoken from "jsonwebtoken";
import config from "config";
import { IDecodedTokenStructure } from './../user/interface/IDecodedTokenStructure';
import { FileService, SectionType, FileType } from './../file/file.service';
import { User } from "../user/database/user.model";
import { Op } from "sequelize";
import { EditPublicationDto } from "./dto/edit-publication.dto";


@Injectable()
export class PublicationService {
    constructor(
        @InjectModel(Publication) private publicationModel: typeof Publication,
        @InjectModel(User) private userModel: typeof User,
        private fileService: FileService
    ) { }

    async getOne(id: number): Promise<Publication> {
        try {
            return await this.publicationModel.findOne({ where: { id } });
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getAll(count: number = 10, offset: number = 0, usersId: string, publicationsId: string) {
        try {
            let where = {};

            let usersIdArray;

            if (usersId) {
                usersIdArray = JSON.parse(usersId);
                if (usersIdArray.length > 0) {
                    where["userId"] = {
                        [Op.or]: usersIdArray
                    };
                }
            }

            let publicationsIdArray;
            if(publicationsId)
            {
                publicationsIdArray = JSON.parse(publicationsId);
                if (publicationsIdArray.length > 0) {
                    where["id"] = {
                        [Op.or]: publicationsIdArray
                    };
                }
            }


            const publications = await this.publicationModel.findAndCountAll({
                limit: Number(count <= config.pagination_settings.max_count ? count : config.pagination_settings.max_count),
                offset: Number(offset),
                order: [['createdAt', 'DESC']],
                where
            });
            return {
                publications: publications.rows,
                allCount: publications.count,
                currentCount: Number(count),
                offset: Number(offset)
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async create(dto: CreatePublicationDto, token: string, picture = [], file = []) {
        try {
            if (!token) {
                throw new BadRequestException("не авторизован");
            }
            const decodedTokenData: IDecodedTokenStructure = jsonwebtoken.verify(token, config.secret_key);
            let picturePath;
            let filePath;

            if (picture.length > 0) {
                if (picture[0].size > config.file_settings.publication.max_picture_size) {
                    throw new BadRequestException("слишком большой размер картинки");
                }
                picturePath = this.fileService.createFile(decodedTokenData.userId, SectionType.PUBLICATION, FileType.IMAGE, picture[0]);
            } else {
                picturePath = "";
            }

            if (file.length > 0) {
                if (file[0].size > config.file_settings.publication.max_file_size) {
                    throw new BadRequestException("слишком большой размер картинки");
                }
                filePath = this.fileService.createFile(decodedTokenData.userId, SectionType.PUBLICATION, FileType.FILE, file[0]);
            } else {
                filePath = "";
            }
            const user = await this.userModel.findOne({ where: { id: decodedTokenData.userId } });
            const publication = await this.publicationModel.create({
                userId: Number(decodedTokenData.userId),
                header: dto.header,
                text: dto.text,
                author: `${user.patronymic ? user.patronymic + " " : ""}${user.name} ${user.surname}`,
                pictureUrl: picturePath,
                fileUrl: filePath
            });

            return publication;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async editPublication(dto: EditPublicationDto, token: string, picture = [], file = [], accessToAnotherUser = false) {
        const publication = await this.publicationModel.findByPk(dto.id);
        if (!publication) {
            throw new BadRequestException("пост не найден");
        }
        try {
            if (!token) {
                throw new BadRequestException("не авторизован");
            }
            const decodedTokenData: IDecodedTokenStructure = jsonwebtoken.verify(token, config.secret_key);
            if (publication.userId !== decodedTokenData.userId && !accessToAnotherUser) {
                throw new BadRequestException();
            }
            let picturePath;
            let filePath;

            if (picture.length > 0) {
                if (picture[0].size > config.file_settings.publication.max_picture_size) {
                    throw new BadRequestException("слишком большой размер картинки");
                }
                picturePath = this.fileService.createFile(decodedTokenData.userId, SectionType.PUBLICATION, FileType.IMAGE, picture[0]);
            } else {
                picturePath = "";
            }

            if (file.length > 0) {
                if (file[0].size > config.file_settings.publication.max_file_size) {
                    throw new BadRequestException("слишком большой размер картинки");
                }
                filePath = this.fileService.createFile(decodedTokenData.userId, SectionType.PUBLICATION, FileType.FILE, file[0]);
            } else {
                filePath = "";
            }
            const user = await this.userModel.findOne({ where: { id: decodedTokenData.userId } });

            if (publication.fileUrl) {
                await this.fileService.removeFile(publication.fileUrl);
            }

            if (publication.pictureUrl) {
                await this.fileService.removeFile(publication.pictureUrl);
            }

            publication.header = dto.header;
            publication.text = dto.text;
            publication.fileUrl = filePath;
            publication.pictureUrl = picturePath;
            publication.author = `${user.patronymic ? user.patronymic + " " : ""}${user.name} ${user.surname}`;
            return await publication.save();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async editUserPublication(dto: EditPublicationDto, token: string, picture = [], file = []) {
        return await this.editPublication(dto, token, picture, file, true);
    }

    async deletePublication(id: number, token, accessToAnotherUser = false) {
        const publication = await this.publicationModel.findByPk(id);
        if (!publication) {
            throw new BadRequestException("пост не найден");
        }

        try {
            if (!token) {
                throw new BadRequestException("не авторизован");
            }
            const decodedTokenData: IDecodedTokenStructure = jsonwebtoken.verify(token, config.secret_key);
            if (publication.userId !== decodedTokenData.userId && !accessToAnotherUser) {
                throw new BadRequestException();
            }

            if (publication.fileUrl) {
                await this.fileService.removeFile(publication.fileUrl);
            }

            if (publication.pictureUrl) {
                await this.fileService.removeFile(publication.pictureUrl);
            }

            await publication.destroy();

            return { message: `Пост ${publication.id} удалён` };

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async deleteUserPublication(id: number, token) {
        return this.deletePublication(id, token, true);
    }
}