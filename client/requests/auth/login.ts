import axios from "axios";
import config from "../../config";
import { IToken } from "../../types/Auth";

const login = async (username: string, password: string): Promise<IToken> => {
    const response = await axios.post(`${config.serverURL}/user/login`, { username, password });
    return response.data;
}

export default login;