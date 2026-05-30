import { useEffect, useState } from "react";
import { useToastNotification } from "../../../store/notification/notification";
import { boardgamesService } from "../../../services/boardgames.service";

export const useProduction = () => {
  const [loading, setLoading] = useState(true);
  const [dataPro, setDataPro] = useState<any | []>();
  const [error, setError] = useState<string | undefined>(undefined);
  useEffect(() => {
    // if (!publicId) {
    //   setLoading(false);
    //   useToastNotification
    //     .getState()
    //     .add({ text: "You must be login!", type: "error" });
    //   return;
    // }
    const fetch = async () => {
      try {
        const data = await boardgamesService.get(
          "v1/BoardGames/BoardGames",
        );
        setDataPro(data || []);
        // console.log(data);
      } catch (error) {
        console.error(error);
        setDataPro([]);
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { loading, dataPro, error };
};
