import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { boardgames_service_dashboard } from "../../services/boardgame.service";
import { useEffect, useState } from "react";
import { LoadingBox } from "../../../../../components/LoadingBox";
import type { BoardGameDTO } from "../../stores/serivcesType";
import {
  useConfirmContent,
  useToastNotification,
} from "../../../../../store/notification/notification";
import { useShallow } from "zustand/shallow";
import { BoardGameStatus } from "../../stores/enum.service.store";
import BoardGameForm from "./boardGamesForm";
import { useCreateContainer } from "../../stores/createContainer";
import { AxiosError } from "axios";

export default function CreateForm({ gridApi }: { gridApi: () => void }) {
  const query = useQueryClient();
  const confirm = useConfirmContent(useShallow((t) => t.active));
  const notification = useToastNotification(useShallow((t) => t.add));
  const close = useCreateContainer(useShallow((t) => t.close));
  const [form, setForm] = useState<Required<BoardGameDTO>>({
    id: window.crypto.randomUUID(),
    name: "",
    base_Price: 0,
    stock_Quantity: 0,
    reservation_Quantity: 0,
    sold_Quantity: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: 1,
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
    mutationKey: ["boardGame_create", form],
    mutationFn: async () => {
      const res = await boardgames_service_dashboard.CreateBoardGame(form);
      return res;
    },
    onSuccess: (config) => {
      notification({
        text: config.data.message ?? "replace notification: success",
        type: "success",
      });
      gridApi();
      close();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        notification({
          text: error.response?.data.message || "Error",
          type: "error",
        });
      } else {
        notification({
          text: error.message ?? "replace notification: error api",
          type: "error",
        });
      }
    },
  });

  const handleUpdate = async () => {
    const res = await confirm("Are you sure you want to create this BoardGame");
    if (res && !updateInfo.isPending) {
      updateInfo.mutate();
    }
  };

  return (
    <>
      <div className={`w-full`}>
        <div className="w-full flex flex-col gap-2 px-1 items-center justify-center font-medium">
          <h1 className="text-xl font-medium ">Crate BoardGame information</h1>
        </div>
        {form === undefined ? (
          <div>
            <span className="text-red-500 text-center">Data Type Error</span>
          </div>
        ) : (
          <>
            <BoardGameForm
              typeForm="add"
              handleChange={handleChange}
              handleUpdate={handleUpdate}
              form={form}
            ></BoardGameForm>
          </>
        )}
      </div>
    </>
  );
}
