import axios from "axios";
import config from "../../config";
import { IPosition } from "../../types/IPosition";

export const getPositions = async (): Promise<IPosition[]> => {
    try {
        const request = `${config.serverURL}/position/list`;
        const response = await axios.get(request);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

