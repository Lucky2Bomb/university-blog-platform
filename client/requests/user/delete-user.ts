import axios from "axios";
import config from "../../config";
import { INewsResponse } from "../../types/News";

export const deleteUser = async (userId: number, token: string) => {
    try {
        const request = `${config.serverURL}/user`;
        const response = await axios.delete(request, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: { //body
                id: userId
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteUsers = async (usersId: number[], token: string) => {
    try {
        const request = `${config.serverURL}/user`;
        const response = await axios.delete(request, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: { //body
                usersId
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

