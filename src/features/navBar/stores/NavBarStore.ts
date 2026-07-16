import {
  House,
  ShoppingBasket,
  ShoppingCart,
  User,
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
        path: "/admin/customer-account"
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
        path: "/admin/publisher"
      },
      {
        icons: ShoppingBasket,
        name: "Category",
        path: "/admin/category"
      },
      {
        icons: ShoppingBasket,
        name: "BoardGame",
        path: "/admin/board-game"
      },
    ],
  },
  {
    icons: ShoppingCart,
    name: "Projects",
  },
];