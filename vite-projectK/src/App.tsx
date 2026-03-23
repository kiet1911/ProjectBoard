import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import "./App.css";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./features/navBar";
// fake component
export function ProtectPath({ auth = false }: { auth: boolean }) {
  // console.log("ProtectPath render", auth);
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <NavBar auth={true}></NavBar>
      
      <Outlet />
    </>
  );
}

export default App;
