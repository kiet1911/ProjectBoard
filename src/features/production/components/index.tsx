import { useEffect, useRef, useState, type ReactNode } from "react";
import PageContainer from "../../../components/PageContainer";
import { useProduction } from "../hook/useProduction";
import FilterLayout from "./FilterLayout";
import SearchBar from "./SearchBar";
import GameLists from "./GameLists";
import { ResizeObserverLargerUtility } from "../../../utility/ResizeObserverUtility";

export default function ProductionPage({ children }: { children?: ReactNode }) {
  // const { dataPro } = useProduction();
  const navRef = useRef<HTMLElement>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  useEffect(() => {
    if (!navRef.current) {
      return;
    }
    const resizeObserver = ResizeObserverLargerUtility(
      768,
      setToggle((prev) => {
        if (prev === true) {
          return false;
        }
        return prev;
      }),
    );
    //   for (const entry of entries) {
    //     if (entry) {
    //       const width = entry.contentRect.width;
    //       if (width > 768) {
    //         setToggle((prev) => {
    //           if (prev === true) {
    //             return false;
    //           }
    //           return prev;
    //         });
    //       }
    //     }
    //   }
    // });
    resizeObserver.observe(navRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <PageContainer url="../BackgroundContent/bghomepage.png">
        <div className="flex w-full min-h-screen bg-mist-50 p-4 gap-4 font-medium text-mist-800 border-4 border-double border-mist-500/50 rounded-2xl">
          <FilterLayout></FilterLayout>

          <main className="flex-1 flex flex-col gap-4">
            <SearchBar toggle={handleToggle}></SearchBar>

            <GameLists></GameLists>
          </main>
        </div>

        {children}
      </PageContainer>
      <nav
        ref={navRef}
        className={`w-full flex justify-center duration-500 ${toggle ? "visible" : " invisible"}`}
      >
        <div
          className={`bg-mist-50 fixed bottom-0 left-1/2 -translate-x-1/2 z-50 p-2 border-4 border-double border-mist-500/50 rounded-2xl transform transition-transform duration-1000  ${toggle ? "opacity-100" : "opacity-0 translate-y-full"} `}
        >
          <FilterLayout isHidden={false}></FilterLayout>
        </div>
      </nav>
    </>
  );
}
