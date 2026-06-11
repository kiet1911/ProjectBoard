import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { cartService } from "../../../services/cart.service";
import useAuthStore from "../../../store/authentication/authState";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  ResponseCartItems,
  ResponseGetByUserId,
} from "../../../types/responseCustomType";
import CartItems from "./cartItems";

export default function CartList() {
  const publicId = useAuthStore((state) => state.publicId);
  const { data, error, isLoading } = useQuery({
    queryKey: ["users_cart"],
    queryFn: async () => {
      const data = await cartService.GetByUserId("v1/Cart/id", publicId!);
      return data;
    },
    staleTime: 5000,
  });
  const isResponseCartItems = useCallback(
    (input: any): input is ResponseGetByUserId =>
      input && input.status !== undefined && input.cartItems !== undefined,
    [data],
  );
  const [marginRight, setMarginRight] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const res = isResponseCartItems(data);

    if (res) {
      // console.log(res);
    }
  }, [data]);

  useEffect(() => {
    if (!divRef || !divRef.current) return;

    //
    const observation = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const hasScrollBar =
        entry.target.scrollHeight > entry.target.clientHeight;
      setMarginRight(hasScrollBar);
      console.log(divRef.current!.offsetWidth - divRef.current!.clientWidth);
    });
    observation.observe(divRef.current);

    return () => {
      observation.disconnect();
    };
  }, []);

  return (
    <>
      <div className="w-full flex md:flex-row flex-col p-2 gap-4 box-border overflow-hidden">
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
              />
            </li>

            <li className="flex-2 md:flex-1 min-w-0 truncate">
              <span>Product</span>
            </li>

            <li className="hidden md:flex flex-1 justify-center truncate">
              <span>Price</span>
            </li>

            <li className="hidden md:flex flex-1 justify-center truncate">
              <span>Quantity</span>
            </li>

            <li className="hidden md:flex flex-1 justify-center truncate">
              <span>Total</span>
            </li>

            <li className="w-10 shrink-0 flex justify-center">
              <button
                type="button"
                className="p-2 hover:bg-mist-300 hover:cursor-pointer rounded-xl transition-colors duration-300 flex items-center justify-center"
              >
                <Trash2 size={16} />
              </button>
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
                data.cartItems.length > 0 ? (
                  <div className="w-full flex flex-col gap-2 box-border">
                    {data.cartItems.map((item: ResponseCartItems) => (
                      <CartItems
                        key={item.id}
                        data={item}
                        publicId={publicId}
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

        <div className="border border-mist-900/10 bg-mist-100 rounded-xl p-4 box-border min-w-50 min-h-50"></div>
      </div>
    </>
  );
}
