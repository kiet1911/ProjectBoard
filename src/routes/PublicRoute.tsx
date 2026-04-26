import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authentication/authState"


const PublicRoute=()=>{
    const isAuth = useAuthStore((state) => state.isAuthentication);
    return isAuth ? <Navigate to={"/"} replace></Navigate> : <Outlet></Outlet>;
}

export default PublicRoute