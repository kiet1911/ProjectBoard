import { Outlet } from "react-router-dom";

export default function Production() {
  return (
    <>
      <div className="">
        <h1>Production</h1>
        <Outlet></Outlet>
      </div>
    </>
  );
}
