import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateGroupDto } from "./dto/create-group.dto";
import { CreateUniversityFacultySpecialtyDto } from "./dto/create-university-faculty-specialty.dto";
import { User } from './../user/database/user.model';
import { Group } from "./database/group.model";
import { Faculty } from "./database/faculty.model";
import { University } from "./database/university.model";
import { Specialty } from "./database/specialty.model";
import { EditGroupDto } from "./dto/edit-group.dto";

@Injectable()
export class UniversityService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Group) private groupModel: typeof Group,
        @InjectModel(University) private universityModel: typeof University,
        @InjectModel(Faculty) private facultyModel: typeof Faculty,
        @InjectModel(Specialty) private specialtyModel: typeof Specialty,

    ) { }

    async getAll() {
        try {
            const universities = await this.universityModel.findAll();
            const faculties = await this.facultyModel.findAll();
            const specialties = await this.specialtyModel.findAll();
            const groups = await this.groupModel.findAll();
            return {universities, faculties, specialties, groups};
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async createGroup(dto: CreateGroupDto) {
        try {
            const group = await this.groupModel.create({ ...dto });
            return group;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getAllGroup(): Promise<Group[]> {
        try {
            const groups = await this.groupModel.findAll();
            return groups;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getOneGroup(id: number): Promise<Group> {
        try {
            const group = await this.groupModel.findByPk(id);
            return group;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async deleteGroup(id: number) {
        try {
            const group = await this.groupModel.findByPk(id);
            if (!group) {
                throw new InternalServerErrorException("группа не найдена");
            }
            return {
                message: `группа ${group.name} удалена`
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async editGroup(dto: EditGroupDto) {
        try {
            const group = await this.groupModel.findByPk(dto.id);
            if (dto.name) {
                group.name = dto.name;
            }
            if (dto.numberSemestersTraining) {
                group.numberSemestersTraining = dto.numberSemestersTraining;
            }
            if (dto.startDateTraining) {
                group.startDateTraining = dto.startDateTraining;
            }
            if (dto.universityName) {
                group.universityName = dto.universityName;
            }
            if (dto.facultyName) {
                group.facultyName = dto.facultyName;
            }
            if (dto.specialtyName) {
                group.specialtyName = dto.specialtyName;
            }
            await group.save();
            return group;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async joinGroup(userId: number, groupId: number): Promise<Group> {
        try {
            const group = await this.groupModel.findByPk(groupId);
            const user = await this.userModel.findByPk(userId);
            if (!user) {
                throw new InternalServerErrorException("пользователь не найден");
            }
            if (!group) {
                throw new InternalServerErrorException("группа не найдена");
            }
            user.groupId = group.id;
            await user.save();
            return group;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async addUsersInGroup(usersId: number[], groupId: number): Promise<User[]> {
        try {
            const group = await this.groupModel.findByPk(groupId);
            const arrUsers = [];
            await usersId.map(async (userId) => {
                const user = await this.userModel.findByPk(userId);
                user.groupId = group.id;
                user.save();
                arrUsers.push(user);
            });

            return arrUsers;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async getAllUniversityFacultySpecialty({ isUniversity = false, isFaculty = false, isSpecialty = false }) {
        try {
            let university: University[];
            let faculty: Faculty[];
            let specialty: Specialty[];

            if (isUniversity) {
                university = await this.universityModel.findAll();
            }

            if (isFaculty) {
                faculty = await this.facultyModel.findAll();
            }

            if (isSpecialty) {
                specialty = await this.specialtyModel.findAll();
            }

            return { university, faculty, specialty };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async createUniversityFacultySpecialty(type: string, name: string) {
        try {
            let university: University;
            let faculty: Faculty;
            let specialty: Specialty;

            switch (type) {
                case "university":
                    university = await this.universityModel.create({ name });
                    return university;

                case "faculty":
                    faculty = await this.facultyModel.create({ name });
                    return faculty;

                case "specialty":
                    specialty = await this.specialtyModel.create({ name });
                    return specialty;

                default:
                    throw new InternalServerErrorException("type или name не найдены");
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }

    async deleteUniversityFacultySpecialty(type: string, name: string) {
        try {
            let university: University;
            let faculty: Faculty;
            let specialty: Specialty;

            switch (type) {
                case "university":
                    university = await this.universityModel.findByPk(name);
                    university.destroy();
                    break;

                case "faculty":
                    faculty = await this.facultyModel.findByPk(name);
                    faculty.destroy();
                    break;

                case "specialty":
                    specialty = await this.specialtyModel.findByPk(name);
                    specialty.destroy();
                    break;

                default:
                    throw new InternalServerErrorException("type или name не найдены");
            }

            return {
                message: `${type} ${name} удалено`
            }

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("ошибка сервера");
        }
    }
}