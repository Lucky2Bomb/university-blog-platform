import axios from "axios";
import config from "../../config";
import { IReport } from "../../types/Report";

export const reportPublication = async (userId: number, publicationId: number, token: string): Promise<IReport> => {
    try {
        const request = `${config.serverURL}/publication/report`;
        const response = await axios.post(request, { publicationId, userId }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllReports = async (count: number = 10, offset: number = 0, onlyNotChecked = false, token: string): Promise<IReport[]> => {
    try {
        const request = `${config.serverURL}/publication/report/all?count=${count}&offset=${offset}&onlyNotChecked=${onlyNotChecked}`;
        const response = await axios.get(request, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const checkReports = async (reportsId: number[], token: string): Promise<IReport> => {
    try {
        const request = `${config.serverURL}/publication/report`;
        const response = await axios.post(request, { reportsId }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}