import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  CircleUser,
  Heart,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import useAuthStore from "../../../store/authentication/authState";

export const AuthActions = ({ isMobile = false }: { isMobile?: boolean }) => {
  const baseClass = isMobile
    ? "flex flex-col gap-4 relative"
    : "flex flex-row gap-4 relative";
  const auth = useAuthStore((state) => state.isAuthentication);
  const fullName = useAuthStore((state) => state.fullName);
  const logout = useAuthStore((state) => state.logout);
  const handlerLogout = () => {
    confirm("Are you sure you want to logout?") && logout();
  };
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
          {/* dropdown menu for user */}
          <div
            className={` relative flex items-center gap-1 ${isMobile ? "block" : "max-md:hidden"}`}
          >
            <label
              className={`cursor-pointer  relative flex items-center p-0 w-full`}
            >
              <input
                name="profile"
                id="profile"
                type="checkbox"
                className="sr-only peer/userprofile"
              />
              <div className="flex flex-row items-center hover:text-(--main-color)">
                <CircleUser className="pointer-events-none " size={20} />
              </div>
              <ChevronDown
                size={12}
                className="peer-checked/userprofile:rotate-180 duration-300"
              ></ChevronDown>
              <div className="max-md:left-0 hidden bg-white border border-mist-400 rounded-xl absolute top-8 right-0 py-2 px-3 peer-checked/userprofile:block">
                <ul className="text-[10px] space-y-2 last:mb-2">
                  <li className=" text-center">{fullName ?? "NaN"}</li>
                  <li className=" navbar-link p-1 flex justify-center hover:bg-(--main-color) hover:text-white transition-colors duration-200 ">
                    <Link to="/">
                      <span className="">Profiles</span>
                    </Link>
                  </li>
                  <li
                    className=" navbar-link p-1 flex justify-center hover:bg-(--main-color) hover:text-white transition-colors duration-200  "
                    onClick={handlerLogout}
                  >
                    <span className="">Logout</span>{" "}
                  </li>
                </ul>
              </div>
            </label>
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
