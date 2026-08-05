import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { LoadingBox } from "../../../../../components/LoadingBox";
import type {
  OrderDTO,
  OrderTransactionStatus,
} from "../../stores/serivcesType";
import {
  useConfirmContent,
  useToastNotification,
} from "../../../../../store/notification/notification";
import { useShallow } from "zustand/shallow";
import { order_service_dashboard } from "../../services/order.service";
import {
  enumStoreOrderStatusConvertToString,
  enumStoreOrderStatusTransactionConvert,
} from "../../../../../types/enumStore";
import { CurrencyConvert } from "../../../../ProductionCard/utilities/currencyConverter";
import { AxiosError } from "axios";

export default function UpdateForm({
  params,
  gridApi,
}: {
  params: { id: string };
  gridApi: () => void;
}) {
  const query = useQueryClient();
  const confirm = useConfirmContent(useShallow((t) => t.active));
  const notification = useToastNotification(useShallow((t) => t.add));
  const [form, setForm] = useState<Required<OrderDTO | undefined>>(undefined);
  const [responseStatus, setResponseStatus] = useState<null | string>(null);
  const response = useQuery({
    queryKey: ["data_orderBoardgames", params.id],
    queryFn: async () => {
      if (params.id != undefined) {
        const res = await order_service_dashboard.GetOrderById(params.id);
        return res.data;
      }
      return Promise.reject("error");
    },
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: 60 * 10 * 1000,
  });

  useEffect(() => {
    if (response.data && response.data.data && response.data.data[0]) {
      // console.log(response.data.data[0]);
      setForm(response.data.data[0]);
    }
  }, [response.data, response.isPending]);

  const handleStatusTransaction = useMutation({
    mutationFn: async () => {
      if (form && form.id) {
        const res = await order_service_dashboard.OrderTransactionStatus(
          form.id,
        );

        return res;
      }
      return Promise.reject("Guid order id is not found");
    },
    onSuccess: (config) => {
      if (config.data && config.data.data) {
        const data: OrderTransactionStatus = config.data.data;
        const stateStatus = enumStoreOrderStatusTransactionConvert(data);
        setResponseStatus(stateStatus);
        // console.log(config);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        notification({ text: error.response?.data.message, type: "error" });
        // console.log(error.response);
        return;
      }
      notification({ text: "Something when wrong!", type: "error" });
      // console.log(error);
      return;
    },
  });

  const handleChangeStatusTransaction = useMutation({
    mutationFn: async (x: string) => {
      if (form && form.id && x != null) {
        const res = await order_service_dashboard.OrderStateChange({
          id: form.id,
          orderState: x,
        });
        query.invalidateQueries({queryKey:["data_orderBoardgames", params.id]})
        return res;
      }
      return Promise.reject("Guid order id is not found");
    },
    onSuccess: (config) => {
      if (config.data && config.data.message) {
        notification({ text: config.data.message, type: "information" });
        gridApi();
        return;
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        notification({ text: error.response?.data.message, type: "error" });
        // console.log(error.response);
        return;
      }
      notification({ text: "Something when wrong!", type: "error" });
      // console.log(error);
      return;
    },
  });

  const handleChangeState = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (handleChangeStatusTransaction.isPending) {
      notification({ text: "Wait a second for continue!", type: "warning" });
      return;
    }
    const data = e.currentTarget.value;
    if (data) {
      handleChangeStatusTransaction.mutate(data);
    }
  };

  return (
    <>
      {response.isPending ? (
        <div className="relative w-full h-10">
          <LoadingBox></LoadingBox>
        </div>
      ) : (
        <>
          {response.isError ? (
            <span className="text-red-500 text-center"> Api Error </span>
          ) : (
            <div key={params.id} className={`w-full`}>
              <div className="w-full flex flex-col gap-2 px-1 items-center justify-center font-medium">
                <h1 className="text-xl font-medium ">
                  Update Order information
                </h1>
              </div>
              {form === undefined ? (
                <div>
                  <span className="text-blue-500 text-center">
                    Data is loading
                  </span>
                </div>
              ) : (
                <>
                  <div key={params.id} className={`w-full flex flex-row gap-2`}>
                    <div className="w-fit flex-1">
                      <fieldset className="border w-full flex flex-col gap-1 px-1 py-1 items-start justify-center font-medium">
                        <legend className=" font-medium ">
                          Order information
                        </legend>
                        <div className=" space-x-2 mt-2 w-full flex flex-row">
                          <label className="shrink-0">Order Id :</label>
                          <input
                            className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
                            type="text"
                            defaultValue={params.id.toString() ?? " "}
                            disabled={true}
                          />
                        </div>
                        <div className=" space-x-2 mt-2 w-full flex flex-row">
                          <label className="shrink-0" htmlFor="Id">
                            merchantRefNo :
                          </label>
                          <input
                            className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
                            type="text"
                            defaultValue={
                              form.merchantRefNo != null
                                ? form.merchantRefNo.toString()
                                : "NaN"
                            }
                            disabled={true}
                          />
                        </div>
                        <div className=" space-x-2 mt-2 w-full flex flex-row">
                          <label className="shrink-0" htmlFor="Id">
                            urlVnPay :
                          </label>
                          <input
                            className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
                            type="text"
                            defaultValue={
                              form.urlVnPay != null
                                ? form.urlVnPay.toString()
                                : "NaN"
                            }
                            disabled={true}
                          />
                        </div>
                        <div className=" space-x-2 mt-2 w-full flex flex-row flex-wrap gap-1">
                          <label className="shrink-0" htmlFor="Id">
                            Created at :
                          </label>
                          <input
                            className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
                            type="datetime-local"
                            defaultValue={
                              form.created_at != null
                                ? form.created_at.toString()
                                : "NaN"
                            }
                            disabled={true}
                          />
                        </div>
                        <div className=" space-x-2 mt-2 w-full flex flex-row flex-wrap gap-1">
                          <label className="shrink-0" htmlFor="Id">
                            Paid at :
                          </label>
                          <input
                            className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
                            type="datetime-local"
                            defaultValue={
                              form.paid_at != null
                                ? form.paid_at.toString()
                                : "NaN"
                            }
                            disabled={true}
                          />
                        </div>
                        <div className=" space-x-2 mt-2 w-full flex flex-row flex-wrap gap-1">
                          <label className="shrink-0" htmlFor="Id">
                            QueryDB transaction at :
                          </label>
                          <input
                            className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
                            type="datetime-local"
                            defaultValue={
                              form.queryDb_at != null
                                ? form.queryDb_at.toString()
                                : "NaN"
                            }
                            disabled={true}
                          />
                        </div>
                        <div className=" space-x-2 mt-2 w-full flex flex-row">
                          <label className="shrink-0">Status :</label>
                          <span
                            className={`inline-flex items-center gap-1 rounded-lg border border-mist-900/20 px-3 py-1 text-xs font-semibold`}
                            style={{
                              color:
                                form.status != null
                                  ? enumStoreOrderStatusConvertToString(
                                      form.status,
                                    )?.color
                                  : "black",
                            }}
                          >
                            <span className="h-2 w-2 rounded-full bg-current mt-0.5"></span>
                            {form.status != null
                              ? enumStoreOrderStatusConvertToString(form.status)
                                  ?.name
                              : "NaN"}
                          </span>
                        </div>
                        <div className=" space-x-2 mt-2 w-full flex flex-row">
                          <label className="shrink-0">
                            {" "}
                            Is Success Delivery:
                          </label>
                          <span
                            className={`inline-flex items-center gap-1 rounded-lg border border-mist-900/20 px-3 py-1 text-xs font-semibold`}
                            style={{
                              color:
                                form.status != null
                                  ? enumStoreOrderStatusConvertToString(
                                      form.status,
                                    )?.color
                                  : "black",
                            }}
                          >
                            <span className="h-2 w-2 rounded-full bg-current mt-0.5"></span>
                            {form.isSuccessDelivery != null
                              ? !form.isSuccessDelivery
                                ? "Not"
                                : "Done"
                              : "NaN"}
                          </span>
                        </div>
                      </fieldset>
                      <fieldset className="border w-full flex flex-col gap-1 px-1 py-1 items-start justify-center font-medium">
                        <legend className=" font-medium ">
                          Recipient information
                        </legend>
                        <div className=" space-x-2 mt-2 w-full flex flex-row">
                          <label className="shrink-0">Name recipient :</label>
                          <input
                            className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
                            type="text"
                            defaultValue={
                              form.nameRecipient != null
                                ? form.nameRecipient.toString()
                                : "NaN"
                            }
                            disabled={true}
                          />
                        </div>
                        <div className=" space-x-2 mt-2 w-full flex flex-row">
                          <label className="shrink-0">Phone recipient :</label>
                          <input
                            className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
                            type="phone"
                            defaultValue={
                              form.phone != null ? form.phone.toString() : "NaN"
                            }
                            disabled={true}
                          />
                        </div>
                        <div className=" space-x-2 mt-2 w-full flex flex-row">
                          <label className="shrink-0">
                            Address recipient :
                          </label>
                          <input
                            className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
                            type="text"
                            defaultValue={
                              form.address != null
                                ? form.address.toString()
                                : "NaN"
                            }
                            disabled={true}
                          />
                        </div>
                        <div className=" space-x-2 mt-2 w-full flex flex-row">
                          <label className="shrink-0">Note recipient :</label>
                          <textarea
                            defaultValue={form.note != null ? form.note : "NaN"}
                            className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
                            disabled={true}
                            readOnly
                          ></textarea>
                        </div>
                        <div className=" space-x-2 mt-2 w-full flex flex-row">
                          <label className="shrink-0">User public Id :</label>
                          <input
                            className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
                            type="text"
                            defaultValue={
                              form.public_id != null
                                ? form.public_id.toString()
                                : "NaN"
                            }
                            disabled={true}
                          />
                        </div>
                      </fieldset>
                    </div>
                    <div className="w-fit flex-1">
                      <fieldset className="border w-full flex flex-col gap-1 px-1 py-1 items-start justify-start font-medium">
                        <legend>Order items</legend>
                        <div className="p-1 overflow-y-auto max-h-100 w-full border space-y-1">
                          {form.games != null && form.games.length > 0 ? (
                            form.games.map((data, index) => {
                              return (
                                <div
                                  key={data.id}
                                  className="flex flex-row flex-wrap items-center gap-1 w-full"
                                >
                                  <img
                                    src={
                                      data.boardgameImages?.[0]?.img_Url ??
                                      "/public/Suspense/SuspenseImage.png"
                                    }
                                    alt={data.name || "alt_demo"}
                                    className="w-12 h-12 object-cover rounded-lg shrink-0 border border-gray-100"
                                  />
                                  <div className="flex-1 text-xs w-full whitespace-break-spaces wrap-break-word overflow-clip">
                                    {data.name ?? "NaN"}
                                  </div>
                                  <div className="border flex-1">
                                    {data.unitPrice != null
                                      ? CurrencyConvert({
                                          value: data.unitPrice,
                                        }) + " đ"
                                      : "NaN"}
                                  </div>
                                  <div className="border px-2 overflow-hidden">
                                    {data.quantity ?? "NaN"}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <>
                              <span>Error games not found ?</span>
                            </>
                          )}
                        </div>
                      </fieldset>

                      <fieldset className="border w-full flex flex-col gap-2 p-2 items-start justify-start font-medium">
                        <legend>Action</legend>
                        {/* <div className="p-1 overflow-y-auto max-h-100 w-full border space-y-1">
                        
                        </div> */}
                        {/* check status with api check transaction query db */}
                        <button
                          type="button"
                          onClick={() => {
                            handleStatusTransaction.mutate();
                          }}
                          className="navbar-link text-xs"
                        >
                          Check Transaction
                        </button>
                        {/* stats board from check status api  */}
                        <textarea
                          value={responseStatus || ""}
                          onChange={(e) => {
                            e.preventDefault();
                          }}
                          readOnly
                          placeholder="You cannot resize this text area."
                          className="resize-none w-full border p-1 rounded"
                        ></textarea>
                        {/* button change when status is confirm */}
                        {/* shipping status , when status is confirm , change is delivery status to false  */}
                        <div className="flex flex-row flex-wrap gap-2">
                          <button
                            type="button"
                            value={"Shipping"}
                            className="navbar-link text-xs"
                            onClick={handleChangeState}
                            disabled={handleChangeStatusTransaction.isPending}
                          >
                            Shipping
                          </button>
                          {/* delivery , when status is shipping , change is delivery status to true */}
                          <button
                            type="button"
                            value={"Delivered"}
                            className="navbar-link text-xs"
                            onClick={handleChangeState}
                          >
                            Delivered
                          </button>
                          {/* confirm , when status is shipping or delivery , change is delivery status to false */}
                          <button
                            type="button"
                            value={"Confirmed"}
                            className="navbar-link text-xs"
                            onClick={handleChangeState}
                          >
                            Confirmed
                          </button>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
