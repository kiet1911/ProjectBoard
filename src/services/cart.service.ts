import apiClient from "./apiClient"
export const cartService = {
    Add: async (url:string, fromBody?:{publicId:string|null, boardgameId:string, isIncrease: boolean}) => {
        try {
            const data = await apiClient.post(`${url}`,fromBody);
            return data.data;
        } catch (error) {
            console.log(error);
        }
    },
    GetByUserId: async (url:string, fromBody?:string)=>{
        try {
            const data = await apiClient.post(`${url}`,fromBody);
            return data.data;
        } catch (error) {
            console.log(error);
        }
    }
}