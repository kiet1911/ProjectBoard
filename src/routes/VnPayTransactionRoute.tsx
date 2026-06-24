import { useShallow } from "zustand/shallow";
import useAuthStore from "../store/authentication/authState";
import { Navigate, Outlet, } from "react-router-dom";

export default function VnPayTransactionRoute(){
    const auth = useAuthStore(useShallow(state=>state.isAuthentication));
    return auth ? <Outlet /> : <Navigate to="*" replace />;
}