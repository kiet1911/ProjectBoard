import { AxiosError } from "axios";
import apiClient from "../../../services/apiClient";


export const Client_Booking_Service = {
    UserBookingsSubmission: async (data: any) => {
        try {
            const res = await apiClient.post("v1/Booking/UserBookingsSubmission", data);
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    },
    UserBookings: async (x: {
        publicId:string,
        page: number, pageSize: number, sortBy?: String, sortDirection?: String, nameReservation?: string
    }) => {
        try {
            const res = await apiClient.post("v1/Booking/UserBookings", x)
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    },
    UserBookingDetail: async(x:{publicId:string|null,bookingId:string}) => {
        try {
            const res = await apiClient.get("v1/Booking/UserBookingDetail",{params:x})
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    }
    ,
    UserBookingCancel: async(x:{publicId:string|null,bookingId:string}) => {
        try {
            console.log(x);
            const res = await apiClient.post("v1/Booking/UserBookingCancel",x)
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    }
}