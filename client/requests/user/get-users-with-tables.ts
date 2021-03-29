import axios from "axios";
import config from "../../config";
import { IProfileWithTablesResponse } from "../../types/Profile";

export const getUsersWithTables = async (count = 10, offset = 0, tables: string[] = ["ROLE", "GROUP"]): Promise<IProfileWithTablesResponse> => {
    try {
        const request = `${config.serverURL}/user/list-with-include?count=${count}&offset=${offset}&tables=${JSON.stringify(tables)}`;
        const response = await axios.get(request);
        return response.data; 
    } catch (error) {
        console.log(error);
    }
}

