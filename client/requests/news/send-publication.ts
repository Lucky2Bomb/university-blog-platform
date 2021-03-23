import axios from "axios";
import config from "../../config";

export const sendPublication = async (formData: FormData, token: string) => {
    try {
        const request = `${config.serverURL}/publication/create`;
        const response = await axios.post(request, formData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

