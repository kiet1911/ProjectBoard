import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import App from "../App.tsx";
import { ProtectPath } from "../App.tsx";
import Error404Page from "../pages/Error.tsx";
import Login from "../pages/Login.tsx";
import About from "../pages/About.tsx";
import Contact from "../pages/Contact.tsx";
import HomePage from "../pages/HomePage.tsx";
import Production from "../pages/Product.tsx";
import PublicRoute from "./PublicRoute.tsx";
import ProductionDetail from "../pages/ProductionDetail.tsx";
import FavoriteRoute from "./FavoriteRoute.tsx";
import Favorite from "../pages/Favorite.tsx";
import CartRoute from "./CartRoute.tsx";
import CartPage from "../pages/Cart.tsx";
import VnPayTransactionRoute from "./VnPayTransactionRoute.tsx";
import VnPayPaymentResult from "../pages/VnPayPaymentResult.tsx";
import UserRoute from "./UserRoute.tsx";
import ProfilePage from "../pages/Profile.tsx";
import LoginAdminPage from "../pages/adminPages/LoginAdmin.tsx";
import DashBoardPage from "../pages/adminPages/DashBoard.tsx";
import ProtectedAdminRoute from "./ProtectedAdminRoute.tsx";
import CustomerAccountDashboardPage from "../pages/adminPages/CustomerDashboard.tsx";
import BoardgamesDashboardPage from "../pages/adminPages/BoardgameDashboard.tsx";
import CategoryDashboardPage from "../pages/adminPages/CategoryDashboard.tsx";
import PublisherDashboardPage from "../pages/adminPages/PublisherDashboard.tsx";

// create router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      console.log("this runing home ");
      return {
        name: "Huy",
      };
    },
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        element: <ProtectPath auth={true} />,
        children: [
          {
            path: "about",
            element: <About />, //go here if have auth
          },
          {
            path: "contact",
            element: <Contact />, //go here if have auth
          },
          {
            path: "product",
            children: [
              {
                index: true,
                element: <Production></Production>,
              },
              {
                path: ":id",
                element: <ProductionDetail></ProductionDetail>,
              },
            ],
          },
          {
            element: <FavoriteRoute></FavoriteRoute>,
            children: [
              {
                path: "favorites",
                element: <Favorite></Favorite>,
              },
            ],
          },
          {
            element: <CartRoute></CartRoute>,
            children: [
              {
                path: "cart",
                element: <CartPage></CartPage>,
              },
            ],
          },
          {
            element: <VnPayTransactionRoute></VnPayTransactionRoute>,
            children: [
              {
                path: "payment-result",
                element: <VnPayPaymentResult></VnPayPaymentResult>,
              },
            ],
          },
          {
            element: <UserRoute></UserRoute>,
            children: [
              {
                path: "profile",
                element: <ProfilePage></ProfilePage>,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute></PublicRoute>,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <LoginAdminPage></LoginAdminPage>,
  },
  {
    path: "admin",
    element : <ProtectedAdminRoute></ProtectedAdminRoute>,
    children: [
      {
        index:true,
        element: <Navigate to ="dashboard" replace></Navigate>
      },
      {
        path:"dashboard",
        element: <DashBoardPage></DashBoardPage>,        
      },{
        path:"customer-account",
        element: <CustomerAccountDashboardPage></CustomerAccountDashboardPage>
      },{
        path:"board-game",
        element: <BoardgamesDashboardPage></BoardgamesDashboardPage>
      },{
        path:"category",
        element: <CategoryDashboardPage></CategoryDashboardPage>
      },
      {
        path:"publisher",
        element: <PublisherDashboardPage></PublisherDashboardPage>
      }
    ],
  },
  {
    path: "*",
    element: <Error404Page />,
  },
]);
