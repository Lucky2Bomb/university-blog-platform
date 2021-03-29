import { makeAutoObservable } from "mobx";
import { INewsStore } from "../types/News";
import { IPublication } from "../types/Publication";
import { getNews } from "../requests/news/get-news";
import { IUniversityStore, IGroup, ISpecialty, IFaculty, IUniversity } from "../types/University";

export default class UniversityStore implements IUniversityStore {
    constructor() {
        makeAutoObservable(this);
    }
    selectedGroup: IGroup = null;
    selectedUniversity: IUniversity = null;
    selectedFaculty: IFaculty = null;
    selectedSpecialty: ISpecialty = null;

    selectGroup = (group: IGroup): void => {
        this.selectedGroup = group;
    }
    selectUniversity = (univeristy: IUniversity): void => {
        this.selectedUniversity = univeristy;
    }
    selectFaculty = (faculty: IFaculty): void => {
        this.selectedFaculty = faculty;
    }
    selectSpecialty = (specialty: ISpecialty): void => {
        this.selectedSpecialty = specialty;
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