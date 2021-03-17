import axios from "axios";
import config from "../../config";
import { INewsResponse } from "../../types/News";

export const getNews = async (count, offset): Promise<INewsResponse> => {
    try {
        const response = await axios.get(`${config.serverURL}/publication/?count=${count}&offset=${offset}&usersId=[2]`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

