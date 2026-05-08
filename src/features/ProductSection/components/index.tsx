import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import ProductionCard from "../../ProductionCard/components";
import { useEffect, useRef } from "react";

export default function ProductSection({
  contentSection,
  apiUrl,
}: {
  contentSection?: string;
  apiUrl?: string;
}) {
  const productionlst = useRef<HTMLDivElement>(null);
  const productionInterval = useRef(0);
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
  return (
    <div key={contentSection} className="w-full relative pt-10 border-4 border-double border-mist-500/50 p-4 bg-white/90 space-y-0">
      <div
        className="h-28 flex flex-col items-center justify-center absolute -top-12 left-[50%] -translate-x-[50%]"
        title={contentSection ?? "untitle"}
      >
        <div className="z-10 text-[10px] uppercase tracking-wider text-white font-black bg-(--main-color) px-3 py-0.5 -skew-x-12 shadow-md mb-[-8px]">
          {contentSection?.split(" ")[0]}
        </div>

        <div className="z-0 text-sm font-bold bg-white text-black mr-2 px-4 py-1.5 border-2 border-black -skew-x-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] animate-pulse">
          {contentSection?.replace(contentSection?.split(" ")[0] + " ","").trim()}
        </div>
      </div>
      <div className="w-full h-100 relative flex">
        {/* production list */}
        <div
          ref={productionlst}
          className=" w-full h-full flex overflow-x-auto no-scrollbar gap-x-4 pt-4 pl-2"
        >
          <ProductionCard></ProductionCard>
          <ProductionCard></ProductionCard>
          <ProductionCard></ProductionCard>
          <ProductionCard></ProductionCard>
          <ProductionCard></ProductionCard>
          <ProductionCard></ProductionCard>
          <ProductionCard></ProductionCard>
        </div>

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
