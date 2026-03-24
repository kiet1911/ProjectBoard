import { Link } from "react-router-dom";
import { CircleUser, Heart, ShoppingCart } from "lucide-react";


export const AuthActions = ({
  auth,
  isMobile,
}: {
  auth: boolean;
  isMobile?: boolean;
}) => {
  const baseClass = isMobile
    ? "flex flex-col gap-4"
    : "flex flex-row gap-4 max-md:hidden";

  return (
    <ul className={baseClass}>
      {auth && (
        <>
          <Link to="/favorites" className="hover:text-(--main-color)">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className="hover:text-(--main-color)">
            <ShoppingCart size={20} />
          </Link>
        </>
      )}
      <Link to="/Login" className="flex items-center gap-1 hover:text-(--main-color)">
        <CircleUser size={20} /> Login
      </Link>
    </ul>
  );
};
