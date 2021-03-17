import { Column, Model, Table, HasMany, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from 'src/models/user/database/user.model';
import { Publication } from './publication.model';

@Table
export class Bookmark extends Model {

    @Column({
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Publication)
    @Column
    publicationId: number;

    @BelongsTo(() => Publication)
    publication: Publication; 

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User; 
}