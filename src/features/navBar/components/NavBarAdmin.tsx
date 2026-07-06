import { ChevronsLeft, Menu, type LucideProps } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuthAdminStore } from "../../../store/authentication/authState";
import { useShallow } from "zustand/shallow";
// import { NavLink } from "react-router-dom";
import { ListTabsAction } from "../stores/NavBarStore";
import { useLocation } from "react-router-dom";
import { useConfirmContent } from "../../../store/notification/notification";

export default function NavBarAdmin({ node }: { node: React.ReactNode }) {
  const userInfo = useAuthAdminStore(
    useShallow((state) => ({
      publicId: state.publicId,
      fullName: state.fullName,
      role: state.role,
    })),
  );
  const logout = useAuthAdminStore((state) => state.logout);
  const handleConfirm = useConfirmContent(useShallow((state) => state.active));
  const [slideMenu, setSlideMenu] = useState<boolean>(false);
  const location = useLocation();
  const handleLogout = async () => {
    const confirm = await handleConfirm("Are you sure you want to logout?");
    if (confirm) {
      logout();
    }
  };
  return (
    <>
      <div className="h-screen w-full border bg-red-300 flex ">
        <div
          className={`relative bg-[url(${"../BackgroundContent/bghomepage.png"})] w-full bg-center bg-auto bg-origin-border flex flex-col justify-center-safe items-center-safe gap-y-0 p-0`}
        >
          {/* navbar siding */}
          <div
            className={`h-full w-60 fixed top-0 left-0 z-10 flex flex-col justify-start items-center gap-0 border-2 border-mist-400/30 bg-mist-50 transition-all ease-in-out duration-500 ${slideMenu ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="w-full p-2 flex justify-between items-center border-b-2 border-mist-400/30">
              <button type="button" className="navbar-link text-xs hover:bg-(--main-color) hover:text-white hover:cursor-pointer duration-200" onClick={handleLogout}>
                <span>Logout</span>
              </button>
              <ChevronsLeft
                className="hover:cursor-pointer"
                onClick={(e) => {
                  setSlideMenu(false);
                }}
              ></ChevronsLeft>
            </div>

            <div className="w-full h-full p-2 flex flex-col gap-0 overflow-y-auto">
              {ListTabsAction.map((data) => {
                return (
                  <RenderListTab
                    key={data.name}
                    data={data}
                    location={location.pathname}
                  ></RenderListTab>
                );
              })}
            </div>
          </div>

          {/* navbar header */}
          <div className="w-full border-b-2 border-mist-300 p-2 flex flex-row justify-between items-center-safe bg-mist-50">
            <div
              className="flex flex-row justify-center items-center gap-2 border-2 border-mist-400/30 rounded p-2 bg-mist-50 shadow-2xl/50 shadow-mist-500 cursor-pointer"
              onClick={(e) => {
                setSlideMenu(true);
              }}
            >
              <Menu size={20}></Menu>
            </div>
            <div className=" aspect-square w-15 border-2 border-mist-400/30 rounded-2xl bg-mist-50 shadow-2xl/50 shadow-mist-500">
              <img
                src="../../../../../public/logoBrand.png"
                className=""
                alt="Logo"
              />
            </div>
            <p>{userInfo.fullName}</p>
          </div>

          {/* body outlet */}
          <div className="w-full flex-1 p-0 flex flex-col bg-mist-200">{node}</div>
        </div>
      </div>
    </>
  );
}

const RenderListTab = ({
  data,
  location,
}: {
  data: {
    path?: string;
    name: string;
    icons: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    child?: {
      name: string;
      icons: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
    }[];
  };
  location: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [id] = useState(() => `tab-${Math.random().toString(36).substr(2, 9)}`);
  return (
    <>
      <label
        className={`navbar-link text-sm flex flex-row items-center gap-2 border rounded py-2 px-5 line-clamp-1 cursor-pointer mt-2 ${location === data.path || location.includes(data.name, 0) ? "bg-(--main-color) text-white" : "hover:bg-(--main-color) hover:text-white"}`}
        htmlFor={id}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <data.icons size={20}></data.icons>{" "}
        <span className=" select-none"> {data?.name}</span>
      </label>
      {data.child && data.child.length > 0 && (
        <>
          <div
            className={`w-full flex-col gap-0 max-h-0 opacity-0 flex transition-all duration-500 ease-in-out overflow-hidden ${open ? "max-h-125 opacity-100 pl-2 p-2" : ""}`}
          >
            {data.child.map((data) => {
              return (
                <RenderListTab
                  key={data.name}
                  data={data}
                  location={location}
                ></RenderListTab>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
