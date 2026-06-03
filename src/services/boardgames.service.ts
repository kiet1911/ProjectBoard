import apiClient from "./apiClient";

export const boardgamesService = {
    get : async (uri:string,databody?:object)=>{
        try{
            const data = await apiClient.get(`${uri}`,{ params : databody });
            return data.data;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    },
    queryFilter: async (uri:string, databody?:object)=>{
        try {
            const data = await apiClient.post(`${uri}`, { params : databody});
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}
