import React, { useEffect, useState } from "react";
import { useDebounce } from "../../../hook/useDebounce";
import { useProductionFilter } from "../../../store/productionFilter/productionFilter";
import { boardgamesService } from "../../../services/boardgames.service";
import axios from "axios";
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
    const debounceFilter = useDebounce(filterValue, 500);
    const [firstRender, setFirstRender] = useState<boolean>(false);
    const apiCall = useProductionFilter(state=>state.initialQuery);
    const handleGameList = useProductionFilter(state=>state.setGameLists);
    const resetPagination = useProductionFilter(state=>state.resetPagination);
    const handleFilter = React.useCallback(() => {
      if (debounceFilter) {
        // api here
        const fetch = async() =>{
          try {
            resetPagination();
            const apiQuery = axios.getUri({
              baseURL: import.meta.env.VITE_API_URL,
              url: "/v1/BoardGames/BoardGamesFilter",
              params: apiCall(),
            })
            const data = await boardgamesService.queryFilter(apiQuery,apiCall())
            handleGameList(data.gameLists||[])
            //reset pagination
          } catch (error) {
            console.log(error);
          }
        }
        fetch();
        // console.log("call api" + debounceFilter , apiCall());

      }
    }, [debounceFilter]);

    useEffect(() => {
      if (!firstRender) {
        setFirstRender(true);
        return;
      }
      if (debounceFilter && firstRender) handleFilter();
    }, [debounceFilter]);

    useEffect(() => {
      setFilter(keyFilter, Number(filterValue));
    }, [filterValue]);

    return (
      <>
        <div className="space-y-2" key={keyFilter}>
          <label className="text-sm font-medium flex justify-between">
            <span>{dataFilter.displayName} :</span>
            <span className="text-xs text-emerald-600 font-bold">
              {keyFilter==='Price'?Number(dataFilter.value).toLocaleString('vi-VN',{
                style:'currency',
                currency: 'VND'
              }):dataFilter.value}
            </span>
          </label>
          <input
            type={dataFilter.baseInput}
            min={dataFilter.min}
            max={dataFilter.max}
            step={dataFilter.step}
            value={dataFilter.value}
            onChange={(e) => {
              // setFilter(keyFilter, Number(e.target.value));
              setFilterValue(String(e.target.value));
            }}
            // onMouseUp={handleFilter}
            // onTouchEnd={handleFilter}
            className="w-full accent-(--main-color,##db3332)"
          />
        </div>
      </>
    );
  },
);
