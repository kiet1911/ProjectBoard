import { dashboardService } from "../../../../services/adminServices/dashboard.service"
import { useToastNotification } from "../../../../store/notification/notification";


export const FetchUserQuery = async()=>{
    try {
        const res = await dashboardService.Customers();
        // useToastNotification.getState().add({text:res.message,type:"success"});
        return res;
    } catch (error) {
        throw error;
    }
}

export const FetchOrderQuery = async()=>{
    try {
        const res = await dashboardService.Orders();
        // useToastNotification.getState().add({text:res.message,type:"success"});
        return res;
    } catch (error) {
        throw error;
    }
}

export const FetchCancelledQuery = async()=>{
    try {
        const res = await dashboardService.Cancelled();
        // useToastNotification.getState().add({text:res.message,type:"success"});
        return res;
    } catch (error) {
        throw error;
    }
}