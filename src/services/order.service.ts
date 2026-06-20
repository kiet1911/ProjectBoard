import axios from "axios";
import apiClient from "./apiClient"
import type { VnPayRecipientInfo } from "../types";

export const orderService = {
    SnapShotOrderItem : async(uri:string,fromBody?:any) => {
        try {
            const res = await apiClient.post(`${uri}`,fromBody)
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    GetVnpayUrl : async(uri:string,fromBody?:VnPayRecipientInfo)=>{
        try {
            const res = await apiClient.post(`${uri}`,fromBody);
            return res
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error.response?.data)
            }
            // console.log(error);
            throw error
        }
    }
}