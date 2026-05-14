import { useLayoutEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { boardgamesService } from "../services/boardgames.service";
import type { BoardGames } from "../types";
export default function ProductionDetail() {
  const id = useParams();
  const location = useLocation();
  const [detailBoardGame, setdetailBoardGame] = useState<BoardGames>();
  useLayoutEffect(() => {
    // console.log(id, location.state?.data);
    // scroll top
    window.scrollTo(0, 0);
    // setup data
    if (id.id) {
      //call api
      const fetch = async () => {
        try {
          const res = await boardgamesService.get("v1/BoardGames/Id", {
            guid: id.id,
          });
          if (res) {
            setdetailBoardGame(res);
          }
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      };
      fetch();
    }
  }, [id.id]);
  return (
    <>
      <div
        id="productionDetail"
        className="min-h-screen px-[10%] pt-[1rem] bg-[url(/BackgroundContent/bghomepage.png)] bg-center bg-auto bg-origin-border flex flex-col gap-y-[2rem] pb-[2rem]"
      >
        {/* path */}
        <h1 className="text-(--main-color) underline">
          ../product/{detailBoardGame?.name || "Loading..."}
        </h1>
        <textarea
          className="h-20 w-full border text-black"
          readOnly 
          value={
            detailBoardGame
              ? JSON.stringify(detailBoardGame, null, 2)
              : "No data available"
          }
        />
      </div>
    </>
  );
}
