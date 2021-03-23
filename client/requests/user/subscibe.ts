import axios from "axios";
import config from "../../config";

export const checkSubscribe = async (idAnotherUser: number, token: string) => {
    try {
        const request = `${config.serverURL}/user/check-subscribe`;
        const response = await axios.post(request, { idAnotherUser, token });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCountSubscribers = async (userId: number) => {
    try {
        const request = `${config.serverURL}/user/subscribe/${userId}`;
        const response = await axios.get(request);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const subscribe = async (idAnotherUser: number, token: string) => {
    try {
        const request = `${config.serverURL}/user/subscribe`;
        const body = {idAnotherUser, token};
        const response = await axios.post(request, body);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const unsubscribe = async (idAnotherUser: number, token: string) => {
    try {
        const request = `${config.serverURL}/user/unsubscribe`;
        const body = {idAnotherUser, token};
        const response = await axios.post(request, body);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}