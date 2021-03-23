import { Column, Model, Table, HasMany, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from 'src/models/user/database/user.model';
import { Publication } from './publication.model';

@Table
export class PublicationComplaint extends Model {

    @Column({
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id: number;
    
    @Column({
        type: DataType.TINYINT,
        defaultValue: false
    })
    checked: boolean;


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