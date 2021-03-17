import { Column, Model, Table, HasMany, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { User } from 'src/models/user/database/user.model';
import { Role } from './role.model';

@Table
export class UserRole extends Model {

    @Column({
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Role)
    @Column
    roleName: string

    @BelongsTo(() => Role)
    role: Role

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User
}