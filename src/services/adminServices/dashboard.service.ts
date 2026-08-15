import { AxiosError } from "axios"
import apiAdmin from "./apiAdmin";

export const dashboardService = {
    Customers: async () => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/Customer");
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    Orders: async () => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/Order");
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    Cancelled: async () => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/Cancelled");
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    Revenue: async (x?: string) => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/Revenue", { params: { filter: x } });
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    MostSell: async () => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/TopMostSell");
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    LowStock: async () => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/LowStock");
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    TopCurrentOrder: async () => {
        try {
            const res = await apiAdmin.get("v1/Dashboard/TopCurrentOrder");
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    CustomerTable: async (x: { page: number, pageSize: number, sortBy?: String, sortDirection?: String }) => {
        try {
            const res = await apiAdmin.get("v1/UserDashboard/CustomerTable", { params: x })
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    BoardgamesTable: async (x: { page: number, pageSize: number, statusSearch?: string, nameSearch?: String, sortBy?: String, sortDirection?: String }) => {
        try {
            const res = await apiAdmin.get("v1/BoardgamesDashboard/BoardgamesTable", { params: x })
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    CategoryTable: async (x: { page: number, pageSize: number, sortBy?: String, sortDirection?: String, nameSearch: string, descriptionSearch: string }) => {
        try {
            const res = await apiAdmin.get("v1/CategoryDashBoard/CategoryTable", { params: x })
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    CreatorTable: async (x: { page: number, pageSize: number, sortBy?: String, sortDirection?: String, nameSearch: string, idSearch: string, bioSearch: string }) => {
        try {
            const res = await apiAdmin.post("v1/PublisherDashBoard/CreatorsTable", x)
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    ImageBoardgames: async (x: { page: number, pageSize: number, sortBy?: String, sortDirection?: String, nameGameSearch: string, idSearch: string }) => {
        try {
            const res = await apiAdmin.post("v1/ImageBoardgamesDashboard/ImageBoardgamesTable", x)
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    }
    ,
    OrderTable: async (x: {
        page: number, pageSize: number, sortBy?: String, sortDirection?: String, idSearch: string, publicIdSearch: string
        nameReciptient: string,
        phoneReciptient: string,
    }) => {
        try {
            const res = await apiAdmin.get("v1/OrderDashboard/OrderTable", { params: x })
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    },
    BookingTable: async (x: {
        page: number, pageSize: number, sortBy?: String, sortDirection?: String, idSearch: string, nameSearch: string, phoneSearch: string, statusSearch: string,
    }) => {
        try {
            const res = await apiAdmin.get("v1/BookingDashboard/BookingTable", { params: x })
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                throw error;
            }
            throw error;
        }
    }

}