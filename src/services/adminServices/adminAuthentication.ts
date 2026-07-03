import { AxiosError } from "axios"
import apiAdmin from "./apiAdmin";


export const AdminAuthenticationService = {
    Login: async(data:{Email:string,Password:string})=>{
        try {
            const res = apiAdmin.post("/Authentication/LoginWithAdmin",data)
            return (await res).data;
        } catch (error) {
            if(error instanceof AxiosError){
                console.log(error.response?.data);
            }
            throw error;
        }
    }
}