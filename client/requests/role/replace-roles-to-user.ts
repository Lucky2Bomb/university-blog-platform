import axios from "axios";
import config from "../../config";
import { IUserRole } from "../../types/Role";
import { RoleList } from "../../other/role-list";

export const replaceRolesToUser = async (userId: number, roleNames: string[], token: string) => {
    try {
        const request = `${config.serverURL}/user/replace-roles-to-user`;
        const response = await axios.post(request, { userId, roleNames }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

