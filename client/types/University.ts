export interface IUniversityStore {
    groups: IGroup[];
    universities: IUniversity[];
    faculties: IFaculty[];
    specialties: ISpecialty[];

    setGroups(groups: IGroup[]): void;
    setUniversities(universities: IUniversity[]): void;
    setFaculties(faculties: IFaculty[]): void;
    setSpecialties(specialties: ISpecialty[]): void;
    
    selectedGroupId: number;
    selectedUniversityName: string;
    selectedFacultyName: string;
    selectedSpecialtyName: string;

    selectGroup(groupId: number): void;
    selectUniversity(universityName: string): void;
    selectFaculty(facultyName: string): void;
    selectSpecialty(specialtyName: string): void;
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