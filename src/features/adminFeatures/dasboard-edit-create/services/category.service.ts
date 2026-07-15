import { AxiosError } from "axios"
import apiAdmin from "../../../../services/adminServices/apiAdmin";
import type { CategoryDTO } from "../stores/serivcesType";

export const category_service_dashboard = {
    updateStatus: async ({ id }: { id: string }) => {
        try {
            const res = null;
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    },
    updateCategory: async (fromBody: CategoryDTO) => {
        try {
            const res = apiAdmin.post("v1/CategoryDashBoard/CategoryUpdate", {
                id: Number(fromBody.id),
                name: fromBody.name.toString(),
                description: fromBody.description.toString(),
                status: fromBody.status,
            })
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    },
    addCategory: async (fromBody: CategoryDTO) => {
        try {
            const res = apiAdmin.post("v1/CategoryDashBoard/CategoryCreate", {
                id: Number(fromBody.id),
                name: fromBody.name.toString(),
                description: fromBody.description.toString(),
                status: fromBody.status,
            })
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    }
}