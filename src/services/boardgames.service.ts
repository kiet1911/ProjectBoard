import apiClient from "./apiClient";

export const boardgamesService = {
    get : async (uri:string)=>{
        try{
            const data = await apiClient.get(`${uri}`,{});
            return data.data;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

}
