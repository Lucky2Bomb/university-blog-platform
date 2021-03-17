import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { UserRole } from './user-role.model';

@Table
export class Role extends Model {

    @Column({
        unique: true,
        primaryKey: true,
    })
    name: string;

    @Column({
        allowNull: false
    })
    description: string;

    @HasMany(() => UserRole)
    userRoleLists: UserRole[]
}