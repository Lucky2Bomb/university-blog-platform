import axios from "axios";
import config from "../../config";
import { INewsResponse } from "../../types/News";

export const getNews = async (count = 16, offset = 0): Promise<INewsResponse> => {
    try {
        const request = `${config.serverURL}/publication/?count=${count}&offset=${offset}&usersId=[2]`;
        const response = await axios.get(request);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

