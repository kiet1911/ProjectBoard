import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import ProductionCard from "../../ProductionCard/components";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { boardgamesService } from "../../../services/boardgames.service";
import type { BoardGames } from "../../../types/index";
export default function ProductSection({
  contentSection,
  apiUrl,
  keys,
}: {
  contentSection?: string;
  apiUrl?: string;
  keys?: string;
}) {
  const productionlst = useRef<HTMLDivElement>(null);
  const productionInterval = useRef(0);
  const [list, setList] = useState<BoardGames[]>([]);
  const [Error, setError] = useState<string|undefined>(undefined);
  useEffect(() => {
    if (productionlst.current) {
      productionInterval.current = setInterval(() => {
        if (!productionlst.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = productionlst.current;
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          productionlst.current?.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          productionlst.current?.scrollBy({
            left: 150,
            behavior: "smooth",
          });
        }
      }, 8000);
    }
    return () => clearInterval(productionInterval.current);
  }, []);
  useLayoutEffect(() => {
    if (apiUrl && contentSection && keys) {
      const fetch = async () => {
        try {
          const res = await boardgamesService.get(apiUrl);
          setList(res);
          // console.log(res);
        } catch (error) {
          setError(error as string);
          console.log(error as string);
        }
      };
      fetch();
    }
  }, [apiUrl]);
  return (
    <div
      key={contentSection?.concat(keys?.toString() ?? "default")}
      className="w-full relative pt-10 border-4 border-double border-mist-500/50 p-4 bg-white/90 space-y-0"
    >
      <div
        className="h-28 flex flex-col items-center justify-center absolute -top-12 left-[50%] -translate-x-[50%]"
        title={contentSection ?? "unTitle"}
      >
        <div className="z-10 text-[10px] uppercase tracking-wider text-white font-black bg-(--main-color) px-3 py-0.5 -skew-x-12 shadow-md mb-[-8px]">
          {contentSection?.split(" ")[0]}
        </div>

        <div className="z-0 text-sm font-bold bg-white text-black mr-2 px-4 py-1.5 border-2 border-black -skew-x-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] animate-pulse">
          {contentSection
            ?.replace(contentSection?.split(" ")[0] + " ", "")
            .trim()}
        </div>
      </div>
      <div className="w-full h-100 relative flex">
       
        <div
          ref={productionlst}
          className={`w-full h-full flex overflow-x-auto no-scrollbar gap-x-4 pt-4 pl-2 transition-all duration-1000 ${list.length === 0 ? "opacity-0" : "opacity-100"}`}
        >
          {list && list.map((item) => {
            return (
              <div key={item.id}>
                <ProductionCard data={item}></ProductionCard>
              </div>
            );
          })}
        </div>

        <span
          className={`${Error?" font-bold":"animate-spin border-2 h-10 w-10 transition-all duration-1000"} absolute border-l-mist-100 rounded-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${list.length === 0 ? "opacity-100" : "opacity-0"}`}
        >
          {Error?.toString().replace("AxiosError:","Api Error:")}
        </span>

        {/* switch button hidden */}
        <button className=" absolute top-[50%] -translate-y-[50%] -left-3 transition-all duration-500 opacity-10 hover:opacity-100 hover:-left-2">
          <ChevronLeftCircle
            className=" fill-mist-100"
            strokeWidth={1}
            size={30}
          ></ChevronLeftCircle>
        </button>
        <button className=" absolute top-[50%] -translate-y-[50%] -right-3 transition-all duration-500 opacity-10 hover:opacity-100 hover:-right-2">
          <ChevronRightCircle
            className=" fill-mist-100"
            strokeWidth={1}
            size={30}
          ></ChevronRightCircle>
        </button>
      </div>
    </div>
  );
}
