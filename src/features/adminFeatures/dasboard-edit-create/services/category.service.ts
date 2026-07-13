import { AxiosError } from "axios"

export const category_service_dashboard = {
    updateStatus : async({id}:{id:string})=>{
        try {
            const res = null;
            return res;
        } catch (error) {
            if(error instanceof AxiosError){
                throw error;
            }
            throw error;
        }
    }
}