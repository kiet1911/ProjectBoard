import { useEffect, useLayoutEffect, useState } from "react";
import useAuthStore from "../../../store/authentication/authState";
import { useToastNotification } from "../../../store/notification/notification";
import { favoriteService } from "../../../services/favorite.service";

export const useFavorite = () => {
  const publicId = useAuthStore((state) => state.publicId);
  const [loading, setLoading] = useState(true);
  const [dataFav, setDataFav] = useState<any|[]>();
  useEffect(() => {
    if (!publicId) {
      setLoading(false);
      useToastNotification
        .getState()
        .add({ text: "You must be login!", type: "error" });
      return;
    }
    const fetch = async () => {
      try {
        const data = await favoriteService.GetByUserId(
          "v1/Favorite/Id",
          publicId,
        );
        setDataFav(data || []);
        // console.log(data);
      } catch (error) {
        console.error(error);
        setDataFav([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [publicId]);

  return { loading, dataFav };
};
