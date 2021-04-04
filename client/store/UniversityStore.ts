import { makeAutoObservable } from "mobx";
import { INewsStore } from "../types/News";
import { IPublication } from "../types/Publication";
import { getNews } from "../requests/news/get-news";
import { IUniversityStore, IGroup, ISpecialty, IFaculty, IUniversity } from "../types/University";

export default class UniversityStore implements IUniversityStore {
    constructor() {
        makeAutoObservable(this);
    }
    selectedGroupId: number = 1;
    selectedUniversityName: string = "";
    selectedFacultyName: string = "";
    selectedSpecialtyName: string = "";

    selectGroup = (groupId: number): void => {
        this.selectedGroupId = groupId;
    }
    selectUniversity = (univeristyName: string): void => {
        this.selectedUniversityName = univeristyName;
    }
    selectFaculty = (facultyName: string): void => {
        this.selectedFacultyName = facultyName;
    }
    selectSpecialty = (specialtyName: string): void => {
        this.selectedSpecialtyName = specialtyName;
    }

    groups: IGroup[] = [];
    universities: IUniversity[] = [];
    faculties: IFaculty[] = [];
    specialties: ISpecialty[] = [];

    setGroups = (groups: IGroup[]): void => {
        this.groups = groups;
    }
    setUniversities = (universities: IUniversity[]): void => {
        this.universities = universities;
    }
    setFaculties = (faculties: IFaculty[]): void => {
        this.faculties = faculties;
    }
    setSpecialties = (specialties: ISpecialty[]): void => {
        this.specialties = specialties;
    }
}