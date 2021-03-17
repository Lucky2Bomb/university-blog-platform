import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Position extends Model {

    @Column({
        unique: true,
        primaryKey: true,
    })
    name: string;

    @HasMany(() => User)
    users: User[]
}