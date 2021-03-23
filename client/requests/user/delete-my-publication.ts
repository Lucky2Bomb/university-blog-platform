import axios from "axios";
import config from "../../config";
import { INewsResponse } from "../../types/News";

export const deleteMyPublication = async (publicationId: number, token: string): Promise<INewsResponse> => {
    try {
        const request = `${config.serverURL}/publication/delete-publication/${publicationId}`;
        const response = await axios.delete(request, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

