import { AxiosError } from "axios";
import type { PublisherDTO } from "../stores/serivcesType";
import apiAdmin from "../../../../services/adminServices/apiAdmin";


export const publisher_service_dashboard = {
    updatePublisher: async (fromBody: PublisherDTO) => {
        try {
            const res = await apiAdmin.post("v1/PublisherDashboard/CreatorUpdate", fromBody)
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    },
    createPublisher: async (fromBody: PublisherDTO) => {
        try {
            const res = await apiAdmin.post("v1/PublisherDashboard/CreatorCreate", fromBody)
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    },
}