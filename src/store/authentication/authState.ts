import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  fullName: string | null;
  publicId: string | null;
  isAuthentication: boolean;
  setAuth: (publicId: string, fullName: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(persist((set,get) => ({
    fullName:null,
    publicId:null,
    isAuthentication:false,
    setAuth:(publicId,fullName)=>{
        set( {fullName:fullName,publicId:publicId,isAuthentication:true} );
    },
    logout:()=>{
        set( {fullName:null,publicId:null,isAuthentication:false} );
        localStorage.removeItem('auth-storage');
    }

}), {name:'auth-storage'}));

export default useAuthStore;