import { useEffect } from "react";
import { useProductionFilter } from "../../../store/productionFilter/productionFilter";
import { FilterSlider } from "./FilterSlider";

export default function FilterLayout({isHidden=true}:{isHidden?:boolean}) {
  const config = useProductionFilter((state) => state);
  const setFilter = useProductionFilter((state) => state.setFilters);
  useEffect(()=>{
    useProductionFilter.getInitialState().resetFilters();
    useProductionFilter.getInitialState().resetPagination();
  },[])

  return (
    <>
      <aside className={`w-60 ${isHidden?"max-md:hidden":""} bg-white rounded-2xl border border-mist-200 p-5 shadow-sm flex flex-col gap-6 h-fit sticky top-30`}>
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-bold text-mist-900">Filter</h2>
          <button
            onClick={() => {
              if (config) config.resetFilters();
            }}
            className="text-xs text-red-500 hover:underline font-medium"
          >
            delete filter
          </button>
        </div>
        {config &&
          Object.entries(config.config).map((data) => {
            return (
              <FilterSlider
                key={data[0]}
                keyFilter={data[0]}
                dataFilter={data[1]}
                setFilter={setFilter}
              ></FilterSlider>
            );
          })}
      </aside>
    </>
  );
}
