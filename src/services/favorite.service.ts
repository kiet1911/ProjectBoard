import apiClient from "./apiClient";

export const favoriteService={
    Add: async(uri:string,frombody?:string)=>{
        try{
            const data = await apiClient.post(`${uri}`,frombody);
            return data.data;
        }
        catch(err){
            // console.log(err);
            throw err;
        }
    }
}