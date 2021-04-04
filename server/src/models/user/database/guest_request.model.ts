import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class GuestRequest extends Model {

    @Column({
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @Column
    full_name: string;

    @Column
    email: string;

    @Column({
        type: DataType.TINYINT,
        allowNull: false,
        defaultValue: false
    })
    checked: boolean;

    @ForeignKey(() => User)
    @Column({
        allowNull: true
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}