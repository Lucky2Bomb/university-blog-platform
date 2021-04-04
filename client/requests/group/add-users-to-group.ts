import axios from "axios";
import config from "../../config";

export const addUsersToGroup = async (usersId: number[], groupId: number, token: string) => {
    try {
        const request = `${config.serverURL}/university/group/add-users`;
        const response = await axios.post(request, {
            usersId, groupId
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

