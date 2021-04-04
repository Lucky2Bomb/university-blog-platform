import axios from "axios";
import config from "../../config";
import { IProfileWithTablesResponse } from "../../types/Profile";
import { IGuestReqestListResponse } from '../../types/Guest';
import { IReportResponse } from "../../types/Report";

export const getReports = async (token: string, count = 10, offset = 0, onlyNotChecked: boolean = false): Promise<IReportResponse> => {
    try {
        const request = `${config.serverURL}/publication/report/all?count=${count}&offset=${offset}&onlyNotChecked=${onlyNotChecked}`;
        const response = await axios.get(request, {headers: {
            "Authorization" : `Bearer ${token}`
        }});
        return response.data; 
    } catch (error) {
        console.log(error);
    }
}

