import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useState,
  type BaseSyntheticEvent,
} from "react";
import type { BookingDTO } from "../../stores/serivcesType";
import { booking_service_dashboard } from "../../services/booking.service";
import { LoadingBox } from "../../../../../components/LoadingBox";
import {
  enumStoreBookingStatusConvertToNumber,
  enumStoreBookingStatusConvertToString,
} from "../../../../../types/enumStore";
import { ArrowDownCircleIcon } from "lucide-react";
import {
  useAlertNotification,
  useConfirmContent,
  useToastNotification,
} from "../../../../../store/notification/notification";
import { useShallow } from "zustand/shallow";
import { AxiosError } from "axios";
import { useUpdateContainer } from "../../stores/updateContainer";

export default function UpdateForm({
  params,
  gridApi,
}: {
  params: { id: string };
  gridApi: () => void;
}) {
  const query = useQueryClient();
  const [form, setForm] = useState<BookingDTO | undefined>(undefined);
  const closeUpdateForm = useUpdateContainer(
    useShallow((state) => state.close),
  );
  const confirm = useConfirmContent(useShallow((state) => state.active));
  const popUpNotification = useAlertNotification(
    useShallow((state) => state.setText),
  );
  const toast = useToastNotification(useShallow((state) => state.add));
  // const [responseStatus, setResponseStatus] = useState<null | string>(null);
  const [reject, SetReject] = useState<null | string>(null);
  const onHandleChangeStatusMutation = useMutation({
    mutationFn: async (booking: {
      id: string;
      status: number;
      rejectReason?: string;
    }) => {
      if (booking.id != null && booking.status != null) {
        const res = await booking_service_dashboard.BookingStatusChange({
          id: booking.id,
          bookingStatus: booking.status,
          rejectionReason: booking.rejectReason,
        });
        return res;
      }
      return await Promise.reject(
        "Booking id and booking status were not found.",
      );
    },
    onSuccess: (config) => {
      // console.log(config.message);
      if (config.message != null) {
        toast({
          text: config.message,
          type: "success",
        });
      }
      gridApi();
      closeUpdateForm();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // console.log(error.response?.data);
        toast({
          text: error.response?.data ?? "Error: something when wrong.",
          type: "error",
        });
      } else {
        toast({
          text: "Error: something when wrong.",
          type: "error",
        });
      }
    },
  });
  const onHandleChangeReject = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value) {
        SetReject(e.target.value);
      }
    },
    [reject],
  );
  const onHandleChangeStatus = useCallback(
    (x: number) => {
      if (form && form.id && x != null) {
        onHandleChangeStatusMutation.mutate({
          id: form.id,
          status: x,
          rejectReason: reject ?? "",
        });
      }
    },
    [params.id, form, reject],
  );
  const actionArr = [
    {
      name: "Confirm", //when pending and date now < date booking
      action: async (e: BaseSyntheticEvent) => {
        const confirmAction = await confirm(
          `Are you sure you want to ${e.target.name}`,
        );
        if (confirmAction && e.target.name) {
          if (form?.status != null && form?.bookingTime) {
            let status = enumStoreBookingStatusConvertToString(form.status);
            let time = new Date(form.bookingTime);
            if (status?.name.toLowerCase() !== "pending" || time < new Date()) {
              popUpNotification(
                "Error: status booking was not pending not allow to change, or the booking period has now expired.",
              );
            } else {
              // onHandleChangeStatus(String(e.target.name));
              onHandleChangeStatus(
                enumStoreBookingStatusConvertToNumber("Confirmed"),
              );
            }
          } else {
            popUpNotification(
              "Error: status booking or time booking was not found.",
            );
          }
        }

        if (!e.target.name) {
          popUpNotification(
            "Your button action is not valid or get some error name button.",
          );
        }
      },
    },
    {
      name: "Reject", // when pending or confirm , situation -> booking out time or not come you can reject bc not come ->
      action: async (e: BaseSyntheticEvent) => {
        const confirmAction = await confirm(
          `Are you sure you want to ${e.target.name} ?`,
        );
        if (confirmAction && e.target.name) {
          if (form?.status != null && form?.bookingTime) {
            let status = enumStoreBookingStatusConvertToString(form.status);
            if (
              status?.name.toLowerCase() == "confirmed" ||
              status?.name.toLowerCase() == "pending"
            ) {
              onHandleChangeStatus(
                enumStoreBookingStatusConvertToNumber("Rejected"),
              );
            } else {
              popUpNotification(
                "Error: status booking was not pending or confirmed not allow to change.",
              );
            }
          } else {
            popUpNotification(
              "Error: status booking or time booking was not found.",
            );
          }
        }

        if (!e.target.name) {
          popUpNotification(
            "Your button action is not valid or get some error name button.",
          );
        }
      },
    },
    {
      name: "Arrived", // when only confirm ->
      action: async (e: BaseSyntheticEvent) => {
        const confirmAction = await confirm(
          `Are you sure you want to ${e.target.name}`,
        );
        if (confirmAction && e.target.name) {
          if (form?.status != null && form?.bookingTime) {
            let status = enumStoreBookingStatusConvertToString(form.status);
            if (status?.name.toLowerCase() == "confirmed") {
              onHandleChangeStatus(
                enumStoreBookingStatusConvertToNumber("Arrived"),
              );
            } else {
              popUpNotification(
                "Error: status booking was not confirmed not allow to change.",
              );
            }
          } else {
            popUpNotification(
              "Error: status booking or time booking was not found.",
            );
          }
        }

        if (!e.target.name) {
          popUpNotification(
            "Your button action is not valid or get some error name button.",
          );
        }
      },
    },
    {},
  ];
  const response = useQuery({
    queryKey: ["data_booking", params.id],
    queryFn: async () => {
      if (params.id != undefined) {
        const res = await booking_service_dashboard.Booking(params.id);
        return res.data;
      }
      return Promise.reject("error");
    },
    retry: 0,
    refetchOnWindowFocus: false,
    // staleTime: 60 * 10 * 1000,
  });
  useEffect(() => {
    // console.log(response.data);
    if (response.data) {
      setForm((state) => (state = response.data));
      SetReject((state) => (state = response.data.rejectionReason ?? ""));
    }
  }, [response.data, response.isPending]);
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
            <>
              <div key={params.id} className={`w-full`}>
                <div className="w-full flex flex-col gap-2 px-1 items-center justify-center font-medium">
                  <h1 className="text-xl font-medium flex gap-2 justify-center items-center ">
                    Update Booking information{" "}
                    <a href="#sectionAction" className=" animate-bounce mt-2">
                      <ArrowDownCircleIcon size={20}></ArrowDownCircleIcon>
                    </a>
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
                    <div
                      key={params.id}
                      className={`w-full flex flex-row gap-2`}
                    >
                      <div className="w-fit flex-1">
                        <div
                          className={`w-full flex flex-row gap-2 h-100 overflow-auto scroll-auto`}
                        >
                          <div className="w-full flex-1">
                            <fieldset className="w-full flex flex-col gap-4 px-1 py-1 font-medium">
                              {/* <legend className="text-xl font-medium">
                                Booking information
                              </legend> */}

                              <fieldset className="w-full border rounded p-3">
                                <legend className="px-2 font-medium">
                                  Customer
                                </legend>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                                  {/* Name */}
                                  <div className="w-full flex flex-col gap-1">
                                    <label className="text-left" htmlFor="Name">
                                      Name:
                                    </label>

                                    <input
                                      type="text"
                                      name="Name"
                                      id="Name"
                                      className="w-full p-1 border rounded font-normal"
                                      value={form.name ?? "NaN"}
                                      readOnly
                                    />
                                  </div>

                                  {/* Phone */}
                                  <div className="w-full flex flex-col gap-1">
                                    <label
                                      className="text-left"
                                      htmlFor="PhoneNumber"
                                    >
                                      Phone:
                                    </label>

                                    <input
                                      type="tel"
                                      name="PhoneNumber"
                                      id="PhoneNumber"
                                      className="w-full p-1 border rounded font-normal"
                                      value={form.phoneNumber ?? "NaN"}
                                      readOnly
                                    />
                                  </div>

                                  {/* Email */}
                                  <div className="w-full flex flex-col gap-1 md:col-span-2">
                                    <label
                                      className="text-left"
                                      htmlFor="Email"
                                    >
                                      Email:
                                    </label>

                                    <input
                                      type="email"
                                      name="Email"
                                      id="Email"
                                      className="w-full p-1 border rounded font-normal"
                                      value={form.email ?? "NaN"}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </fieldset>

                              <fieldset className="w-full border rounded p-3">
                                <legend className="px-2 font-medium">
                                  Booking
                                </legend>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                                  {/* Booking Time */}
                                  <div className="w-full flex flex-col gap-1 md:col-span-2">
                                    <label
                                      className="text-left"
                                      htmlFor="BookingTime"
                                    >
                                      Booking Time:
                                    </label>

                                    <input
                                      type="datetime-local"
                                      name="BookingTime"
                                      id="BookingTime"
                                      className="w-full p-1 border rounded font-normal"
                                      value={form.bookingTime ?? ""}
                                      readOnly
                                    />
                                  </div>

                                  {/* Min Player */}
                                  <div className="w-full flex flex-col gap-1">
                                    <label
                                      className="text-left"
                                      htmlFor="MinPlayers"
                                    >
                                      Min Player:
                                    </label>

                                    <input
                                      type="number"
                                      name="MinPlayers"
                                      id="MinPlayers"
                                      className="w-full p-1 border rounded font-normal"
                                      value={form.minPlayers ?? "NaN"}
                                      readOnly
                                    />
                                  </div>

                                  {/* Max Player */}
                                  <div className="w-full flex flex-col gap-1">
                                    <label
                                      className="text-left"
                                      htmlFor="MaxPlayers"
                                    >
                                      Max Player:
                                    </label>

                                    <input
                                      type="number"
                                      name="MaxPlayers"
                                      id="MaxPlayers"
                                      className="w-full p-1 border rounded font-normal"
                                      value={form.maxsPlayers ?? "NaN"}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </fieldset>

                              <fieldset className="w-full border rounded p-3">
                                <legend className="px-2 font-medium">
                                  Game
                                </legend>

                                <div className="flex flex-col gap-3">
                                  {/* Game Reservation */}
                                  <div className="w-full flex flex-col gap-1">
                                    <label
                                      className="text-left"
                                      htmlFor="GameReservation"
                                    >
                                      Game Reservation:
                                    </label>

                                    <textarea
                                      id="GameReservation"
                                      name="GameReservation"
                                      rows={2}
                                      className="w-full p-1 border rounded resize-none font-normal"
                                      value={form.gameReservation ?? "NaN"}
                                      readOnly
                                    />
                                  </div>

                                  {/* Game Type */}
                                  <div className="w-full flex flex-col gap-1">
                                    <label
                                      className="text-left"
                                      htmlFor="GameType"
                                    >
                                      Game Type:
                                    </label>

                                    <textarea
                                      id="GameType"
                                      name="GameType"
                                      rows={2}
                                      className="w-full p-1 border rounded resize-none font-normal"
                                      value={form.gameType ?? "NaN"}
                                      readOnly
                                    />
                                  </div>

                                  {/* Note */}
                                  <div className="w-full flex flex-col gap-1">
                                    <label className="text-left" htmlFor="Note">
                                      Note:
                                    </label>

                                    <textarea
                                      id="Note"
                                      name="Note"
                                      rows={2}
                                      className="w-full p-1 border rounded resize-none font-normal"
                                      value={form.note ?? "NaN"}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </fieldset>

                              <fieldset className="w-full border rounded p-3">
                                <legend className="px-2 font-medium">
                                  Status
                                </legend>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                                  {/* Status */}
                                  <div className="flex flex-col gap-1">
                                    <label className="text-left">Status:</label>

                                    <div className="min-h-9 flex items-center">
                                      <span
                                        className="inline-flex items-center gap-1 rounded-lg border border-mist-900/20 px-3 py-1 text-xs font-semibold"
                                        style={{
                                          color:
                                            form.status != null
                                              ? enumStoreBookingStatusConvertToString(
                                                  form.status,
                                                )?.color
                                              : "black",
                                        }}
                                      >
                                        <span className="h-2 w-2 rounded-full bg-current"></span>

                                        {form.status != null
                                          ? enumStoreBookingStatusConvertToString(
                                              form.status,
                                            )?.name
                                          : "NaN"}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Confirmed */}
                                  <div className="flex flex-col gap-1">
                                    <label className="text-left">
                                      Is Confirmed:
                                    </label>

                                    <div className="min-h-9 flex items-center">
                                      <span
                                        className={
                                          form.isConfirmed
                                            ? "text-green-500"
                                            : "text-red-500"
                                        }
                                      >
                                        {form.isConfirmed ? "Yes" : "No"}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Confirmed At */}
                                  <div className="flex flex-col gap-1 md:col-span-2">
                                    <label
                                      className="text-left"
                                      htmlFor="ConfirmedAt"
                                    >
                                      Confirmed At:
                                    </label>

                                    <input
                                      id="ConfirmedAt"
                                      type="datetime-local"
                                      className="w-full p-1 border rounded font-normal"
                                      value={form.confirmedAt ?? ""}
                                      readOnly
                                    />
                                  </div>

                                  {/* Rejection Reason */}
                                  <div className="flex flex-col gap-1 md:col-span-2">
                                    <label
                                      className="text-left"
                                      htmlFor="RejectionReason"
                                    >
                                      Rejection Reason:
                                    </label>

                                    <textarea
                                      id="RejectionReason"
                                      rows={2}
                                      className="w-full p-1 border rounded resize-none font-normal"
                                      value={reject ?? ""}
                                      onChange={onHandleChangeReject}
                                    />
                                  </div>

                                  {/* Deleted */}
                                  <div className="flex flex-col gap-1">
                                    <label className="text-left">
                                      Is Deleted:
                                    </label>

                                    <div className="min-h-9 flex items-center">
                                      <span
                                        className={
                                          form.isDeleted
                                            ? "text-green-500"
                                            : "text-red-500"
                                        }
                                      >
                                        {form.isDeleted ? "Yes" : "No"}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Deleted At */}
                                  <div className="flex flex-col gap-1">
                                    <label
                                      className="text-left"
                                      htmlFor="DeletedAt"
                                    >
                                      Deleted At:
                                    </label>

                                    <input
                                      id="DeletedAt"
                                      type="datetime-local"
                                      className="w-full p-1 border rounded font-normal"
                                      value={form.deleted_at ?? ""}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </fieldset>

                              <fieldset className="w-full border rounded p-3">
                                <legend className="px-2 font-medium">
                                  Action button
                                </legend>
                                <div
                                  id="sectionAction"
                                  className="flex flex-row gap-2 flex-wrap"
                                >
                                  {actionArr && actionArr.length > 0 ? (
                                    <>
                                      {actionArr.map((data, index) => {
                                        return (
                                          <fieldset
                                            key={"actionButton" + index}
                                          >
                                            {data &&
                                              data.name &&
                                              data.action && (
                                                <button
                                                  name={data.name}
                                                  key={data.name + index}
                                                  onClick={data.action}
                                                  className="navbar-link duration-200 hover:bg-red-500 hover:text-white"
                                                >
                                                  {" "}
                                                  {data.name}
                                                </button>
                                              )}
                                          </fieldset>
                                        );
                                      })}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </fieldset>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
