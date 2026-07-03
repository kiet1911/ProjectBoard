import { AxiosError } from "axios"
import apiAdmin from "./apiAdmin";

export const dashboardService = {
    Customers: async () => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/Customer");
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    Orders: async () => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/Order");
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    Cancelled: async () => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/Cancelled");
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
}