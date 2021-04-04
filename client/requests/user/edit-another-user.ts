import axios from "axios";
import config from "../../config";
import { INewsResponse } from "../../types/News";
import { IProfileEdit } from './../../types/Profile';

export const editAnotherUser = async (profileData: IProfileEdit, token: string) => {
    try {
        const request = `${config.serverURL}/user/edit-another-user`;
        const response = await axios.post(request, { ...profileData }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

