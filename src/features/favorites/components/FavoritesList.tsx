import { useLocation } from "react-router-dom";
import type { BoardGames } from "../../../types";
import ProductionCard from "../../ProductionCard/components";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDebounce } from "../../../hook/useDebounce";
import SearchLoading from "../../../components/SearchLoading";

export default function FavoritesList({
  listFav,
  error,
}: {
  listFav: BoardGames[] | undefined | null;
  error?: string | undefined;
}) {
  const [listView, setListView] = useState<BoardGames[] | undefined | null>(
    listFav,
  );
  const [search, setSearch] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const debounceSearchItem = useDebounce(search, 300);
  const location = useLocation();
  const searchList = useMemo(() => {
    const data = listView?.filter((data) => {
      if (!debounceSearchItem) return true;
      const searchKey = debounceSearchItem.trim().toLowerCase();
      const matchName = data.name.trim().toLowerCase().includes(searchKey);
      const matchCategory = data?.categories.some((data) =>
        data.name.trim().toLowerCase().includes(searchKey),
      );
      return matchName || matchCategory;
    });
    return data;
  }, [listView, debounceSearchItem]);

  useEffect(() => {
    setListView(listFav);
  }, [listFav]);
  useEffect(() => {
    if (debounceSearchItem) {
      setSearchLoading(false);
    }
  }, [debounceSearchItem]);

  useEffect(() => {
    if (!location.state || !listView) return;
    //
    const data = listView?.filter((data) => {
      return data.id != location.state;
    });
    location.state = null;
    setListView(data);
  }, [location.state]);

  const handleSearchItem = (e: string) => {
    setSearch(e);
    if (e === "") {
      setSearchLoading(false);
    } else {
      setSearchLoading(true);
    }
  };

  return (
    <>
      <section className="bg-white/90 border-4 border-double border-mist-500/50 space-y-5 w-2/3 max-sm:w-full rounded-2xl overflow-hidden shadow-sm">
        <div className="mt-5 flex justify-center px-5">
          <label className="w-2/3 relative block">
            <span className="sr-only">Search boardgames</span>{" "}
            <input
              type="text"
              className="border border-slate-200 rounded-xl py-2 pl-4 pr-4 font-normal text-sm w-full focus:outline-none focus:border-mist-500 transition-colors"
              placeholder="Search by name or category..."
              onChange={(e) => {
                e.stopPropagation();
                handleSearchItem(e.target.value);
              }}
            />
          </label>
        </div>

        <div className="w-full relative min-h-75 max-h-200 overflow-y-auto px-6 pb-6">
          {searchList && searchList.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 justify-items-center-safe pt-6 w-full">
              {searchList.map((data) => (
                <li key={data.id} className="w-full flex justify-center">
                  <ProductionCard data={data} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              {error ? (
                <p className="text-red-500 font-medium">
                  {error.toString().replace("AxiosError:", "Api Error:")}
                </p>
              ) : !listView ? (
                <div className="animate-spin border-4 border-slate-200 border-t-mist-500 h-10 w-10 rounded-full" />
              ) : (
                <p className="text-slate-400 text-sm">
                  No boardgames found matching your search.
                </p>
              )}
            </div>
          )}
          {searchLoading && <SearchLoading></SearchLoading>}
        </div>
      </section>
    </>
  );
}
