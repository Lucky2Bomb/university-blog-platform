import { Column, Model, Table, HasMany, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from 'src/models/user/database/user.model';
import { Bookmark } from './bookmark.model';
import { Publication } from './publication.model';

@Table
export class Comment extends Model {

    @Column({
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        allowNull: false,
        type: DataType.CHAR(100)
    })
    author: string;
    
    @Column({
        allowNull: false,
        type: DataType.CHAR(100)
    })
    authorPosition: string;

    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    text: string;
    
    @ForeignKey(() => Publication)
    @Column
    publicationId: number;

    @BelongsTo(() => Publication)
    publication: User; 

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User; 
}