import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useProductionFilter } from "../../../store/productionFilter/productionFilter";
import { useDebounce } from "../../../hook/useDebounce";
import { boardgamesService } from "../../../services/boardgames.service";
import { useShallow } from "zustand/shallow";

export default function SearchBar({ toggle }: { toggle: () => void }) {
  const [isActive, setActive] = useState<boolean>(false);
  const gameLists = useProductionFilter((state) => state.gameLists);
  const searchBar = useProductionFilter(useShallow((state) => state.searchBar));
  const [search, setSearch] = useState<string>("");
  const debounceFilter = useDebounce(search, 500);
  useEffect(() => {
    if (debounceFilter) {
      try {
        //reset filter
        useProductionFilter.getInitialState().resetFilters();
        useProductionFilter.getInitialState().resetPagination();
        //api
        const fetch = async () => {
          const data = await boardgamesService.get(
            "/v1/BoardGames/BoardGamesSearch",
            {
              Search: debounceFilter,
              Page: 0,
              PageSize:
                useProductionFilter.getInitialState().pagination.pageSize,
            },
          );
          //set search , game
          useProductionFilter.getInitialState().setSearchBar(debounceFilter);
          useProductionFilter.getInitialState().setGameLists(data?.gameLists);
        };
        fetch();
      } catch (error) {
        console.log(error);
      }
    }
  }, [debounceFilter]);

  useEffect(() => {
    if (!searchBar.search || searchBar.search === "") {
      setSearch("");
    }
  }, [searchBar]);

  return (
    <>
      <header className="bg-white border border-mist-200 rounded-2xl p-4 shadow-sm flex max-sm:flex-col justify-between items-center gap-4">
        <div className="text-sm text-mist-500 max-sm:self-start flex items-center gap-2">
          <button
            className={`max-md:flex hidden border rounded-xl py-1.5 px-3 shadow-sm cursor-pointer  flex-row items-center gap-1 ${isActive ? "bg-mist-500/50 text-white" : "border-mist-200"}`}
            onClick={() => {
              toggle();
              setActive(!isActive);
            }}
          >
            {" "}
            <Menu size={15}></Menu>Filter
          </button>
          {gameLists ? (
            <>
              <span>
                Show{" "}
                <span className="font-bold text-mist-900">
                  {gameLists.length}
                </span>{" "}
                products{" "}
              </span>
            </>
          ) : (
            <>
              <div className="animate-spin border-2 border-slate-300 border-t-slate-600 h-4 w-4 rounded-full" />
            </>
          )}
        </div>
        <div className="flex gap-2 w-1/3 max-md:w-1/2 max-sm:w-full justify-end">
          <input
            type="text"
            placeholder="Find name game..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-mist-200 rounded-xl py-1.5 px-3 font-normal text-sm focus:outline-none focus:border-mist-400"
          />
        </div>
      </header>
    </>
  );
}
