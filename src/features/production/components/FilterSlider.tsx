import React, { useEffect, useState } from "react";
import { useDebounce } from "../../../hook/useDebounce";
import { useProductionFilter } from "../../../store/productionFilter/productionFilter";
import { boardgamesService } from "../../../services/boardgames.service";
import axios from "axios";
import { useShallow } from "zustand/shallow";
export const FilterSlider = React.memo(
  ({
    keyFilter,
    dataFilter,
    setFilter,
  }: {
    keyFilter: string;
    dataFilter: any;
    setFilter: (keys: string, value: string | number) => void;
  }) => {
    const [filterValue, setFilterValue] = useState(dataFilter.value);
    const debounceFilter = useDebounce(filterValue, 350);
    const [firstRender, setFirstRender] = useState<boolean>(false);

    const { apiCall, handleGameList, resetSearchBar, resetPagination } =
      useProductionFilter(
        useShallow((state) => ({
          apiCall: state.initialQuery,
          handleGameList: state.setGameLists,
          resetSearchBar: state.resetSearchBar,
          resetPagination: state.resetPagination,
        })),
      );

    useEffect(() => {
      setFilter(keyFilter, Number(filterValue));
    }, [filterValue, keyFilter, setFilter]);

    useEffect(() => {
      setFilterValue(dataFilter.value);
    }, [dataFilter.value]);

    useEffect(() => {
      if (!firstRender) {
        setFirstRender(true);
        return;
      }

      let isCurrentRequest = true;

      if (debounceFilter && firstRender) {
        const fetch = async () => {
          try {
            resetPagination();

            const apiQuery = axios.getUri({
              baseURL: import.meta.env.VITE_API_URL,
              url: "/v1/BoardGames/BoardGamesFilter",
              params: apiCall(),
            });

            const data = await boardgamesService.queryFilter(
              apiQuery,
              apiCall(),
            );

            if (isCurrentRequest) {
              handleGameList(data.gameLists || []);
              resetSearchBar();
              resetPagination();
            }
          } catch (error) {
            console.log(error);
          }
        };

        fetch();
      }

      return () => {
        isCurrentRequest = false;
      };
    }, [
      debounceFilter,
      firstRender,
      apiCall,
      handleGameList,
      resetSearchBar,
      resetPagination,
    ]);

    return (
      <>
        <div className="space-y-2" key={keyFilter}>
          <label className="text-sm font-medium flex justify-between">
            <span>{dataFilter.displayName} :</span>
            <span className="text-xs text-emerald-600 font-bold">
              {keyFilter === "Price"
                ? Number(filterValue).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                : filterValue}
            </span>
          </label>
          <input
            type={dataFilter.baseInput}
            min={dataFilter.min}
            max={dataFilter.max}
            step={dataFilter.step}
            value={filterValue}
            onChange={(e) => {
              setFilterValue(String(e.target.value));
            }}
            className="w-full accent-(--main-color,##db3332)"
          />
        </div>
      </>
    );
  },
);
