import { Link, NavLink } from "react-router-dom";
import { CircleUser, Heart, LogOut, ShoppingCart } from "lucide-react";
import useAuthStore from "../../../store/authentication/authState";

export const AuthActions = ({ isMobile = false }: { isMobile?: boolean }) => {
  const baseClass = isMobile ? "flex flex-col gap-4" : "flex flex-row gap-4";
  const auth = useAuthStore((state) => state.isAuthentication);
  const fullName = useAuthStore((state) => state.fullName);
  const logout = useAuthStore((state) => state.logout);
  const handlerLogout = () => {
    confirm("Are you sure you want to logout?") && logout();
  }
  return (
    <ul className={baseClass}>
      {auth ? (
        <>
          <Link
            to="/favorites"
            className={`hover:text-(--main-color)  ${isMobile ? "max-md:block" : "max-md:hidden"}`}
          >
            <Heart size={20} />
          </Link>
          <Link
            to="/cart"
            className={`hover:text-(--main-color) ${isMobile ? "max-md:hidden" : "max-md:block"}`}
          >
            <ShoppingCart size={20} />
          </Link>
          <div
            className={`flex items-center gap-1 hover:cursor-pointer ${isMobile ? "" : "max-md:hidden"}`}
          >
            <CircleUser className="flex shrink-0" size={20} />
            <span className="text-sm truncate min-w-0 max-w-30" title={fullName??""}>{fullName}</span>
          </div>
          <div
            className={`flex items-center gap-1 hover:cursor-pointer ${isMobile ? "" : "max-md:hidden"}`}
            onClick={handlerLogout}
          >
            <LogOut size={20}></LogOut>
            <span className="text-sm md:hidden">Logout</span>
          </div>
        </>
      ) : (
        <>
          <Link
            to="/Login"
            className="flex items-center gap-1 hover:text-(--main-color)"
          >
            <CircleUser size={20} /> Login
          </Link>
        </>
      )}
    </ul>
  );
};
