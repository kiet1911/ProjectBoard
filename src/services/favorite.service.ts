import apiClient from "./apiClient";

export const favoriteService = {
  Add: async (uri: string, frombody?: string) => {
    try {
      const data = await apiClient.post(`${uri}`, frombody);
      return data.data;
    } catch (err) {
      // console.log(err);
      throw err;
    }
  },
  GetByUserId: async (uri: string, publicId: string) => {
    try {
      const res = await apiClient.post(`${uri}`, publicId);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
