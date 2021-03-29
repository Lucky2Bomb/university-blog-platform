export interface IUniversityStore {
    groups: IGroup[];
    universities: IUniversity[];
    faculties: IFaculty[];
    specialties: ISpecialty[];

    setGroups(groups: IGroup[]): void;
    setUniversities(universities: IUniversity[]): void;
    setFaculties(faculties: IFaculty[]): void;
    setSpecialties(specialties: ISpecialty[]): void;
    
    selectedGroup: IGroup;
    selectedUniversity: IUniversity;
    selectedFaculty: IFaculty;
    selectedSpecialty: ISpecialty;

    selectGroup(group: IGroup): void;
    selectUniversity(university: IUniversity): void;
    selectFaculty(faculty: IFaculty): void;
    selectSpecialty(specialty: ISpecialty): void;
}

export interface IGroup {
    id: number;
    name: string;
    startDateTraining: string;
    numberSemestersTraining: number;
    universityName: string;
    facultyName: string;
    specialtyName: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUniversity {
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IFaculty {
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface ISpecialty {
    name: string;
    createdAt: string;
    updatedAt: string;
}