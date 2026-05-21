import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login.tsx";

export const routerNavigation = createBrowserRouter([
  { path: '/Login', element: <Login /> },
]);