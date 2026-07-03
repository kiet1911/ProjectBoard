import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthAdminStore } from "../../store/authentication/authState";
import { useToastNotification } from "../../store/notification/notification";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const apiAdmin = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7001',
    withCredentials: true,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});
// interceptor request 
apiAdmin.interceptors.request.use(res => {
    res.headers["X-Client-Page"] = "/admin/login";
    return res;
}, error => error);

// interceptor when token was out
apiAdmin.interceptors.response.use(
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
                //
                if (useAuthAdminStore.getState().publicId == null) {
                    useAuthAdminStore.getState().logout();
                    return Promise.reject(err);
                }
                //api refresh
                const res = await axios.post(
                    import.meta.env.VITE_API_URL + "/Authentication/RefreshAdminAccessToken", {
                    id: useAuthAdminStore.getState().publicId,
                },
                    { withCredentials: true },
                );
                // console.log(res);

                if (res.status === 200) {
                    console.log("Refresh success, retrying original request...");
                    return apiAdmin(originalRequest);
                } else if (res.status === 401) {
                    // log out
                    // reset state global
                    // navigationUtility("Login");
                    useAuthAdminStore.getState().logout();
                    return Promise.reject(err);
                }
            } catch (error) {
                //loi khi refresh 
                // console.error("Refresh token failed, user must re-authenticate.");
                // console.log(error)
                useAuthAdminStore.getState().logout();
                useToastNotification.getState().add({ text: "Refresh token failed, user must re-authenticate.", type: "error" })
                return Promise.reject(error);
            }
        }
        // useToastNotification.getState().add({ text: `${err.message + " :" + err.code}`, type: "error" })
        return Promise.reject(err);
    },
);

export default apiAdmin;
