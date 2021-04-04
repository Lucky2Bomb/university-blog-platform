import axios from "axios";
import config from "../../config";
import { IRole } from "../../types/Role";

export const getAllRoles = async (): Promise<IRole[]> => {
    try {
        const request = `${config.serverURL}/roles`;
        const response = await axios.get(request);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

