import axios from "axios";
import config from "../../config";

export const checkRelevanceOfToken = async (token: string): Promise<boolean> => {
    try {
        const response = await axios.get(
            `${config.serverURL}/test/auth`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        return true;
    } catch (error) {
        return false;
    }
}

