import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProductionPage from "../features/production/components";
import { useEffect } from "react";

export default function Production() {
  const location = useLocation()
  const navigate = useNavigate();
  useEffect(() => {
    if(location.search){
      navigate(location.pathname,{replace:true});
    }
  }, []);
  return (
    <>
      <ProductionPage>
        <Outlet></Outlet>
      </ProductionPage>
    </>
  );
}
