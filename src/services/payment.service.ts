import apiClient from "./apiClient";

export const paymentService = {
    checkTransaction : async(uri:string, fromBody:any)=>{
         try {
            const res = await apiClient.put(`${uri}`,fromBody)
            return res.data;
        } catch (error) {
            // console.log(error);
            throw error;
        }
    },
    confirmPayment : async(uri:string, fromBody:any)=>{
         try {
            const res = await apiClient.put(`${uri}`,fromBody)
            return res.data;
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
}