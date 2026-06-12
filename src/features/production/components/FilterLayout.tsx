import React, { useCallback, useEffect } from "react";
import { useProductionFilter } from "../../../store/productionFilter/productionFilter";
import { FilterSlider } from "./FilterSlider";
import { useShallow } from "zustand/shallow";

export default function FilterLayout({
  isHidden = true,
}: {
  isHidden?: boolean;
}) {
  const config = useProductionFilter((state) => state.config);
  const setFilter = useProductionFilter((state) => state.setFilters);
  useEffect(() => {
    useProductionFilter.getState().resetFilters();
    useProductionFilter.getState().resetPagination();
    useProductionFilter.getState().resetSearchBar();
  }, []);
  const handleDeleteAllFilter = useCallback(() => {
    useProductionFilter.getState().resetFilters();
    useProductionFilter.getState().resetPagination();
    useProductionFilter.getState().resetSearchBar();
    useProductionFilter.getState().setGameLists(undefined);
  }, []);

  return (
    <>
      <aside
        className={`w-60 ${isHidden ? "max-md:hidden" : ""} bg-white rounded-2xl border border-mist-200 p-5 shadow-sm flex flex-col gap-6 h-fit sticky top-30`}
      >
        <div className="flex items-center justify-between border-b border-b-mist-300 pb-3">
          <h2 className="text-lg font-bold text-mist-900">Filter</h2>
          <button
            onClick={() => {
              handleDeleteAllFilter();
            }}
            className="text-xs text-red-500 hover:underline font-medium"
          >
            reset filter
          </button>
        </div>
        {config &&
          Object.entries(config).map((data) => {
            return (
              <FilterSlider
                key={data[0]}
                keyFilter={data[0]}
                dataFilter={data[1]}
                setFilter={setFilter}
              ></FilterSlider>
            );
          })}
        <FilterNote></FilterNote>
      </aside>
    </>
  );
}

const FilterNote = React.memo(() => {
  const isSearch = useProductionFilter(
    useShallow((state) => state.searchBar.isSearch),
  );
  return (
    <div className="flex items-center justify-between border-t border-mist-300 pt-3">
      <h2 className="text-xs font-medium text-mist-900">
        {isSearch ? "Using Search Bar" : "Using Filter"}
      </h2>
    </div>
  );
});
