import axios from "axios";
import config from "../../config";

export const sendComment = async (text: string, publicationId: number, token: string) => {
    try {
        const request = `${config.serverURL}/comment/create`;
        const response = await axios.post(request, {
            text, publicationId
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

