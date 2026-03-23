import { NavLink } from "react-router-dom";
const tabs = [
  {
    key: "tabs01",
    title: "Home",
    path: "/",
    hidden: false,
  },
  {
    key: "tabs04",
    title: "Product",
    path: "/",
    hidden: false,
  },
  {
    key: "tabs02",
    title: "About",
    path: "/About",
    hidden: false,
  },
  {
    key: "tabs03",
    title: "Contact",
    path: "/Contact",
    hidden: false,
  },
];
export const NavLinks = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <nav className={className}>
    {tabs.map((tab) => (
      <NavLink
        key={tab.key}
        to={tab.path}
        // onClick={onClick} // Click to close sidebar
        className={({ isActive }) =>
          `navbar-link ${isActive ? "text-mist-100 bg-(--main-color)" : ""}`
        }
      >
        {tab.title}
      </NavLink>
    ))}
  </nav>
);
