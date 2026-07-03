import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminLoginForm from "../../features/adminFeatures/admin-auth/components/AdminLoginForm";
import { useAuthAdminStore } from "../../store/authentication/authState";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../components/ToastNotification";

export default function LoginAdminPage() {
  const client = new QueryClient();
  const isAuthentication = useAuthAdminStore(
    useShallow((state) => state.isAuthentication),
  );
  const navigate = useNavigate();
  useEffect(() => {
    if(isAuthentication){
      navigate("/admin/dashboard");
    }
  }, [isAuthentication]);
  return (
    <>
      <QueryClientProvider client={client}>
        <div className="h-screen w-full border bg-red-300 flex relative">
          <div
            className={` bg-[url(${"../BackgroundContent/bghomepage.png"})] w-full bg-center bg-auto bg-origin-border flex flex-col justify-center-safe items-center-safe gap-y-8 pb-8`}
          >
            <AdminLoginForm></AdminLoginForm>
          </div>
          <ToastNotification></ToastNotification>
        </div>
      </QueryClientProvider>
    </>
  );
}
