import type React from "react";
import PageContainer from "../components/PageContainer";
import { useEffect, useState } from "react";

type tabType = { name: string; component: React.ComponentType };

const tab: tabType[] = [
  {
    name: "Your cart()",
    component: () => {
      return (
        <>
          <h1>Your cart</h1>
        </>
      );
    },
  },
  {
    name: "Save For Later",
    component: () => {
      return (
        <>
          <h1>Save For Later</h1>
        </>
      );
    },
  },
  {
    name: "My Orders",
    component: () => {
      return (
        <>
          <h1>My Orders</h1>
        </>
      );
    },
  },
];
// chinh lai cho order
// Pending
// Confirmed
// Packing
// Shipping
// Delivered
// Cancelled
// Refunded

export default function CartPage() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [render, setRender] = useState<boolean>(false);
  const ActiveComponent = tab[currentTab].component;
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (!render) setRender(true);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [currentTab]);
  return (
    <>
      <PageContainer url="../BackgroundContent/bghomepage.png">
        {/* head tabs */}
        {tab && tab.length > 0 ? (
          <div className="min-w-full flex flex-col gap-2">
            <div className="min-w-full flex flex-row gap-2">
              {tab.map((data, index) => {
                return (
                  <aside
                    key={`${data.name}-${index}`}
                    className="hover:cursor-pointer"
                  >
                    <h2
                      className={`navbar-link ${index === currentTab ? "bg-(--main-color) text-white" : "text-black"} `}
                      onClick={() => {
                        if (tab[index] && currentTab != index)
                          setCurrentTab(index);
                        setRender(false);
                      }}
                    >
                      {data.name}
                    </h2>
                  </aside>
                );
              })}
            </div>
            <div
              className={`bg-white/90 border-4 border-double border-mist-500/50 space-y-5 w-2/3 max-sm:w-full rounded-2xl overflow-hidden shadow-sm min-w-full min-h-100 flex justify-center transition-opacity duration-500 ease-in-out ${render ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
              <ActiveComponent></ActiveComponent>
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* body tabs */}
      </PageContainer>
    </>
  );
}
