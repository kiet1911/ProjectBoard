import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import ProductionCard from "../../ProductionCard/components";

export default function ProductSection({
  contentSection,
}: {
  contentSection?: string;
}) {
  return (
    <div className="w-full border border-mist-500/50 rounded p-4 bg-white space-y-0">
      <h1
        className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap"
        title={contentSection ?? "untitle"}
      >
        {" "}
        ProductSection + {contentSection}+ {contentSection}+ {contentSection}
      </h1>
      <div className="w-full h-100 relative flex">
        {/* production list */}
        <div className=" w-full h-full flex overflow-x-scroll no-scrollbar gap-x-4 pt-4 pl-2">
          <ProductionCard></ProductionCard>
          <ProductionCard></ProductionCard>
          <ProductionCard></ProductionCard>
          <ProductionCard></ProductionCard>
          <ProductionCard></ProductionCard>
          <ProductionCard></ProductionCard>
          <ProductionCard></ProductionCard>
        </div>

        {/* switch button hidden */}
        {/* <button className=" absolute top-[50%] -translate-y-[50%] left-0">
          <ChevronLeftCircle className=" fill-mist-100" strokeWidth={1} size={30}></ChevronLeftCircle>
        </button>
        <button className=" absolute top-[50%] -translate-y-[50%] right-0">
          <ChevronRightCircle className=" fill-mist-100" strokeWidth={1} size={30}></ChevronRightCircle>
        </button> */}
      </div>
    </div>
  );
}
