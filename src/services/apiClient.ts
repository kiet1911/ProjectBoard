import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import useAuthStore from "../store/authentication/authState";
import { useToastNotification } from "../store/notification/notification";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7001',
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor when token was out
apiClient.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as CustomAxiosRequestConfig;
    if (
      err.response &&
      err.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log("try to refresh");
        //api refresh
        const res = await axios.post(
          import.meta.env.VITE_API_URL + "/Authentication/RefreshAccesToken",
          {},
          { withCredentials: true },
        );
        // console.log(res);

        if (res.status === 200) {
          console.log("Refresh success, retrying original request...");
          return apiClient(originalRequest);
        } else if (res.status === 401) {
          // log out
          // reset state global
          // navigationUtility("Login");
          useAuthStore.getState().logout();
        }
      } catch (error) {
        //loi khi refresh 
        // console.error("Refresh token failed, user must re-authenticate.");
        useAuthStore.getState().logout();
        useToastNotification.getState().add({text: "Refresh token failed, user must re-authenticate." ,type:"error"})
        return Promise.reject(error);
      }
    }
    useToastNotification.getState().add({text: `${err.message + " :" +err.code}` ,type:"error"})
    return Promise.reject(err);
  },
);

export default apiClient;
