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

type UserRegisterError = {
  errorUserName: string;
  errorEmail: string;
  errorPassword: string;
  errorRePassword: string;
  errorAction: {
    setErrorUserName: (errorU: UserRegisterError["errorUserName"]) => void;
    setErrorEmail: (errorU: UserRegisterError["errorEmail"]) => void;
    setErrorPassword: (errorU: UserRegisterError["errorPassword"]) => void;
    setErrorRePassword: (errorU: UserRegisterError["errorRePassword"]) => void;
    setErrorReset: () => void;
  };
};

type UserRegisterLoading = {
  isLoading: boolean;
};

type UserRegisterStore = UserRegisterState &
  UserRegisterAction &
  UserRegisterLoading &
  UserRegisterError;

export const useUserRegisterStore = create<UserRegisterStore>()((set, get) => ({
  email: "",
  password: "",
  userName: "",
  rePassword: "",
  isLoading: false,
  errorUserName: "",
  errorEmail: "",
  errorPassword: "",
  errorRePassword: "",
  errorAction: {
    setErrorEmail(errorU) {
       set((state) => ({ ...state, errorEmail: errorU }));
    },
    setErrorUserName(errorU) {},
    setErrorPassword(errorU) {},
    setErrorRePassword(errorU) {
      set((state) => ({ ...state, errorRePassword: errorU }));
    },
    setErrorReset() {
      set((state) => ({
        ...state,
        errorUserName: "",
        errorEmail: "",
        errorPassword: "",
        errorRePassword: "",
      }));
    },
  },
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
      const { errorAction } = get();
      // console.log(`${email} ${password} ${userName} ${rePassword}`);
      let status = "";
      errorAction.setErrorReset();
      action.setIsLoading(true);
      if (password != rePassword) {
        errorAction.setErrorRePassword(
          "RePassword does not match with password!",
        );
        action.setIsLoading(false);
        return status;
      }
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
            alert("Thông báo lỗi :" + error.response.data.message);
            // console.log("Status Code:", error.response.status);
            status = error.response.status.toString();
            status==="409"&&errorAction.setErrorEmail(error.response.data.message);
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
