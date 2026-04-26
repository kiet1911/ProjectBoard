import { AuthActions } from "./AuthActions";
import { NavLinks } from "./NavLinks";
export default function NavBarActionaAndMenu() {
  return (
    <>
      {/* nav links */}
      <NavLinks className="flex flex-row gap-5 max-md:hidden" />

      {/* auth actions */}
      <AuthActions/>
    </>
  );
}
