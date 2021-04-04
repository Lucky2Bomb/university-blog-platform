import axios from "axios";
import config from "../../config";
import { IUserRole } from "../../types/Role";
import { RoleList } from "../../other/role-list";

export const verifyUsers = async (token: string, usersId: number[]) => {
    try {
        const request = `${config.serverURL}/user/role-to-users`;
        const response = await axios.post(request, { usersId, roleName: RoleList.VERIFIED }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

