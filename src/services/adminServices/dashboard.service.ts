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
    Revenue: async (x?: string) => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/Revenue", { params: { filter: x } });
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    MostSell: async () => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/TopMostSell");
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    LowStock: async () => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/LowStock");
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    TopCurrentOrder: async () => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/TopCurrentOrder");
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