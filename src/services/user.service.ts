import { AxiosError } from "axios";
import apiClient from "./apiClient"

export const UserService = {
    GetUserInfo: async (uri: string, data: string) => {
        try {
            const res = await apiClient.get(`${uri}/${data}`);
            return res.data
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            }
            throw error;
        }
    },
    UpdateUserInfo: async (uri: string, data: any) => {
        try {
            const res = await apiClient.put(`${uri}`, data)
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            }
            throw error;
        }
    },
    UpdatePassword: async (uri: string, data: any) => {
        try {
            const res = await apiClient.put(`${uri}`, data)
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
            }
            throw error;
        }
    }
}