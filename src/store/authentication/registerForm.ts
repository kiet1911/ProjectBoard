import { create } from "zustand";
import axios from "axios";
type UserRegisterState = {
  userName: string;
  email: string;
  password: string;
  rePassword: string;
};
type UserRegisterAction = {
  action: {
    setUserName: (userName: UserRegisterState["userName"]) => void;
    setEmail: (email: UserRegisterState["email"]) => void;
    setPassword: (password: UserRegisterState["password"]) => void;
    setRePassword: (rePassword: UserRegisterState["rePassword"]) => void;
    clear: () => void;
    setIsLoading: (isLoading: UserRegisterLoading["isLoading"]) => void;
    log: () => Promise<string>;
  };
};

type UserRegisterLoading = {
  isLoading: boolean;
};

type UserRegisterStore = UserRegisterState &
  UserRegisterAction &
  UserRegisterLoading;

export const useUserRegisterStore = create<UserRegisterStore>()((set, get) => ({
  email: "",
  password: "",
  userName: "",
  rePassword: "",
  isLoading: false,
  action: {
    setUserName: (userName) => set({ userName }),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setRePassword: (rePassword) => set({ rePassword }),
    clear: () =>
      set(() => ({ email: "", password: "", userName: "", rePassword: "" })),
    setIsLoading: (isLoading) => set({ isLoading }),
    log: async () => {
      const { email, password, userName, rePassword, action } = get();
      // console.log(`${email} ${password} ${userName} ${rePassword}`);
      let status = "";
      action.setIsLoading(true);
      //test axios
      await axios
        .post(
          "https://localhost:44316/api/Authentication/register",
          {
            UserName: userName,
            Password: password,
            Email: email,
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          // console.log(res);
          status = res.status.toString();
          action.setIsLoading(false);
        })
        .catch((error) => {
          if (error.response) {
            // console.log("Data lỗi từ Backend:", error.response.data);
            alert("Thông báo lỗi :" + error.response.data.error);
            // console.log("Status Code:", error.response.status);
            status = error.response.status.toString();
          } else if (error.request) {
            console.log("Không nhận được phản hồi từ Server");
          } else {
            console.log("Lỗi cấu hình Axios:", error.message);
          }
          action.setIsLoading(false);
        });
      return status;
    },
  },
}));
