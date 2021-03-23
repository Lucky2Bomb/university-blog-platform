import axios from "axios";
import config from "../../config";
import { IProfile } from "../../types/Profile";

const getMyProfile = async (token: string): Promise<IProfile> => {
    const response = await axios.post(`${config.serverURL}/user/my-profile`, { token });
    return response.data;
}

export default getMyProfile;