import axios from "axios";
import config from "../../config";
import { INewsResponse } from "../../types/News";
import { IUniversity, IFaculty, ISpecialty, IGroup } from "../../types/University";

interface getAllUniversityFacultySpecialtyGroupsResponse {
    universities: IUniversity[],
    faculties: IFaculty[],
    specialties: ISpecialty[],
    groups: IGroup[]
}

export const getAllUniversityFacultySpecialtyGroups = async (): Promise<getAllUniversityFacultySpecialtyGroupsResponse> => {
    try {
        const request = `${config.serverURL}/university/all`;
        const response = await axios.get(request);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

