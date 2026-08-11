import { useShallow } from "zustand/shallow";
import useAuthStore from "../../../store/authentication/authState";
import { useQuery } from "@tanstack/react-query";
import { Client_Booking_Service } from "../services/client.booking.service";
import { LoadingBox } from "../../../components/LoadingBox";
import { enumStoreBookingStatusConvertToString } from "../../../types/enumStore";
import { useEffect } from "react";

export default function UserDetailBooking({
  bookingId,
}: {
  bookingId: string;
}) {
  const publicId = useAuthStore(useShallow((state) => state.publicId));
  const { data, isFetching, isError } = useQuery({
    queryKey: ["client_booking_detail", publicId ?? "NaN", bookingId ?? "NaN"],
    queryFn: async () => {
      const res = await Client_Booking_Service.UserBookingDetail({
        publicId: publicId,
        bookingId: bookingId,
      });
      return res;
    },
    retry: 0,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    staleTime: 1000 * 4 * 60,
  });
  useEffect(()=>{
    document.body.style.overflow = "hidden"

    return ()=>{
        document.body.style.overflow = "unset"
    }
  },[])

  return (
    <>
      {publicId && bookingId ? (
        <>
          {isFetching ? (
            <>
              <div className=" relative w-full h-10">
                {isError ? (
                  <div className="text-red-500 text-center">
                    <span>
                      Get error when fetching data, please restart again.
                    </span>
                  </div>
                ) : (
                  <LoadingBox></LoadingBox>
                )}
              </div>
            </>
          ) : (
            <>
              {data && data.data ? (
                <>
                  <div
                    className={`w-full flex flex-row gap-2 h-100 overflow-auto scroll-auto`}
                  >
                    <div className="w-full flex-1">
                      <fieldset className="w-full flex flex-col gap-4 px-1 py-1 font-medium">
                        <legend className="text-xl font-medium">
                          Booking information
                        </legend>

                        <fieldset className="w-full border rounded p-3">
                          <legend className="px-2 font-medium">Customer</legend>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                            {/* Name */}
                            <div className="w-full flex flex-col gap-1">
                              <label className="text-left" htmlFor="Name">Name:</label>

                              <input
                                type="text"
                                name="Name"
                                id="Name"
                                className="w-full p-1 border rounded font-normal"
                                value={data.data.name ?? "NaN"}
                                readOnly
                              />
                            </div>

                            {/* Phone */}
                            <div className="w-full flex flex-col gap-1">
                              <label className="text-left" htmlFor="PhoneNumber">Phone:</label>

                              <input
                                type="tel"
                                name="PhoneNumber"
                                id="PhoneNumber"
                                className="w-full p-1 border rounded font-normal"
                                value={data.data.phoneNumber ?? "NaN"}
                                readOnly
                              />
                            </div>

                            {/* Email */}
                            <div className="w-full flex flex-col gap-1 md:col-span-2">
                              <label className="text-left" htmlFor="Email">Email:</label>

                              <input
                                type="email"
                                name="Email"
                                id="Email"
                                className="w-full p-1 border rounded font-normal"
                                value={data.data.email ?? "NaN"}
                                readOnly
                              />
                            </div>
                          </div>
                        </fieldset>

                        <fieldset className="w-full border rounded p-3">
                          <legend className="px-2 font-medium">Booking</legend>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                            {/* Booking Time */}
                            <div className="w-full flex flex-col gap-1 md:col-span-2">
                              <label className="text-left" htmlFor="BookingTime">Booking Time:</label>

                              <input
                                type="datetime-local"
                                name="BookingTime"
                                id="BookingTime"
                                className="w-full p-1 border rounded font-normal"
                                value={data.data.bookingTime ?? ""}
                                readOnly
                              />
                            </div>

                            {/* Min Player */}
                            <div className="w-full flex flex-col gap-1">
                              <label className="text-left" htmlFor="MinPlayers">Min Player:</label>

                              <input
                                type="number"
                                name="MinPlayers"
                                id="MinPlayers"
                                className="w-full p-1 border rounded font-normal"
                                value={data.data.minPlayers ?? "NaN"}
                                readOnly
                              />
                            </div>

                            {/* Max Player */}
                            <div className="w-full flex flex-col gap-1">
                              <label className="text-left" htmlFor="MaxPlayers">Max Player:</label>

                              <input
                                type="number"
                                name="MaxPlayers"
                                id="MaxPlayers"
                                className="w-full p-1 border rounded font-normal"
                                value={data.data.maxsPlayers ?? "NaN"}
                                readOnly
                              />
                            </div>
                          </div>
                        </fieldset>

                        <fieldset className="w-full border rounded p-3">
                          <legend className="px-2 font-medium">Game</legend>

                          <div className="flex flex-col gap-3">
                            {/* Game Reservation */}
                            <div className="w-full flex flex-col gap-1">
                              <label className="text-left" htmlFor="GameReservation">
                                Game Reservation:
                              </label>

                              <textarea
                                id="GameReservation"
                                name="GameReservation"
                                rows={2}
                                className="w-full p-1 border rounded resize-none font-normal"
                                value={data.data.gameReservation ?? "NaN"}
                                readOnly
                              />
                            </div>

                            {/* Game Type */}
                            <div className="w-full flex flex-col gap-1">
                              <label className="text-left" htmlFor="GameType">Game Type:</label>

                              <textarea
                                id="GameType"
                                name="GameType"
                                rows={2}
                                className="w-full p-1 border rounded resize-none font-normal"
                                value={data.data.gameType ?? "NaN"}
                                readOnly
                              />
                            </div>

                            {/* Note */}
                            <div className="w-full flex flex-col gap-1">
                              <label className="text-left" htmlFor="Note">Note:</label>

                              <textarea
                                id="Note"
                                name="Note"
                                rows={2}
                                className="w-full p-1 border rounded resize-none font-normal"
                                value={data.data.note ?? "NaN"}
                                readOnly
                              />
                            </div>
                          </div>
                        </fieldset>

                        <fieldset className="w-full border rounded p-3">
                          <legend className="px-2 font-medium">Status</legend>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                            {/* Status */}
                            <div className="flex flex-col gap-1">
                              <label className="text-left">Status:</label>

                              <div className="min-h-9 flex items-center">
                                <span
                                  className="inline-flex items-center gap-1 rounded-lg border border-mist-900/20 px-3 py-1 text-xs font-semibold"
                                  style={{
                                    color:
                                      data.data.status != null
                                        ? enumStoreBookingStatusConvertToString(
                                            data.data.status,
                                          )?.color
                                        : "black",
                                  }}
                                >
                                  <span className="h-2 w-2 rounded-full bg-current"></span>

                                  {data.data.status != null
                                    ? enumStoreBookingStatusConvertToString(
                                        data.data.status,
                                      )?.name
                                    : "NaN"}
                                </span>
                              </div>
                            </div>

                            {/* Confirmed */}
                            <div className="flex flex-col gap-1">
                              <label className="text-left">Is Confirmed:</label>

                              <div className="min-h-9 flex items-center">
                                <span
                                  className={
                                    data.data.isConfirmed
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }
                                >
                                  {data.data.isConfirmed ? "Yes" : "No"}
                                </span>
                              </div>
                            </div>

                            {/* Confirmed At */}
                            <div className="flex flex-col gap-1 md:col-span-2">
                              <label className="text-left" htmlFor="ConfirmedAt">Confirmed At:</label>

                              <input
                                id="ConfirmedAt"
                                type="datetime-local"
                                className="w-full p-1 border rounded font-normal"
                                value={data.data.confirmedAt ?? ""}
                                readOnly
                              />
                            </div>

                            {/* Rejection Reason */}
                            <div className="flex flex-col gap-1 md:col-span-2">
                              <label className="text-left" htmlFor="RejectionReason">
                                Rejection Reason:
                              </label>

                              <textarea
                                id="RejectionReason"
                                rows={2}
                                className="w-full p-1 border rounded resize-none font-normal"
                                value={data.data.rejectionReason ?? "Null"}
                                readOnly
                              />
                            </div>

                            {/* Deleted */}
                            <div className="flex flex-col gap-1">
                              <label className="text-left">Is Deleted:</label>

                              <div className="min-h-9 flex items-center">
                                <span
                                  className={
                                    data.data.isDeleted
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }
                                >
                                  {data.data.isDeleted ? "Yes" : "No"}
                                </span>
                              </div>
                            </div>

                            {/* Deleted At */}
                            <div className="flex flex-col gap-1">
                              <label className="text-left" htmlFor="DeletedAt">Deleted At:</label>

                              <input
                                id="DeletedAt"
                                type="datetime-local"
                                className="w-full p-1 border rounded font-normal"
                                value={data.data.deleted_at ?? ""}
                                readOnly
                              />
                            </div>
                          </div>
                        </fieldset>
                      </fieldset>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-red-500 text-center">
                    <span>Data not found, it might be deleted.</span>
                  </div>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <div className="text-red-500 text-center">
          <span>
            Sorry your booking id or authentication access was not found!
          </span>
        </div>
      )}
    </>
  );
}
