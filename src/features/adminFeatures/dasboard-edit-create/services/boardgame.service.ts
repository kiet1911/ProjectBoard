import { AxiosError } from "axios"
import apiAdmin from "../../../../services/adminServices/apiAdmin";
import type { BoardGameDTO } from "../stores/serivcesType";

export const boardgames_service_dashboard = {
    GetBoardgamesWithId : async(x:string) => {
        try {
            const res = await apiAdmin.get("v1/BoardgamesDashboard/Boardgames",{params:{id:x}});
            return res;
        } catch (error) {
            if(error instanceof AxiosError){
                throw error;
            }
            throw error;
        }
    },
    UpdateStockBoardGame : async(data:{
        id: string,
        quantity: number,
        type: "increase" | "decrease"
    }) => {
        try {
            const res = await apiAdmin.post("v1/BoardgamesDashboard/BoardgamesUpdateStock", data);
            return res;
        } catch (error) {
            if(error instanceof AxiosError){
                throw error;
            }
            throw error;
        }
    },
    UpdateBoardGame: async(data:BoardGameDTO)=>{
        try {
            const res = await apiAdmin.post("v1/BoardgamesDashboard/BoardgamesUpdate", data);
            return res;
        } catch (error) {
            if(error instanceof AxiosError){
                throw error;
            }
            throw error;
        }
    },
    CreateBoardGame: async(data:BoardGameDTO)=>{
        try {
            const res = await apiAdmin.post("v1/BoardgamesDashboard/BoardgamesCreate", data);
            return res;
        } catch (error) {
            if(error instanceof AxiosError){
                throw error;
            }
            throw error;
        }
    },
}
