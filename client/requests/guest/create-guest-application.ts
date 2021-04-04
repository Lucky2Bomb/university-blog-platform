import axios from "axios";
import config from "../../config";
import { IGroup } from "../../types/University";

export const createGuestApplication = async (fullName: string, contacts: string) => {
    try {
        const request = `${config.serverURL}/university/group/create`;
        const response = await axios.post(request, {
            full_name: fullName,
            email: contacts
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

