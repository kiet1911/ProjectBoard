import { AxiosError } from "axios"
import apiAdmin from "../../../../services/adminServices/apiAdmin";

export const booking_service_dashboard = {
    Booking: async (x: string) => {
        try {
            const res = await apiAdmin.get("v1/BookingDashboard/Booking", { params: { id: x } })
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    },
    BookingStatusChange: async (x:{id:string,bookingStatus:number,rejectionReason?:string}) => {
        try {
            const res = await apiAdmin.post("v1/BookingDashboard/BookingStatusChange", x)
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    }
}
