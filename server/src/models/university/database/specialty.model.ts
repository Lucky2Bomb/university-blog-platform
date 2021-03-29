import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Group } from './group.model';

@Table
export class Specialty extends Model {
    @Column({
        unique: true,
        primaryKey: true,
    })
    name: string;


    @HasMany(() => Group)
    groups: Group[]
}