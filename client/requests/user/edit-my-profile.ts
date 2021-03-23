import axios from "axios";
import config from "../../config";
import { INewsResponse } from "../../types/News";
import { IProfileEdit } from './../../types/Profile';

export const editMyProfile = async (token: string, profileData: IProfileEdit): Promise<INewsResponse> => {
    try {
        const request = `${config.serverURL}/user/edit`;
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

