import axios from "axios";
import config from "../../config";
import { IProfile } from "../../types/Profile";

export const getListTeachers = async (): Promise<IProfile> => {
    try {
        const request = `${config.serverURL}/user/list-all-teachers`;
        const response = await axios.get(request);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

