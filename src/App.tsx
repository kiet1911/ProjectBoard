import { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./features/navBar/components";
import Footer from "./components/Footer";
// fake component
export function ProtectPath({ auth = false }: { auth: boolean }) {
  // console.log("ProtectPath render", auth);
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="flex flex-col">
      <NavBar auth={true}></NavBar>
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
