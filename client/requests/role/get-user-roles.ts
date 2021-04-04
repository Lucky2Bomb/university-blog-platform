import axios from "axios";
import config from "../../config";
import { IUserRole } from "../../types/Role";

export const getUserRoles = async (token: string): Promise<IUserRole[]> => {
    try {
        const request = `${config.serverURL}/user/user-roles`;
        const response = await axios.post(request, { token });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

