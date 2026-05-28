import { createBrowserRouter } from "react-router-dom";
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
                element: <Production></Production>
              }
              ,
              {
                path: ":id",
                element: <ProductionDetail></ProductionDetail>
              }
            ]
          },
          {
            element: <FavoriteRoute></FavoriteRoute>,
            children: [{
              path: "favorites",
              element: <Favorite></Favorite>
            }]
          }
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
    path: "*",
    element: <Error404Page />,
  },
]);
