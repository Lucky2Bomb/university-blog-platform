import axios from "axios";
import config from "../../config";
import { IProfileWithTablesResponse } from "../../types/Profile";
import { IGuestReqestListResponse } from '../../types/Guest';

export const getGuests = async (token: string, count = 10, offset = 0): Promise<IGuestReqestListResponse> => {
    try {
        const request = `${config.serverURL}/guest/get-applications?count=${count}&offset=${offset}`;
        const response = await axios.get(request, {headers: {
            "Authorization" : `Bearer ${token}`
        }});
        return response.data; 
    } catch (error) {
        console.log(error);
    }
}

