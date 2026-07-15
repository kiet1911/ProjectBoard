import { useShallow } from "zustand/shallow";
import { useAuthAdminStore } from "../store/authentication/authState";
import { Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBarAdmin from "../features/navBar/components/NavBarAdmin";
import ConfirmNotification from "../components/ConfirmNotification";
import AlertNotification from "../components/AlertNotification";
import ToastNotification from "../components/ToastNotification";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";
import UpdateContainer from "../features/adminFeatures/dasboard-edit-create/components/updateContainer";
import CreateContainer from "../features/adminFeatures/dasboard-edit-create/components/createContainer";

const modules = [AllCommunityModule];

export default function ProtectedAdminRoute() {
  const isAuthentication = useAuthAdminStore(
    useShallow((state) => state.isAuthentication),
  );

  const queryClient = new QueryClient();
  // useEffect(()=>{console.log("call")},[])
  // return
  return (
    <AgGridProvider modules={modules}>
      <QueryClientProvider client={queryClient}>
        {!isAuthentication ? (
          <Navigate to="/admin/login"></Navigate>
        ) : (
          <>
            <NavBarAdmin node={<Outlet></Outlet>}></NavBarAdmin>{" "}
            <AlertNotification></AlertNotification>
            <ConfirmNotification></ConfirmNotification>
            <ToastNotification></ToastNotification>
            <UpdateContainer></UpdateContainer>
            <CreateContainer></CreateContainer>
          </>
        )}
      </QueryClientProvider>
    </AgGridProvider>
  );
}
