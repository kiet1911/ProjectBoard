import { Outlet } from "react-router-dom";
import ProductionPage from "../features/production/components";

export default function Production() {
  return (
    <>
      <ProductionPage>
        <Outlet></Outlet>
      </ProductionPage>
    </>
  );
}
