import { Column, Model, Table, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserRole } from '../../role/database/user-role.model';
import { Position } from './position.model';
import { Publication } from 'src/models/publication/database/publication.model';
import { Bookmark } from 'src/models/publication/database/bookmark.model';
import { Subscriber } from './subscriber.model';
import { Comment } from 'src/models/publication/database/comment.model';
import { PublicationComplaint } from './../../publication/database/publication-complaint.model';
import { Group } from './../../university/database/group.model';
import { GuestRequest } from './guest_request.model';

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

    @HasMany(() => GuestRequest)
    guestRequests: GuestRequest[]


    @ForeignKey(() => Position)
    @Column
    positionName: string;

    @BelongsTo(() => Position)
    position: Position;

    @HasMany(() => Subscriber)
    subscribers: Subscriber[]

    @HasMany(() => Comment)
    comments: Comment[]

    @HasMany(() => PublicationComplaint)
    publicationComplaints: PublicationComplaint[]

    @ForeignKey(() => Group)
    @Column
    groupId: number;

    @BelongsTo(() => Group)
    group: Group;

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