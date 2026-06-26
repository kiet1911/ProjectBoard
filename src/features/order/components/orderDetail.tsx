import { useShallow } from "zustand/shallow";
import { useOrderDetailComponent } from "../stores/orderDetail";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../../services/order.service";
import type { OrderDetail } from "../../../types/orderCustomType";
import { CurrencyConvert } from "../../ProductionCard/utilities/currencyConverter";
import { enumStoreOrder } from "../../../types/enumStore";

export default function OrderDetail() {
  const isOpen = useOrderDetailComponent(
    useShallow((state) => state.Config.isOpen),
  );
  const dataOrder = useOrderDetailComponent(
    useShallow((state) => state.Config.data),
  );
  const handleClear = useOrderDetailComponent((state) => state.Clear);
  useEffect(() => {
    return () => {
      handleClear();
    };
  }, []);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["order-detail", dataOrder?.PublicId, dataOrder?.OrderId],

    queryFn: async () => {
      const res = await orderService.GetOrderDetail("v1/Order/Detail", {
        PublicId: dataOrder!.PublicId,
        OrderId: dataOrder!.OrderId,
      });
      return res.data.data;
    },

    enabled: isOpen && !!dataOrder?.PublicId && !!dataOrder?.OrderId,

    staleTime: 1000 * 60 * 5,
    throwOnError: false,
  });
  const status = useMemo(() => {
    if (data && typeof data.status === "number") {
      return enumStoreOrder(data.status);
    }
  }, [data]);

  useEffect(() => {
    // if (data) {
    //   console.log(data);
    // }
  }, [data, isFetching]);

  useEffect(() => {
    if (error) {
      handleClear();
    }
  }, [error, handleClear]);

  return (
    <>
      {data && (
        <div className="fixed max-w-full w-full h-full backdrop-blur-lg z-50 top-0 flex justify-center items-center ">
          <div className="bg-white mx-auto p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 h-full overflow-auto max-xl:scale-90 relative">
            <div className="flex justify-between items-center mb-6 sticky -top-7 left-0 bg-white border border-gray-50/70 p-2">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="bg-(--main-color) w-1 h-8 rounded-full"></span>
                Order Detail
              </h1>

              <button
                onClick={handleClear}
                className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50"
              >
                Close
              </button>
            </div>

            {/* Recipient Information */}
            <div className="mb-6 p-4 bg-gray-50/70 rounded-xl border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                Recipient Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Full Name
                  </label>

                  <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white">
                    {data.nameRecipient}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Phone Number
                  </label>

                  <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white">
                    {data.phone}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Delivery Address
                  </label>

                  <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white">
                    {data.address}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Order Notes
                  </label>

                  <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white min-h-16">
                    {data.note || "-"}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    URL Payment
                  </label>
                  <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white min-h-0">
                    <a
                      href={data.urlVnPay || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" line-clamp-1"
                    >
                      {data.urlVnPay || "-"}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50/50">
              <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100/80 p-3 text-sm font-semibold text-gray-600 border-b border-gray-200">
                <div className="col-span-5">Products</div>
                <div className="col-span-3 text-center">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total amount</div>
              </div>

              <div className="divide-y divide-gray-200 max-h-50 overflow-auto">
                {data.orderItems.map((item: any, index: number) => (
                  <div
                    key={`${item.boardGame.name}-${index}`}
                    className="p-3 md:p-4 flex flex-col gap-1 md:grid md:grid-cols-12 md:gap-4 items-start md:items-center bg-white hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3 w-full md:col-span-5">
                      <img
                        src={
                          item.boardGame.boardGameImage?.[0]?.imageUrl ??
                          "/Suspense/SuspenseImage.png"
                        }
                        alt={item.boardGame.name}
                        className="w-12 h-12 object-cover rounded-lg shrink-0 border border-gray-100"
                      />

                      <span className="truncate font-medium text-gray-800">
                        {item.boardGame.name}
                      </span>
                    </div>

                    <div className="md:col-span-3 text-center text-gray-600 w-full max-md:flex max-md:justify-between">
                      <span className="md:hidden">Unit Price:</span>
                      <span>
                        {CurrencyConvert({
                          value: item.unitPrice,
                        })}
                        đ
                      </span>
                    </div>

                    <div className="md:col-span-2 flex justify-center w-full max-md:justify-between">
                      <span className="md:hidden">Quantity:</span>
                      <span className="px-4 py-1 border border-gray-300 rounded-lg bg-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="hidden md:block md:col-span-2 text-right font-medium text-(--main-color)">
                      {CurrencyConvert({
                        value: item.unitPrice * item.quantity,
                      })}
                      đ
                    </div>

                    <div className="md:hidden w-full flex justify-between mt-2 pt-2 border-t border-gray-100 text-sm">
                      <span>Total amount:</span>

                      <span className="font-medium text-(--main-color)">
                        {CurrencyConvert({
                          value: item.unitPrice * item.quantity,
                        })}
                        đ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 border-t border-gray-200 pt-4 space-y-2 bg-gray-50/60 p-4 rounded-xl">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order ID</span>

                <span className="font-medium">{data.id}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Created At</span>

                <span className="font-medium">
                  {new Date(data.created_at).toLocaleString("vi-VN")}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Status</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-lg border border-mist-900/20 px-3 py-1 text-xs font-semibold ${status?.color}`}
                >
                  <span className="h-2 w-2 rounded-full bg-current"></span>
                  {status?.text}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Status</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-lg border border-mist-900/20 px-3 py-1 text-xs font-semibold ${
                    data.isSuccessDelivery
                      ? "text-green-600"
                      : "text-yellow-600"
                  }  `}
                >
                  {data.status == 0 || data.status == 2
                    ? "Not Confirmed"
                    : data.isSuccessDelivery
                      ? "Delivered"
                      : "Processing"}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-800 border-t border-gray-300 pt-3 mt-1">
                <span>Total</span>

                <span className="text-(--main-color) text-xl">
                  {CurrencyConvert({
                    value: data.totalPrice,
                  })}
                  đ
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
