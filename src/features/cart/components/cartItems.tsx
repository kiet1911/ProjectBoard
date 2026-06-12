import { useNavigate } from "react-router-dom";
import type { OrderSummary, ResponseCartItems } from "../../../types/responseCustomType";
import { Suspense, useCallback, useState } from "react";
import { CurrencyConvert } from "../../ProductionCard/utilities/currencyConverter";
import { Trash2 } from "lucide-react";
import { cartService } from "../../../services/cart.service";
import { useToastNotification } from "../../../store/notification/notification";
import { useQueryClient } from "@tanstack/react-query";
export default function CartItems({
  data,
  publicId,
  handleCheckBox
}: {
  data: OrderSummary;
  publicId: string | null;
  handleCheckBox: (id:string)=>void
}) {
  const navigation = useNavigate();
  const notification = useToastNotification((state) => state.add);
  const clientQuery = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const handleChangeQuantity = useCallback(
    (x: boolean) => {
      if (data && publicId) {
        if (loading) {
          notification({
            text: "Process is loading, deny spam",
            type: "information",
          });
          return;
        }
        const fetch = async () => {
          try {
            setLoading(true);
            const res = await cartService.Add("v1/Cart/addOrUpdate", {
              publicId: publicId,
              isIncrease: x,
              boardgameId: data.id,
            });
            // console.log(res);
            if (res && res.message && String(res.status) == "200") {
              notification({ text: res.message, type: "success" });
              //trigger rerender cache parent cart
              clientQuery.invalidateQueries({ queryKey: ["users_cart"] });
            }
          } catch (error) {
            useToastNotification
              .getState()
              .add({ text: String(error), type: "error" });
          } finally {
            setTimeout(() => {
              setLoading(false);
            }, 500);
          }
        };
        fetch();
      }
    },
    [data, publicId, loading],
  );
  const handleDeleteItem = useCallback(() => {
    if (data && publicId) {
      const fetch = async () => {
        try {
          const res = await cartService.Remove("v1/Cart/Id", {
            publicId: publicId,
            boardgameId: data.id,
          });
          // console.log(res);
          if (res && res.message && String(res.status) == "200") {
            notification({ text: res.message, type: "success" });
            //trigger rerender cache parent cart
            clientQuery.invalidateQueries({ queryKey: ["users_cart"] });
          }
        } catch (error) {
          useToastNotification
            .getState()
            .add({ text: String(error), type: "error" });
        }
      };
      fetch();
    }
  }, [data]);

  if (!data) {
    return <></>;
  }
  return (
    <ul
      className={`first:rounded-tl-2xl first:rounded-tr-2xl last:rounded-bl-2xl last:rounded-br-2xl border border-mist-900/10 bg-mist-100 w-full min-h-20 flex items-center px-0.5 py-2 text-sm max-md:text-xs`}
      key={data.id}
    >
      <li className="flex items-center px-2">
        <input
          type="checkbox"
          name={`check-${data.id}`}
          id={`check-${data.id}`}
          className="w-4 h-4"
          checked={data.checkBox}
          onChange={()=>{handleCheckBox(data.id)}}
        />
      </li>

      <li
        className="flex flex-1 items-center gap-3 min-w-0"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (data?.id) {
            navigation(`/product/${data?.id}`, {
              state: { data: data },
            });
          }
        }}
      >
        <Suspense
          fallback={
            <div className="w-16 h-16 shrink-0">
              <img
                src="./Suspense/SuspenseImage.png"
                alt="loading"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          }
        >
          <div className="w-16 h-16 shrink-0">
            <img
              src="./Suspense/SuspenseImage.png"
              alt={data.name}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </Suspense>

        <span
          className="flex-1 truncate font-medium text-left max-md:flex max-md:flex-col max-md:justify-between gap-5"
          title={data.name}
        >
          <span>{data.name}</span>
          <span className=" md:hidden">
            {CurrencyConvert({
              value: data?.base_Price ?? 0,
            })}
            đ
          </span>
        </span>
      </li>

      <li className="hidden md:flex flex-1 justify-center">
        <span>
          {CurrencyConvert({
            value: data?.base_Price ?? 0,
          })}
          đ
        </span>
      </li>

      <li className="flex flex-1 justify-center">
        <div className="flex items-center gap-3 border border-mist-900/20 rounded-lg px-2 py-1">
          <button
            type="button"
            className="w-6 h-6 flex items-center justify-center pb-0.5 hover:bg-mist-300 duration-300 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleChangeQuantity(false);
            }}
          >
            -
          </button>

          <span>{data.quantity}</span>

          <button
            type="button"
            className="w-6 h-6 flex items-center justify-center pb-0.5 hover:bg-mist-300 duration-300 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleChangeQuantity(true);
            }}
          >
            +
          </button>
        </div>
      </li>

      <li className="hidden md:flex flex-1 justify-center text-(--main-color)">
        <span>
          {CurrencyConvert({
            value: Number(data?.base_Price ?? 0) * Number(data?.quantity ?? 0),
          })+" đ"}
          
        </span>
      </li>

      <li className="flex justify-end px-2">
        <button
          type="button"
          className="p-2 hover:bg-mist-300 hover:cursor-pointer rounded-xl transition-colors duration-300"
          onClick={(e)=>{e.stopPropagation();e.preventDefault();handleDeleteItem();}}
        >
          <Trash2 size={18} />
        </button>
      </li>
    </ul>
  );
}
