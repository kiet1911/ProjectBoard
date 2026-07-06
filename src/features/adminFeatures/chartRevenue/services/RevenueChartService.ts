import { dashboardService } from "../../../../services/adminServices/dashboard.service";

export const FetchRevenue = async(filter:string)=>{
     try {
            const res = await dashboardService.Revenue(filter);
            // useToastNotification.getState().add({text:res.message,type:"success"});
            return res;
        } catch (error) {
            throw error;
        }
}