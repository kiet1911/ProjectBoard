import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { BoardGames } from "../../../types";
import ProductionCard from "../../ProductionCard/components";
import { useProductionFilter } from "../../../store/productionFilter/productionFilter";
import axios from "axios";
import { boardgamesService } from "../../../services/boardgames.service";
import { useShallow } from "zustand/shallow";

export default function GameLists() {
  const { games, setGames, isMax, pagination, apiCall, addGamesLists } =
    useProductionFilter(
      useShallow((state) => ({
        games: state.gameLists,
        setGames: state.setGameLists,
        isMax: state.pagination.isMaxRecord,
        pagination: state.setPagination,
        apiCall: state.initialQuery,
        addGamesLists: state.addGamesLists,
      })),
    );

  const [gameLists, setGameLists] = useState<BoardGames[] | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const apiQuery = axios.getUri({
        baseURL: import.meta.env.VITE_API_URL,
        url: "/v1/BoardGames/BoardGamesFilter",
        params: apiCall(),
      });
      
      const data = await boardgamesService.queryFilter(apiQuery, apiCall());
      setGames(data.gameLists ?? []);
      setGameLists(data.gameLists ?? []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiCall, games]);

  const fetchAdd = useCallback(async () => {
    try {
      setIsMoreLoading(true);
      pagination(false);
      const apiQuery = axios.getUri({
        baseURL: import.meta.env.VITE_API_URL,
        url: "/v1/BoardGames/BoardGamesFilter",
        params: apiCall(),
      });
      const data = !useProductionFilter.getState().searchBar.isSearch
        ? await boardgamesService.queryFilter(apiQuery, apiCall())
        : await boardgamesService.get("/v1/BoardGames/BoardGamesSearch", {
            Search: useProductionFilter.getState().searchBar.search,
            Page: useProductionFilter.getState().pagination.page,
            PageSize: useProductionFilter.getState().pagination.pageSize,
          });
      addGamesLists(data.gameLists);
      data.isMax && pagination(data.isMax);
    } catch (error) {
      console.log(error);
    } finally {
      setIsMoreLoading(false);
    }
  }, [apiCall, addGamesLists, pagination]);

  useEffect(() => {
    if (gameLists === undefined || games === undefined) {
      console.log("trigger");
      fetch();
    } else {
      divRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setGameLists(games);
    }
  }, [games]);

  useEffect(() => {
    if (gameLists && gameLists.length > 0 && !isLoading) {
      const container = divRef.current;
      if (container) {
        const timer = setTimeout(() => {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [isMoreLoading]);

  const handleMoreGame = () => {
    if (isMoreLoading) return;
    fetchAdd();
  };

  return (
    <>
      <div className="bg-white border border-mist-200 rounded-2xl p-6 shadow-sm max-h-125 relative flex flex-col justify-between">
        {isLoading ? (
          <div className=" w-full h-full flex justify-center items-center absolute inset-0">
            <div className="animate-spin border-4 border-mist-200 border-t-mist-500 h-10 w-10 rounded-full" />
          </div>
        ) : gameLists && gameLists.length > 0 ? (
          <>
            <div
              ref={divRef}
              className=" h-full grid grid-cols-3 max-sm:grid-cols-2 max-lg:grid-cols-2 lg:gap-y-5 max-md:gap-y-0 max-md:pt-0 justify-items-center-safe pt-5 overflow-auto"
            >
              {gameLists &&
                gameLists.map((data: any) => (
                  <li
                    key={data.id}
                    className="w-full flex justify-center xl:scale-100 max-lg:scale-85 max-md:scale-80 list-none"
                  >
                    <ProductionCard data={data} />
                  </li>
                ))}
            </div>
            {isMax ? (
              <></>
            ) : (
              <>
                <div className="w-full flex justify-center pt-5 mt-2 border-t border-mist-300">
                  <button
                    onClick={handleMoreGame}
                    disabled={isMoreLoading}
                    className="px-6 py-2.5 bg-(--footer-bg-color) hover:bg-mist-800 disabled:bg-mist-100 text-white disabled:text-mist-400 text-sm font-medium rounded-xl shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed border border-transparent disabled:border-mist-200"
                  >
                    {isMoreLoading ? (
                      <>
                        <div className="animate-spin border-2 border-mist-300 border-t-mist-600 h-4 w-4 rounded-full" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <span>Load More</span>
                    )}
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="w-full flex justify-center items-center text-mist-400 text-sm">
              <span>No boardgames found matching your search.</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
