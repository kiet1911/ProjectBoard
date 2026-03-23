import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import { ProtectPath } from "../App.tsx";
import Error404Page from "../pages/Error.tsx";
import Login from "../pages/Login.tsx";
import About from "../pages/About.tsx";
import Contact from "../pages/Contact.tsx";

// create router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      console.log('this runing home ')
      return {
        name: "Huy",
      };
    },
    children: [
      {
        element: <ProtectPath auth={true} />,
        children: [
          {
            path: "about",
            element: <About />,//go here if have auth
          },
          {
            path: "contact",
            element: <Contact />,//go here if have auth
          },
        ],
      }
    ],
  },
  {
    path: "Login",
    element: <Login/>,
  },
  {
    path: "*",
    element: <Error404Page />,
  },
]);
