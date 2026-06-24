import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../../services/order.service";
import useAuthStore from "../../../store/authentication/authState";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
import type { ResponseOrderItems } from "../../../types/responseCustomType";
import OrderItems from "./orderItems";

export default function OrdersList() {
  const publicId = useAuthStore(useShallow((state) => state.publicId));
  const isAuth = useAuthStore(useShallow((state) => state.isAuthentication));
  const { error, data, isLoading } = useQuery({
    queryKey: ["user_orders"],
    queryFn: async () => {
      const res = await orderService.GetById("v1/Order/Id", publicId!);
      return res;
    },
    staleTime: 5000,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: isAuth,
  });

  useEffect(() => {
    // console.log(data);
  }, [data]);

  return (
    <>
      {isAuth && (
        <div className="w-full relative flex flex-col p-2 gap-2  ">
          <div className="max-md:hidden grid grid-cols-2 md:grid-cols-5 gap-4 rounded-2xl border border-mist-900/10 bg-mist-200 px-4 py-3 text-sm max-md:text-xs font-semibold text-gray-700 shadow-sm">
            <div>Order ID</div>

            <div>Total Price</div>

            <div className="hidden md:block">Status</div>

            <div className="hidden md:block">Delivery</div>

            <div className="text-right col-span-2 md:col-span-1">Actions</div>
          </div>
          <div className=" w-full py-0 space-y-0 flex flex-col justify-start items-center min-h-50 max-h-125 overflow-y-auto box-border mt-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-10 w-full">
                <div className="animate-spin border-4 border-slate-200 border-t-mist-500 h-10 w-10 rounded-full" />
              </div>
            ) : (
              <>
                {data && data?.listOrders && data.listOrders.length > 0 ? (
                  <div className="w-full flex flex-col gap-2 box-border">
                    {data.listOrders.map((item: ResponseOrderItems) => (
                      <OrderItems key={item.id} data={item}></OrderItems>
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
      )}
    </>
  );
}
