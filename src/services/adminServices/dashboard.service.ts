import { AxiosError } from "axios"
import apiAdmin from "./apiAdmin";

export const dashboardService = {
    Customers: async()=>{
        try {
            const res = await apiAdmin.get("v1/User/Customer");
            return res.data;
        } catch (error) {
            if(error instanceof AxiosError){
                console.log(error);
                throw error;
            }
            throw error;
        }
    }
}