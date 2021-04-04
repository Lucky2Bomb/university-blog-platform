import axios from "axios";
import config from "../../config";
import { IUserRole } from "../../types/Role";
import { RoleList } from "../../other/role-list";

export const addPositionToUser = async (userId: number, namePosition: string, token: string) => {
    try {
        const request = `${config.serverURL}/position/add-position-to-user`;
        const response = await axios.post(request, { userId, namePosition }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

