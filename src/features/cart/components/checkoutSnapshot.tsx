import { useShallow } from "zustand/shallow";
import { useCheckOutComponent } from "../../../store/preCheckout/checkout";
import {
  useEffect,
  useState,
} from "react";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../../services/order.service";
import { CheckBill } from "./checkbill";

export default function CheckoutSnapshot() {
  const isCheckOut = useCheckOutComponent(
    useShallow((state) => state.config.isCheckout),
  );
  const dataOrderSummary = useCheckOutComponent(
    useShallow((state) => state.config.cartItems),
  );
  const [active, setActive] = useState<boolean>(isCheckOut);
  const [cartItems, setCartItems] = useState<[] | undefined>();
  const [cartToken, setCartToken] = useState<string>();
  const { data, isFetching, isError } = useQuery({
    queryKey: ["checkout"],
    queryFn: async () => {
      if (dataOrderSummary?.length) {
        const res = await orderService.SnapShotOrderItem(
          "v1/Order/SnapShotOrderItem",
          dataOrderSummary,
        );
        return res;
      } else {
        return null;
      }
    },
    enabled: active,
    retry: 0,
    refetchOnWindowFocus: false,
    gcTime: 0,
  });
  const handleClear = useCheckOutComponent(useShallow((state) => state.clear));
  useEffect(() => {
    if (!isError && data && !isFetching) {
      console.log(data);
      if (data.cartItems) {
        setCartItems(data.cartItems);
      }
      if(data.token){
        setCartToken(data.token);
      }
    }
  }, [data]);
  //set up active
  useEffect(() => {
    setActive(isCheckOut);
    // console.log(dataOrderSummary);
  }, [isCheckOut]);

  //unmount trigger
  useEffect(() => {
    return () => {
      handleClear();
    };
  }, []);

  return (
    <>
      <div
        className={`absolute w-full h-full py-2 px-2 top-0 left-0 z-2 flex flex-col justify-between items-center-safe backdrop-blur-xs transition-opacity duration-500 ${active ? "opacity-100 visible" : "opacity-0 invisible"} `}
      >
        <div
          onClick={() => handleClear()}
          className="border border-mist-500/50 rounded-full p-0 absolute top-3 right-5 flex justify-end-safe self-end-safe hover:cursor-pointer"
        >
          <X
            size={16}
            className=" text-mist-400 hover:bg-mist-400 hover:text-white rounded-full p-1 duration-500 transition-all"
          ></X>
        </div>
        {isFetching ? (
          <>
            <div
              className={`animate-spin border-2 border-mist-300 border-t-mist-600 aspect-square w-10 rounded-full`}
            ></div>
          </>
        ) : (
          <>
            {isError ? (
              <>error</>
            ) : (
              <>
                {cartItems ? (
                  <CheckBill cartItems={cartItems!} cartToken={cartToken} handleClear={handleClear}></CheckBill>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
