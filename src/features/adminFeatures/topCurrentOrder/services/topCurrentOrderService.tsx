import { dashboardService } from "../../../../services/adminServices/dashboard.service";

export const FetchCurrentOrder = {
  TopCurrentOrder: async () => {
    try {
      const res = await dashboardService.TopCurrentOrder();
      return res;
    } catch (error) {
      throw error;
    }
  },
};
