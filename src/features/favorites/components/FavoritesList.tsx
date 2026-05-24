import { useNavigate, useSearchParams } from "react-router-dom";
import type { BoardGames } from "../../../types";
import ProductionCard from "../../ProductionCard/components";
import { useEffect, useLayoutEffect, useState } from "react";

export default function FavoritesList({
  listFav,
}: {
  listFav: BoardGames[] | undefined | null;
}) {
  const [listView, setListView] = useState<BoardGames[]| undefined | null>(listFav);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  let currentPage = parseInt(searchParams.get("page") || "1");
  useLayoutEffect(() => {
    //check filter url
    if (searchParams.size == 0) {
      console.log("current page 1");
      currentPage = 1;
    } else if (searchParams.size != 1 || !searchParams.get("page")) {
      navigate("/favorites", { replace: true });
    } else {
      console.log(searchParams.get("page"));
    }
  }, []);
  useEffect(()=>{
    setListView(listFav);
  },[listFav])
  const handleClick = ()=>{
    
  }
  return (
    <>
      <div className="bg-white/90 border-4 border-double border-mist-500/50 space-y-0">
        <div className="mt-5 min-h-5 flex justify-center ">
          <input
            type="text"
            className="border-1 rounded-xl py-1 font-normal text-sm pl-2 w-1/3"
            placeholder="Search..."
          />
        </div>
        <div
          className="w-full grid grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] justify-items-center content-center gap-y-5 py-5 px-10 "
        >
          {listView ? (
            listView.slice(0,1).map((data, index) => {
              return (
                <div key={data.id}>
                  <ProductionCard data={data}></ProductionCard>
                </div>
              );
            })
          ) : (
            <span
              className={`animate-spin border-2 h-10 w-10 transition-all duration-1000"} mt-10 border-l-mist-100 rounded-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
            ></span>
          )}
        </div>
        <div className="mt-5 min-h-5 flex justify-center border ">
            click 
        </div>
      </div>
    </>
  );
}
