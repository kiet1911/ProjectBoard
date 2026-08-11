import "./App.css";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./features/navBar/components";
import Footer from "./components/Footer";
import AlertNotification from "./components/AlertNotification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ConfirmNotification from "./components/ConfirmNotification";
import UpdateContainer from "./features/adminFeatures/dasboard-edit-create/components/updateContainer";

// fake component
export function ProtectPath({ auth = false }: { auth: boolean }) {
  // console.log("ProtectPath render", auth);
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div id="app" className="flex flex-col min-h-full">
          <NavBar auth={true}></NavBar>
          <main className="grow">
            <Outlet />
          </main>
          <Footer />
        </div>
        <AlertNotification></AlertNotification>
        <ConfirmNotification></ConfirmNotification>
        <UpdateContainer></UpdateContainer>
      </QueryClientProvider>
    </>
  );
}

export default App;
