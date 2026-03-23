import { useEffect, useState } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { MobileSidebar } from "./MobileSidebar";
import { AuthActions } from "./AuthActions";
import { NavLinks } from "./NavLinks";

function NavBar({ auth = false }: { auth: boolean }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="w-screen sticky top-0 flex justify-between items-center px-5 py-1 bg-white border-b border-black/10 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="hidden max-md:block p-2 border border-black/10 rounded"
        >
          <Menu />
        </button>

        <div className="w-25 aspect-3/2.5">
          <img src="./src/assets/logo1.png" alt="logo" />
        </div>

        <NavLinks className="flex flex-row gap-5 max-md:hidden" />

        <AuthActions auth={auth} />

        <NavLink to="/" className="hidden max-md:block">
          <ShoppingCart size={20} />
        </NavLink>
      </nav>

      <MobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
export default NavBar;
