import { useMutation } from "@tanstack/react-query"
import { Client_Booking_Service } from "../services/client.booking.service"
import { AxiosError } from "axios";
import type { ToastType } from "../../../store/notification/notification";

export const useBookingMutation = async ({ data, onNotification, onClear }: {
    data: any, onNotification: (x: {
        text: string;
        type: ToastType;
    }) => void,
    onClear:()=>void
}) => {
    const mutation = useMutation({
        mutationFn: async () => { 
            if (data) {
                const res = await Client_Booking_Service.UserBookingsSubmission(data);
                return res.data;
            }
            return Promise.reject("data submit error!")
        },
        onSuccess: (config) => {
            console.log(config)
            console.log("success")
            onNotification({ text: "Booking successfully!", type: "success" })
            onClear();
            
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message)
                onNotification({ text: error.response?.data.message, type: "error" })
            }
        },
        retry: 0,
    })

    return { mutation }
}