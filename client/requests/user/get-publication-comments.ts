import axios from "axios";
import config from "../../config";
import { IProfileList } from "../../types/Profile";
import { ICommentsResponse } from './../../types/Comment';

export const getPublicationComments = async (publicationId: number, count: number = 10, offset: number = 0): Promise<ICommentsResponse> => {
    try {
        const request = `${config.serverURL}/comment?count=${count}&offset=${offset}&publicationId=${publicationId}`;
        const response = await axios.get(request);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

