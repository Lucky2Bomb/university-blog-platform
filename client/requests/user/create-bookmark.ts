import axios from "axios";
import config from "../../config";
import { profileImageType } from "../../types/Profile";

export const createBookmark = async (publicationId: number, token: string) => {
    try {
        const request = `${config.serverURL}/bookmark/create`;
        const response = await axios.post(request, {publicationId}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}