import { Column, Model, Table, ForeignKey, BelongsTo, DataType, HasMany } from 'sequelize-typescript';
import { Faculty } from './faculty.model';
import { University } from './university.model';
import { Specialty } from './specialty.model';
import { User } from './../../user/database/user.model';

@Table
export class Group extends Model {
    @Column({
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @Column
    name: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    startDateTraining: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 8
    })
    numberSemestersTraining: number;

    @HasMany(() => User)
    users: User[]

    @ForeignKey(() => University)
    @Column({
        defaultValue: "-"
    })
    universityName: string;

    @BelongsTo(() => University)
    university: University;

    @ForeignKey(() => Faculty)
    @Column({
        defaultValue: "-"
    })
    facultyName: string;

    @BelongsTo(() => Faculty)
    faculty: Faculty;

    @ForeignKey(() => Specialty)
    @Column({
        defaultValue: "-"
    })
    specialtyName: string;

    @BelongsTo(() => Specialty)
    specialty: Specialty;

}