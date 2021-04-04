import axios from "axios";
import config from "../../config";
import { IGroup } from "../../types/University";

export const createGroup = async (
    name: string,
    startDateTraining: string,
    numberSemestersTraining: number,
    universityName: string,
    facultyName: string,
    specialtyName: string,
    token: string): Promise<IGroup> => {
    try {
        const request = `${config.serverURL}/university/group/create`;
        const response = await axios.post(request, {
            name, startDateTraining, numberSemestersTraining,
            universityName, facultyName, specialtyName
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

