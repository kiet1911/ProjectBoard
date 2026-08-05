import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { boardgames_service_dashboard } from "../../services/boardgame.service";
import { useEffect, useState } from "react";
import { LoadingBox } from "../../../../../components/LoadingBox";
import type { BoardGameDTO } from "../../stores/serivcesType";
import { useConfirmContent, useToastNotification } from "../../../../../store/notification/notification";
import { useShallow } from "zustand/shallow";
import { BoardGameStatus } from "../../stores/enum.service.store";
import BoardGameForm from "./boardGamesForm";

export default function UpdateForm({
  params,
  gridApi,
}: {
  params: { id: string };
  gridApi: () => void;
}) {
  const query = useQueryClient();
  const confirm = useConfirmContent(useShallow(t=>t.active));
  const notification = useToastNotification(useShallow(t=>t.add));
  const [form, setForm] = useState<Required<BoardGameDTO>>({
    id: "",
    name: "",
    base_Price: 0,
    stock_Quantity: 0,
    reservation_Quantity: 0,
    sold_Quantity: 0,
    created_at: "",
    updated_at: "",
    status: 0,
    weight: 0,
    size_X: 0,
    size_Y: 0,
    size_Z: 0,
    min_Player: 0,
    max_Player: 0,
    min_Time: 0,
    max_Time: 0,
    prefer_Player: 0,
    complexity: 0,
    rating: 0,
    age_Requirement: 0,
  });
  const response = useQuery({
    queryKey: ["data_boardgames", params.id],
    queryFn: async () => {
      const res = await boardgames_service_dashboard.GetBoardgamesWithId(
        params.id,
      );
      return res.data;
    },
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: 60 * 10 * 1000,
  });
  useEffect(()=>{
    query.invalidateQueries({queryKey:["data_boardgames",params.id]})
  },[])
  useEffect(() => {
    if (response.data && response.data.data) {
      //   console.log(response.data.data);
      setForm(response.data.data);
    }
  }, [response.data, response.isPending]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [name]:
          e.target.type === "number" || name === "status"
            ? Number(value)
            : value,
      };
    });
  };

  const updateInfo = useMutation({
    mutationKey: ["boardGame_update",form],
    mutationFn: async()=>{
        const res = await boardgames_service_dashboard.UpdateBoardGame(form);
        return res
    },
    onSuccess: (config)=>{
      notification({
        text: config.data.message ?? "replace notification: success",
        type: "success",
      });
      gridApi();
    },
    onError: (error)=>{
        notification({
        text: error.message ?? "replace notification: error api",
        type: "error",
      });
    }
  })

  const handleUpdate = async()=>{
    const res = await confirm("Are you sure you want to update this BoardGame");
    if(res && !updateInfo.isPending){
        updateInfo.mutate();
    }
  }


  return (
    <>
      {response.isPending ? (
        <div className="relative w-full h-10">
          <LoadingBox></LoadingBox>
        </div>
      ) : (
        <>
          {response.isError ? (
            <span className="text-red-500 text-center"> Api Error </span>
          ) : (
            <div key={params.id} className={`w-full`}>
              <div className="w-full flex flex-col gap-2 px-1 items-center justify-center font-medium">
                <h1 className="text-xl font-medium ">
                  Update BoardGame information
                </h1>
              </div>
              {form === undefined ? (
                <div>
                  <span className="text-red-500 text-center">
                    Data Type Error
                  </span>
                </div>
              ) : (
                <>
                  <BoardGameForm typeForm="update" handleChange={handleChange} handleUpdate={handleUpdate} form={form} ></BoardGameForm>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
