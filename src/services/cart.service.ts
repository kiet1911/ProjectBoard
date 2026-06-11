import apiClient from "./apiClient"
export const cartService = {
    Add: async (url:string, fromBody?:{publicId:string|null, boardgameId:string, isIncrease: boolean}) => {
        try {
            const res = await apiClient.post(`${url}`,fromBody);
            return res.data;
        } catch (error) {
            console.log(error);
            throw(error);
        }
    },
    GetByUserId: async (url:string, fromBody?:string)=>{
        try {
            const res = await apiClient.post(`${url}`,fromBody);
            return res.data;
        } catch (error) {
            console.log(error);
            throw(error);
        }
    },
    Remove: async (url:string, fromBody?:{publicId:string|null, boardgameId:string})=>{
        try {
            const res = await apiClient.delete(`${url}`,{params:fromBody})
            return res.data
        } catch (error) {
            throw(error);
        }
    }
}