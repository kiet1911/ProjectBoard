import { create } from "zustand";

type UserLoginState = {
  email: string;
  password: string;
};
type UserLoginAction = {
  setEmail: (email: UserLoginState["email"]) => void;
  setPassword: (password: UserLoginState["password"]) => void;
  clear: () => void;
  log: () => void;
};

type UserLoginStore = UserLoginState & UserLoginAction;

export const useUserLoginStore = create<UserLoginStore>()((set,get) => ({
  email: "",
  password: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  clear: () => set((state)=>({email:"",password:""})),
  log: () => {
    const {email,password} = get();
    console.log(`${email} ${password}`);},
}));
