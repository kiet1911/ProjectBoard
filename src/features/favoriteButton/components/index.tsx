import { Heart } from "lucide-react";
import React, { useCallback, useState } from "react";
import useAuthStore from "../../../store/authentication/authState";
import { useShallow } from "zustand/shallow";
import { favoriteService } from "../../../services/favorite.service";
import { useToastNotification } from "../../../store/notification/notification";
import { useLocation, useNavigate } from "react-router-dom";

export const FavoriteButton = React.memo(
  ({
    boardGameId,
    heartSize = 12,
  }: {
    boardGameId?: string;
    heartSize?: number;
  }) => {
    const authentication = useAuthStore(
      useShallow((state) => ({
        isAuthentication: state.isAuthentication,
        publicId: state.publicId,
      })),
    );
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = useCallback(() => {
      if (loading) return;
      if (
        boardGameId != null &&
        authentication.isAuthentication &&
        authentication.publicId !== null
      ) {
        const fetch = async () => {
          setLoading(true);
          try {
            const res = await favoriteService.Add(
              "v1/Favorite/Add",
              boardGameId,
            );
            useToastNotification.getState().add({
              text: !res.isdelete ? "Add success" : "Remove success",
              type: "success",
            });
            //refresh FavoriteList Page 
            if(location.pathname.toLowerCase().includes("favorites") && res && res.isdelete){
              navigate("/favorites",{state:boardGameId})
            }
          } catch (error) {
            console.log(error);
          } finally {
            setTimeout(() => {
              setLoading(false);
            }, 3000);
          }
        };
        fetch();
      }
    }, [
      boardGameId,
      authentication.isAuthentication,
      authentication.publicId,
      loading,
    ]);

    return (
      <>
        <div
          className={` navbar-link w-auto hover:bg-(--main-color) ${heartSize < 20 && "p-1"} hover:text-white duration-100 `}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {loading ? (
            <>
              <div
                className={`animate-spin border-2 border-mist-300 border-t-mist-600 aspect-square ${heartSize < 20 ? "w-3" : "w-6"} rounded-full`}
              />
            </>
          ) : (
            <>
              <Heart size={heartSize}></Heart>
            </>
          )}
        </div>
      </>
    );
  },
);
