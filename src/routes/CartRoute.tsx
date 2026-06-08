import useAuthStore from "../store/authentication/authState";
import { useEffect } from "react";
import { useToastNotification } from "../store/notification/notification";
import { Outlet } from "react-router-dom";

export default function CartRoute() {
  const isAuthentication = useAuthStore((state) => state.isAuthentication);
  useEffect(() => {
    if (!isAuthentication) {
      useToastNotification
        .getState()
        .add({ text: "You must be login!", type: "error" });
    }
  }, [isAuthentication]);
  return (
    <>
      {isAuthentication ? (
        <Outlet></Outlet>
      ) : (
        <div className="min-h-100 w-full"></div>
      )}
    </>
  );
}
