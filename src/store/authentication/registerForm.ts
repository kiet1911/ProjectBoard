import { create } from "zustand";

type UserRegisterState = {
  userName: string;
  email: string;
  password: string;
  rePassword: string;
};
type UserRegisterAction = {
  setUserName: (userName: UserRegisterState["userName"]) => void;
  setEmail: (email: UserRegisterState["email"]) => void;
  setPassword: (password: UserRegisterState["password"]) => void;
  setRePassword: (rePassword: UserRegisterState["rePassword"]) => void;
  clear: () => void;
  log: () => void;
};

type UserRegisterStore = UserRegisterState & UserRegisterAction;

export const useUserRegisterStore = create<UserRegisterStore>()((set, get) => ({
  email: "",
  password: "",
  userName: "",
  rePassword: "",
  setUserName: (userName) => set({ userName }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setRePassword: (rePassword) => set({ rePassword }),
  clear: () => set((state) => ({ email: "", password: "" , userName: "", rePassword: ""})),
  log: () => {
    const { email, password, userName, rePassword} = get();
    console.log(`${email} ${password} ${userName} ${rePassword}`);
  },
}));
