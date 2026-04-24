import { create } from "zustand";
import axios from "axios";
type UserLoginState = {
  email: string;
  password: string;
};
type UserLoginAction = {
  setEmail: (email: UserLoginState["email"]) => void;
  setPassword: (password: UserLoginState["password"]) => void;
  clear: () => void;
  log: () => Promise<string>;
};
type UserLoginLoading = {
  isLoading: boolean;
  setIsLoading: (isLoading:UserLoginLoading["isLoading"]) => void;
}

type UserLoginStore = UserLoginState & UserLoginAction & UserLoginLoading;

export const useUserLoginStore = create<UserLoginStore>()((set, get) => ({
  email: "",
  password: "",
  isLoading: false,
  setIsLoading: (isloading) => set({isLoading:isloading}),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  clear: () => set(() => ({ email: "", password: "" })),
  log: async() => {
    const { email, password ,setIsLoading } = get();
    let status = "";
    setIsLoading(true);
    //test axios
    await axios
      .post(
        "https://localhost:44316/api/Authentication/login",
        {
          Email: email,
          Password: password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        // console.log(res);
        status = res.status.toString();
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          // console.log("Data lỗi từ Backend:", error.response.data);
          alert(
            "Thông báo lỗi :"+
            error.response.data.error.password,
          );
          console.log("Status Code:", error.response.status);
          status = error.response.status.toString();
        } else if (error.request) {
          // console.log("Không nhận được phản hồi từ Server");
          alert(`${"No response received from the server"}` )
        } else {
          console.log("Lỗi cấu hình Axios:", error.message);
          alert(`Lỗi cấu hình Axios: ${error.message}` )
        }
        setIsLoading(false);
      });
      return status;
  },
}));
