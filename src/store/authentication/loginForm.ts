import { create } from "zustand";
import axios from "axios";

type LoginResponseData = {
  publicid: string;
  fullname: string;
};
type UserLoginState = {
  email: string;
  password: string;
};
type UserLoginAction = {
  setEmail: (email: UserLoginState["email"]) => void;
  setPassword: (password: UserLoginState["password"]) => void;
  clear: () => void;
  log: () => Promise<{status:string,data:LoginResponseData}>;
};
type UserLoginLoading = {
  isLoading: boolean;
  setIsLoading: (isLoading: UserLoginLoading["isLoading"]) => void;
};

type UserLoginError = {
  errorEmail: string;
  errorPassword: string;
  setErrorState: (
    errorM: UserLoginError["errorEmail"],
    errorP: UserLoginError["errorPassword"],
  ) => void;
};

type UserLoginStore = UserLoginState &
  UserLoginAction &
  UserLoginLoading &
  UserLoginError;

export const useUserLoginStore = create<UserLoginStore>()((set, get) => ({
  email: "",
  password: "",
  isLoading: false,
  errorEmail: "",
  errorPassword: "",
  setErrorState: (emailErr, passwordErr) => {
    set((state) => ({
      ...state,
      errorEmail: emailErr,
      errorPassword: passwordErr,
    }));
  },
  setIsLoading: (isloading) => set({ isLoading: isloading }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  clear: () => set(() => ({ email: "", password: "" })),
  log: async () => {
    const { email, password, setIsLoading, setErrorState } = get();
    const apiUrl = import.meta.env.VITE_API_URL;
    let status = "";
    let data:LoginResponseData = {
      publicid:"",
      fullname:""
    };
    setIsLoading(true);
    setErrorState("", "");
    //test axios
    await axios
      .post(
        `${apiUrl}Authentication/login`,
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
        data = res.data;
        setIsLoading(false);
        setErrorState("", "");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Data lỗi từ Backend:", error.response.data);
          // alert("Thông báo lỗi :" + error.response.data.error.password);
          //passError
          setErrorState(
            error.response.data.error.email ?? "",
            error.response.data.error.password ?? "",
          );
          console.log("Status Code:", error.response.status);
          status = error.response.status.toString();
        } else if (error.request) {
          // console.log("Không nhận được phản hồi từ Server");
          alert(`${"No response received from the server"}`);
        } else {
          console.log("Lỗi cấu hình Axios:", error.message);
          alert(`Lỗi cấu hình Axios: ${error.message}`);
        }
        setIsLoading(false);
      });
    return {status,data};
  },
}));
