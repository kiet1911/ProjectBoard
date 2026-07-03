import {
  ChevronsLeft,
  Home,
  House,
  icons,
  Menu,
  ShoppingBasket,
  ShoppingCart,
  User,
  type LucideProps,
} from "lucide-react";
export const ListTabsAction = [
  {
    icons: House,
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icons: User,
    name: "User",
    child: [
      {
        icons: User,
        name: "Customer Account",
      },
      {
        icons: User,
        name: "Customer Profile",
      },
      {
        icons: User,
        name: "Staff",
      },
    ],
  },
  {
    icons: ShoppingBasket,
    name: "E-commerce",
    child: [
      {
        icons: ShoppingBasket,
        name: "Publisher",
      },
      {
        icons: ShoppingBasket,
        name: "Category",
      },
      {
        icons: ShoppingBasket,
        name: "BoardGame",
      },
    ],
  },
  {
    icons: ShoppingCart,
    name: "Projects",
  },
];