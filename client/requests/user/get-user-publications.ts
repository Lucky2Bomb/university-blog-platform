import axios from "axios";
import config from "../../config";
import { INewsResponse } from "../../types/News";

export const getUserPublications = async (count = 10, offset = 0, usersId: number[]): Promise<INewsResponse> => {
    try {
        const request = `${config.serverURL}/publication/?count=${count}&offset=${offset}&usersId=[${usersId}]`;
        const response = await axios.get(request);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

