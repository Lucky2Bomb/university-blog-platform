import axios from "axios";
import config from "../../config";

const register = async (username: string, password: string, name: string, surname: string, patronymic: string): Promise<object> => {
    const response = await axios.post(`${config.serverURL}/user/create`, { username, password, name, surname, patronymic });
    return response.data;
}

export default register;