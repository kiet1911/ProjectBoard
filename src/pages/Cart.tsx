import type React from "react";
import PageContainer from "../components/PageContainer";
import { useEffect, useState } from "react";
import CartList from "../features/cart/components";

type tabType = { name: string; component: React.ComponentType };

const tab: tabType[] = [
  {
    name: "Your Cart",
    component: CartList,
  },
  {
    name: "Your Orders",
    component: () => {
      return (
        <>
          <h1>My Orders</h1>
        </>
      );
    },
  },
];

export default function CartPage() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [render, setRender] = useState<boolean>(false);
  const ActiveComponent = tab[currentTab].component;
  useEffect(() => { 
    window.scrollTo({
    top:0,
    behavior: "smooth"
  }) }, []);
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
        {tab && tab.length > 0 ? (
          <div className="min-w-full flex flex-col gap-2">
            <div className="min-w-full flex flex-row gap-2">
              {tab.map((data, index) => {
                return (
                  <aside
                    key={`${data.name}-${index}`}
                    className="hover:cursor-pointer max-md:text-xs"
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
              className={`max-md:text-xs bg-white/90 border-4 border-double border-mist-500/50 space-y-5 w-2/3 max-sm:w-full rounded-2xl overflow-hidden shadow-sm min-w-full min-h-100 flex justify-center transition-opacity duration-500 ease-in ${render ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
              <ActiveComponent></ActiveComponent>
            </div>
          </div>
        ) : (
          <></>
        )}
      </PageContainer>
    </>
  );
}
