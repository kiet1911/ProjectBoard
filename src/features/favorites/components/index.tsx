import { useEffect, useLayoutEffect, useState } from "react";
import PageContainer from "../../../components/PageContainer";
import { useFavorite } from "../hook/useFavorite";
import type { BoardGames } from "../../../types";
import FavoritesList from "./FavoritesList";

export default function FavoritesPage() {
  const { loading, dataFav } = useFavorite();
  const [data, setData] = useState<BoardGames[] | null>();
  useLayoutEffect(() => {
    if (!loading) {
      //   console.log(dataFav);
      setData(dataFav.favorites);
    }
  }, [dataFav]);
  return (
    <>
      <PageContainer url="./BackgroundContent/bghomepage.png">
          <FavoritesList listFav={data}></FavoritesList>
      </PageContainer>
    </>
  );
}
