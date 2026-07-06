import { dashboardService } from "../../../../services/adminServices/dashboard.service";

export const FetchProductionAnalyst = {
    TopMostSell: async()=>{
        try {
            const res = await dashboardService.MostSell();
            return res;
        } catch (error) {
            throw error;
        }
    },
    LowStock: async()=>{
        try {
            const res = await dashboardService.LowStock();
            return res;
        } catch (error) {
            throw error;
        }
    }

}