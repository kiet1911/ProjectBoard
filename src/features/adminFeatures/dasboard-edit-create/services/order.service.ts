import { AxiosError } from "axios";
import apiAdmin from "../../../../services/adminServices/apiAdmin";

export const order_service_dashboard = {
    GetOrderById: async (x: string) => {
        try {
            const res = await apiAdmin.get("v1/OrderDashboard/Order", { params: { id: x } });
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    },
    OrderTransactionStatus: async (x: string) => {
        try {
            const res = await apiAdmin.get("v1/OrderDashboard/OrderTransactionStatus", { params: { orderId: x } });
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    },
    OrderStateChange: async (orderChangeStateDTO: { id: string, orderState: string }) => {
        try {
            const res = await apiAdmin.post("v1/OrderDashboard/OrderStateChange", orderChangeStateDTO);
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    }
}