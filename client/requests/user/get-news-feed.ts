import axios from "axios";
import config from "../../config";
import { INewsResponse } from "../../types/News";

export const getNewsFeed = async (userId: number, count: number = 10, offset: number = 0): Promise<INewsResponse> => {
    try {
        const request = `${config.serverURL}/user/subscriptions/publications?count=${count}&offset=${offset}&userId=${userId}`;
        const response = await axios.get(request);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

