import { AxiosError } from "axios";
import apiAdmin from "../../../../services/adminServices/apiAdmin";

export const imageBoardgames_service_dashboard = {
    getImageBoardgames: async (guid: string) => {
        try {
            const res = await apiAdmin.post("v1/ImageBoardgamesDashboard/Imageboardgames", guid);
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    },
    modifyImageBoardgames: async (x: {
        id: string, status: "add" | "update" | "delete", imageDTO: {
            imageId: string,
            alt: string,
            url: string,
            isThumbnail: boolean
        }
    }) => {
        try {
            const res = await apiAdmin.post("v1/ImageBoardgamesDashboard/ImageboardgamesUpdate", x);
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw error;
            }
            throw error;
        }
    }
}