import { Outlet } from "react-router-dom";
import useAuthStore from "../store/authentication/authState";
import { useToastNotification } from "../store/notification/notification";

export default function FavoriteRoute() {
  const isAuthentication = useAuthStore((state) => state.isAuthentication);
  if (!isAuthentication) {
    useToastNotification
      .getState()
      .add({ text: "You must be login!", type: "error" });
    return (
      <>
        <div className="min-h-100 w-full"></div>
      </>
    );
  } else {
    return <Outlet></Outlet>;
  }
}
