import { Column, Model, Table, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserRole } from '../../role/database/user-role.model';
import { Position } from './position.model';
import { Publication } from 'src/models/publication/database/publication.model';
import { Bookmark } from 'src/models/publication/database/bookmark.model';

@Table
export class User extends Model {

    @Column({
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        allowNull: false
    })
    password: string;

    @HasMany(() => Publication)
    publications: Publication[]
    
    @HasMany(() => Bookmark)
    bookmarks: Bookmark[]

    @HasMany(() => UserRole)
    userRoleLists: UserRole[]

    @ForeignKey(() => Position)
    @Column
    positionName: string;

    @BelongsTo(() => Position)
    position: Position;

    @Column
    name: string;

    @Column
    surname: string;

    @Column
    patronymic: string;

    @Column
    email: string;

    @Column
    avatarUrl: string;

    @Column
    backgroundUrl: string;

    @Column
    vk: string;

    @Column
    facebook: string;

    @Column
    telegram: string;

    @Column
    whatsapp: string;

    @Column
    phone_number: string;
}