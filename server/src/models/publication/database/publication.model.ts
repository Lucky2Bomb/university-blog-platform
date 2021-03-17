import { Column, Model, Table, HasMany, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from 'src/models/user/database/user.model';
import { Bookmark } from './bookmark.model';

@Table
export class Publication extends Model {

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
    header: string; 

    @Column({
        allowNull: false,
        type: DataType.CHAR(100)
    })
    author: string;

    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    text: string;

    @Column
    pictureUrl: string;
    
    @Column
    fileUrl: string;

    @HasMany(() => Bookmark)
    bookmarks: Bookmark[]

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User; 
}