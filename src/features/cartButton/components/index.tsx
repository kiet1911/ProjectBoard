import { ShoppingCart } from "lucide-react";
import React, { useCallback, useState } from "react";
import useAuthStore from "../../../store/authentication/authState";
import { useShallow } from "zustand/shallow";
import { useToastNotification } from "../../../store/notification/notification";
import { cartService } from "../../../services/cart.service";

export const CartButton = React.memo(
  ({
    boardGameId,
    cartSize = 12,
  }: {
    boardGameId?: string;
    cartSize?: number;
  }) => {
    const authentication = useAuthStore(
      useShallow((state) => ({
        isAuthentication: state.isAuthentication,
        publicId: state.publicId,
      })),
    );
    const [loading, setLoading] = useState<boolean>(false);
    const handleClick = useCallback(() => {
      if (loading) return;
      if (
        authentication &&
        boardGameId != null &&
        authentication.isAuthentication &&
        authentication.publicId !== null
      ) {
        const fetch = async () => {
          setLoading(true);
          try {
            const res = await cartService.Add(
              "v1/Cart/addOrUpdate",
              {
                publicId: authentication.publicId,
                boardgameId: boardGameId,
                isIncrease: true
              },
            );
            useToastNotification.getState().add({
              text: res?.message ,
              type: "success",
            });
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
          className={` navbar-link w-auto hover:bg-(--main-color) ${cartSize < 20 && "p-1"} hover:text-white duration-100 `}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {loading ? (
            <>
              <div
                className={`animate-spin border-2 border-mist-300 border-t-mist-600 aspect-square ${cartSize < 20 ? "w-3" : "w-6"} rounded-full`}
              />
            </>
          ) : (
            <>
              <ShoppingCart size={cartSize}></ShoppingCart>
            </>
          )}
        </div>
      </>
    );
  },
);
