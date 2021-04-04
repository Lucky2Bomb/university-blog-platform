import axios from "axios";
import config from "../../config";
import { IGuestRequest } from '../../types/Guest';

export const checkGuestApplication = async (token: string, applicationId: number): Promise<IGuestRequest> => {
    try {
        const request = `${config.serverURL}/guest/checked`;
        const response = await axios.post(request, { applicationId }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

