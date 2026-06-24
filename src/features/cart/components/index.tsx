import { useQuery } from "@tanstack/react-query";
import { cartService } from "../../../services/cart.service";
import useAuthStore from "../../../store/authentication/authState";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  OrderSummary,
  ResponseCartItems,
  ResponseGetByUserId,
} from "../../../types/responseCustomType";
import CartItems from "./cartItems";
import {
  useConfirmContent,
  useToastNotification,
} from "../../../store/notification/notification";
import { useCheckOutComponent } from "../../../store/preCheckout/checkout";
import CheckoutSnapshot from "./checkoutSnapshot";
import { useShallow } from "zustand/shallow";

export default function CartList() {
  const confirmBtn = useConfirmContent((state) => state.active);
  const checkoutConfig = useCheckOutComponent(useShallow((state) => ({active:state.active,clear:state.clear})));
  const handleToast = useToastNotification((state) => state.add);
  const publicId = useAuthStore((state) => state.publicId);
  const [orderSummary, setOrderSummary] = useState<OrderSummary[]>();
  const [marginRight, setMarginRight] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ["users_cart"],
    queryFn: async () => {
      const data = await cartService.GetByUserId("v1/Cart/id", publicId!);
      return data;
    },
    staleTime: 5000,
    retry:0
  });
  const isResponseCartItems = useCallback(
    (input: any): input is ResponseGetByUserId =>
      input && input.status !== undefined && input.cartItems !== undefined,
    [data],
  );
  useEffect(() => {
    if (!divRef || !divRef.current) return;
    //
    const observation = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const hasScrollBar =
        entry.target.scrollHeight > entry.target.clientHeight;
      setMarginRight(hasScrollBar);
    });
    observation.observe(divRef.current);

    return () => {
      observation.disconnect();
      checkoutConfig.clear();
    };
  }, []);
  useEffect(() => {
    // console.log(data);
    if (!data?.cartItems) return;
    setOrderSummary((prev) =>
      data.cartItems.map((item: ResponseCartItems) => ({
        ...item,
        checkBox: prev?.find((x) => x.id === item.id)?.checkBox ?? false,
      })),
    );
  }, [data]);

  const handleCheckItems = useCallback(
    (id: string) => {
      // console.log(id);
      if (!id || !orderSummary) return;
      const reCheck = orderSummary?.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            checkBox: !t.checkBox,
          };
        }
        return t;
      });
      setOrderSummary(reCheck);
    },
    [data, orderSummary],
  );

  const handlePrePareCheckOut = useCallback(async () => {
    const isActive = await confirmBtn("Do you want to checkout?");
    if (!isActive) return;

    if (
      !orderSummary?.some((data) => data.checkBox === true) ||
      orderSummary === undefined
    ) {
      console.log(isActive);
      handleToast({
        text: "There is none item be selected!",
        type: "warning",
      });
    } else {
      // trigger store checkout
      const parseOrderSummary = orderSummary
        ?.filter((data) => data.checkBox)
        .map((data) => ({ CartId: data.id, Quantity: Number(data.quantity) }));
      if (parseOrderSummary) {
        console.log(parseOrderSummary);
        checkoutConfig.active((parseOrderSummary));
      } else {
        handleToast({ text: "Can not parse item be selected!", type: "error" });
      }
    }
  }, [orderSummary]);

  return (
    <>
      <div className="w-full relative flex md:flex-row flex-col p-2 gap-4 box-border overflow-hidden">
        <div className="flex-3 w-full min-w-0 flex flex-col gap-2">
          <ul
            className={`border border-mist-900/10 bg-mist-100 rounded-xl w-full min-h-12 flex items-center px-3 gap-2 text-sm max-md:text-xs font-medium box-border ${
              marginRight ? "pr-7" : ""
            }`}
          >
            <li className="w-6 shrink-0 flex items-center">
              <input
                type="checkbox"
                name="checkAll"
                id="checkAll"
                className="w-4 h-4 cursor-pointer"
                onChange={(e) => {
                  setOrderSummary((state) => {
                    return state?.map((item) => ({
                      ...item,
                      checkBox: e.target.checked,
                    }));
                  });
                }}
              />
            </li>

            <li className="flex-2 md:flex-1 min-w-0 truncate">
              <span>Product</span>
            </li>

            <li className="hidden md:flex flex-1 justify-center truncate">
              <span>Unit Price</span>
            </li>

            <li className="hidden md:flex flex-1 justify-center truncate">
              <span>Quantity</span>
            </li>

            <li className="hidden md:flex flex-1 justify-center truncate">
              <span>Subtotal</span>
            </li>

            <li className="w-10 shrink-0 flex justify-center">
              <span>Actions</span>
            </li>
          </ul>

          <div
            ref={divRef}
            className="w-full py-0 space-y-2 flex flex-col justify-start items-center min-h-50 max-h-125 overflow-y-auto box-border"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-10 w-full">
                <div className="animate-spin border-4 border-slate-200 border-t-mist-500 h-10 w-10 rounded-full" />
              </div>
            ) : (
              <>
                {isResponseCartItems(data) &&
                data?.cartItems &&
                data.cartItems.length > 0 &&
                orderSummary ? (
                  <div className="w-full flex flex-col gap-2 box-border">
                    {orderSummary.map((item: OrderSummary) => (
                      <CartItems
                        key={item.id}
                        data={item}
                        publicId={publicId}
                        handleCheckBox={handleCheckItems}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-10 w-full text-slate-400 text-sm">
                    {!error && <p>No items found.</p>}
                  </div>
                )}
              </>
            )}

            {error && (
              <div className="w-full text-center py-4">
                <span className="text-(--main-color) text-sm font-medium">
                  Api Error: Network Error
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="border border-mist-900/10 bg-mist-100 rounded-xl p-2 py-3 box-border min-w-50 min-h-50 flex flex-col gap-2">
          <span className="text-2xl font-medium text-shadow-2xs/50 text-shadow-mist-500">
            Order summary
          </span>

          <div className="w-full border-b-2 border-b-mist-900/10 text-sm text-mist-900/50">
            <span className="">
              <span>
                ({orderSummary?.filter((data) => data.checkBox).length})
              </span>{" "}
              Recording Sessions{" "}
            </span>
          </div>
          <div className="w-full bg-(--main-color)/30 p-2 rounded flex flex-row justify-between items-center px-2 text-mist-900/50 text-sm font-bold">
            <span>subtotal </span>

            {(orderSummary ?? [])
              .filter((i) => i.checkBox)
              .reduce(
                (sum, i) =>
                  sum + Number(i.base_Price ?? 0) * Number(i.quantity ?? 0),
                0,
              )
              .toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
          </div>

          <button
            onClick={handlePrePareCheckOut}
            className="w-full border p-2 navbar-link flex justify-center bg-(--main-color) text-white text-sm font-medium"
          >
            <span>Prepare for CheckOut</span>
          </button>
        </div>

        <CheckoutSnapshot></CheckoutSnapshot>
      </div>
    </>
  );
}
