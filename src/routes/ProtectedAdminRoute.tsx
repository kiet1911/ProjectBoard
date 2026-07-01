import { useShallow } from "zustand/shallow";
import { useAuthAdminStore } from "../store/authentication/authState";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";


export default function ProtectedAdminRoute (){
    const isAuthentication = useAuthAdminStore(useShallow(state=>state.isAuthentication));
    // useEffect(()=>{console.log("call")},[])
    return !isAuthentication ? <Navigate to="/admin/login"></Navigate> : <Outlet></Outlet>
}