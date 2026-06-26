import { CheckCheck, Form, MessageCircleXIcon } from "lucide-react";
import { enumStoreOrder } from "../../../types/enumStore";
import type { ResponseOrderItems } from "../../../types/responseCustomType";
import { CurrencyConvert } from "../../ProductionCard/utilities/currencyConverter";
import useAuthStore from "../../../store/authentication/authState";
import { useShallow } from "zustand/shallow";
import { useCallback } from "react";
import { paymentService } from "../../../services/payment.service";
import { AxiosError } from "axios";
import { useToastNotification } from "../../../store/notification/notification";
import { useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../../services/order.service";
import type { OrderDetail } from "../../../types/orderCustomType";
import { useOrderDetailComponent } from "../stores/orderDetail";

export default function OrderItems({ data }: { data: ResponseOrderItems }) {
  const handleActiveOrderDetail = useOrderDetailComponent(
    useShallow((state) => state.Active),
  );
  const queryClient = useQueryClient();
  const publicId = useAuthStore(useShallow((state) => state.publicId));
  const isAuth = useAuthStore(useShallow((state) => state.isAuthentication));
  const status = enumStoreOrder(data.status);
  const handleTransaction = useCallback(async () => {
    if (publicId && isAuth) {
      try {
        const res = await paymentService.checkTransaction(
          "v1/Payment/TransactionStatus",
          { PublicId: publicId, OrderId: data.id },
        );
        console.log(res);
        useToastNotification.getInitialState().add({
          text: res.message || "Transaction checked successfully",
          type: "success",
        });

        await queryClient.invalidateQueries({ queryKey: ["user_orders"] });
        // console.log("Query đã được refetch xong!");
      } catch (error) {
        if (error instanceof AxiosError) {
          // console.log(error.response?.data.message);
          useToastNotification.getInitialState().add({
            text:
              error.response?.data.message +
              "wait for 2 minutes to action again",
            type: "error",
          });
        } else {
          // console.log(error);
          useToastNotification
            .getInitialState()
            .add({ text: "An unexpected error occurred", type: "error" });
        }
      }
    }
  }, [publicId]);
  const handleDetailOrder = useCallback(async () => {
    if (publicId && isAuth) {
      try {
        handleActiveOrderDetail({PublicId:publicId,OrderId:data.id})
        // const res = await orderService.GetOrderDetail("v1/Order/Detail",{PublicId: publicId, OrderId: data.id});
        // if(res.data && res.data.data && res.data.data as OrderDetail){
        //   console.log(res.data.data);
        // }
      } catch (error) {
        console.log(error);
      }
    }
  }, [publicId]);
  return (
    <article
      key={data.id}
      className="w-full rounded-2xl border border-mist-900/10 bg-mist-100 px-4 py-3 shadow-sm transition hover:shadow-md"
    >
      <dl className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center text-sm max-md:text-xs">
        <div>
          <dt className="mb-1 text-xs text-gray-500">Order ID</dt>
          <dd>
            <span className="inline-flex rounded-lg bg-mist-400/30 px-3 py-1 font-medium">
              {data.id}
            </span>
          </dd>
        </div>

        <div>
          <dt className="mb-1 text-xs text-gray-500">Total</dt>
          <dd className="font-semibold text-(--main-color)">
            {CurrencyConvert({
              value: Number(data.totalPrice),
            })}
            {" đ"}
          </dd>
        </div>

        <div>
          <dt className="mb-1 text-xs text-gray-500">Status</dt>
          <dd>
            <span
              className={`inline-flex items-center gap-1 rounded-lg border border-mist-900/20 px-3 py-1 text-xs font-semibold ${status.color}`}
            >
              <span className="h-2 w-2 rounded-full bg-current"></span>
              {status.text}
            </span>
          </dd>
        </div>

        <div>
          <dt className="mb-1 text-xs text-gray-500">Delivery</dt>
          <dd
            className={`font-medium ${
              data.isSuccessDelivery ? "text-green-600" : "text-yellow-600"
            }  `}
          >
            {data.status == 0 || data.status == 2
              ? "Not Confirmed"
              : data.isSuccessDelivery
                ? "Delivered"
                : "Processing"}
          </dd>
        </div>

        <div>
          <dt className="mb-1 text-xs text-gray-500 md:text-end md:mr-3">
            Actions
          </dt>

          <dd className="flex flex-wrap justify-start md:justify-end gap-2">
            <button
              className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-mist-200 transition"
              onClick={handleDetailOrder}
            >
              <Form size={18} />
              <span className="hidden lg:inline">Details</span>
            </button>
            {data.status == 0 && (
              <>
                <button
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-mist-200 transition"
                  onClick={handleTransaction}
                >
                  <CheckCheck size={18} />
                  <span className="hidden lg:inline">Transaction</span>
                </button>
              </>
            )}
            {/* <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-500 hover:bg-red-50 transition">
              <MessageCircleXIcon size={18} />
              <span className="hidden lg:inline">Cancel Request</span>
            </button> */}
          </dd>
        </div>
      </dl>
    </article>
  );
}
