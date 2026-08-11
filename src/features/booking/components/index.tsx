import { useShallow } from "zustand/shallow";
import useAuthStore from "../../../store/authentication/authState";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import PageContainer from "../../../components/PageContainer";
import {
  useConfirmContent,
  useToastNotification,
} from "../../../store/notification/notification";
import { useBookingMutation } from "../hooks/useBookingMutation";
import ClientBooking from "./userBookings";

const TitleBooking = {
  head: "Booking",
  body: "BoardGame",
};
export default function UserBooking() {
  const isAuthentication = useAuthStore(
    useShallow((state) => state.isAuthentication),
  );
  const publicId = useAuthStore(useShallow((state) => state.publicId));
  const notification = useToastNotification(useShallow((state) => state.add));
  const confirm = useConfirmContent(useShallow((state) => state.active));
  const [form, setForm] = useState({
    publicId: publicId,
    name: "",
    phoneNumber: "",
    email: "",
    minPlayers: 0,
    maxPlayers: 0,
    bookingTime: "",
    gameReservation: "",
    gameType: "",
    note: "",
  });
  const onHandleClearForm = useCallback(() => {
    if (form) {
      setForm({
        publicId: publicId,
        name: "",
        phoneNumber: "",
        email: "",
        minPlayers: 0,
        maxPlayers: 0,
        bookingTime: "",
        gameReservation: "",
        gameType: "",
        note: "",
      });
    }
  }, [form]);
  const mutation = useBookingMutation({
    data: form,
    onNotification: notification,
    onClear: onHandleClearForm,
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const onHandleForm = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const keysEntry = Object.keys(form);
      if (
        e.target &&
        e.target.name &&
        keysEntry.includes(
          e.target.name[0].toLowerCase() +
            e.target.name.slice(1, e.target.name.length),
        )
      ) {
        console.log(e.target.name);
        const key =
          e.target.name[0].toLowerCase() +
          e.target.name.slice(1, e.target.name.length);
        let flag = true;
        //check min and max player
        if (
          e.target.type == "number" &&
          (key == "minPlayers" || key == "maxPlayers")
        ) {
          if (Number(e.target.value) < 0) {
            notification({
              text: "Error input number, value must not be lower than 0!",
              type: "error",
            });
            flag = false;
          }
          if (
            key == "minPlayers" &&
            Number(e.target.value) > Number(form.maxPlayers)
          ) {
            flag = false;
            setForm((state) => ({
              ...state,
              maxPlayers: Number(e.target.value) + 1,
            }));
          }
        }

        if (flag) {
          setForm((state) => ({ ...state, [key]: e.target.value }));
        }
      }
    },
    [form],
  );
  const onHandleNotification = () => {};
  const onHandleSubmit = useCallback(async () => {
    const flag = await confirm("Are you sure you want to submit this booking?");

    if (flag) {
      setForm((state) => ({
        ...state,
        minPlayers: Number(state.minPlayers),
        maxPlayers: Number(state.maxPlayers),
      }));

      console.log(form);

      (await mutation).mutation.mutate();
    }
  }, [form]);
  useEffect(() => {
    if (form) {
      console.log(form);
    }
  }, [form]);
  return (
    <>
      {isAuthentication&&publicId ? (
        <PageContainer url="../BackgroundContent/bghomepage.png">
          <div className="w-full relative pt-10 border-4 border-double border-mist-500/50 p-4 bg-white/90 space-y-0 mt-5">
            <div className="h-28 flex flex-col items-center justify-center absolute -top-12 left-[50%] -translate-x-[50%]">
              <div className="z-10 text-[10px] uppercase tracking-wider text-white font-black bg-(--main-color) px-3 py-0.5 -skew-x-12 shadow-md mb-[-8px]">
                {TitleBooking.head}
              </div>

              <div className="z-0 text-sm font-bold bg-white text-black mr-2 px-4 py-1.5 border-2 border-black -skew-x-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] animate-pulse">
                {TitleBooking.body}
              </div>
            </div>
            {/* booking form */}
            <div className=" w-full h-auto p-2 mt-2">
              <form
                className="text-sm font-medium space-y-1"
                action=""
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  //console.log(form);
                  onHandleSubmit();
                }}
              >
                <div className="w-full flex flex-row gap-2 flex-wrap items-center">
                  <label className="shirk-0 min-w-20" htmlFor="guidId">
                    Public ID:{" "}
                  </label>
                  <input
                    type="text"
                    name="guidId"
                    required
                    readOnly
                    id="guidId"
                    className="flex-1 p-1 border rounded bg-gray-200 text-gray-400"
                    defaultValue={publicId ?? "NaN"}
                  />
                </div>

                <div className="w-full flex flex-row gap-2 flex-wrap items-center">
                  <label className="shirk-0 min-w-20" htmlFor="Name">
                    Name:{" "}
                  </label>
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    required
                    minLength={10}
                    maxLength={256}
                    placeholder="Nguyen Van A"
                    className="flex-1 p-1 border rounded"
                    value={form.name ?? "NaN"}
                    onChange={onHandleForm}
                  />
                </div>

                <div className="w-full flex flex-row gap-2 flex-wrap items-center">
                  <label className="shirk-0 min-w-20" htmlFor="PhoneNumber">
                    Phone:{" "}
                  </label>
                  <input
                    type="tel"
                    name="PhoneNumber"
                    id="PhoneNumber"
                    required
                    minLength={10}
                    maxLength={20}
                    placeholder="0123456789"
                    pattern="(0|84)(3[2-9]|5[6-9]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}"
                    title="Enter a Vietnamese mobile number (e.g. 0912345678 or 84912345678)"
                    className="flex-1 p-1 border rounded"
                    value={form.phoneNumber ?? "NaN"}
                    onChange={onHandleForm}
                  />
                </div>

                <div className="w-full flex flex-row gap-2 flex-wrap items-center">
                  <label className="shirk-0 min-w-20" htmlFor="Email">
                    Email:{" "}
                  </label>
                  <input
                    type="email"
                    name="Email"
                    id="Email"
                    required
                    minLength={10}
                    maxLength={256}
                    placeholder="NguyenVanA.@gmail.com"
                    title="Enter a email"
                    className="flex-1 p-1 border rounded"
                    value={form.email ?? "NaN"}
                    onChange={onHandleForm}
                  />
                </div>

                <div className="w-full flex flex-row gap-2 flex-wrap items-center">
                  <div className="flex-1 flex flex-row gap-2 flex-wrap items-center">
                    <label className="shirk-0 min-w-20" htmlFor="MinPlayers">
                      Min Player:{" "}
                    </label>
                    <input
                      type="number"
                      name="MinPlayers"
                      id="MinPlayers"
                      required
                      min={1}
                      max={99}
                      placeholder="0"
                      className="flex-1 p-1 border rounded"
                      value={form.minPlayers.toString() ?? "0"}
                      onChange={onHandleForm}
                    />
                  </div>
                  <div className="flex-1 flex flex-row gap-2 flex-wrap items-center">
                    <label className="shirk-0 min-w-20" htmlFor="MaxPlayers">
                      Max Player:{" "}
                    </label>
                    <input
                      type="number"
                      name="MaxPlayers"
                      id="MaxPlayers"
                      required
                      min={Number(form.minPlayers) ?? 1}
                      max={100}
                      placeholder="0"
                      className="flex-1 p-1 border rounded"
                      value={form.maxPlayers.toString() ?? "0"}
                      onChange={onHandleForm}
                    />
                  </div>
                </div>

                <div className="w-full flex flex-row gap-2 flex-wrap items-center">
                  <label className="shirk-0 min-w-20" htmlFor="BookingTime">
                    Booking Time:{" "}
                  </label>
                  <input
                    type="datetime-local"
                    name="BookingTime"
                    id="BookingTime"
                    required
                    className="flex-1 p-1 border rounded"
                    value={form.bookingTime}
                    onChange={onHandleForm}
                  />
                </div>

                <div className="w-full flex flex-row gap-2 flex-wrap items-center">
                  <label className="shirk-0 min-w-20" htmlFor="GameReservation">
                    Game Reservation:{" "}
                  </label>
                  <textarea
                    id="GameReservation"
                    name="GameReservation"
                    rows={2}
                    className="flex-1 p-1 border rounded resize-none"
                    placeholder="Splendor, CaTan, Uno, Explore Kitten,... not required"
                    maxLength={256}
                    value={form.gameReservation ?? "NaN"}
                    onChange={onHandleForm}
                  ></textarea>
                </div>

                <div className="w-full flex flex-row gap-2 flex-wrap items-center">
                  <label className="shirk-0 min-w-20" htmlFor="GameType">
                    Game Type:{" "}
                  </label>
                  <textarea
                    id="GameType"
                    name="GameType"
                    rows={2}
                    className="flex-1 p-1 border rounded resize-none"
                    placeholder="Family, Card,... not required"
                    maxLength={256}
                    value={form.gameType ?? "NaN"}
                    onChange={onHandleForm}
                  ></textarea>
                </div>

                <div className="w-full flex flex-row gap-2 flex-wrap items-center">
                  <label className="shirk-0 min-w-20" htmlFor="Note">
                    Note:{" "}
                  </label>
                  <textarea
                    id="Note"
                    name="Note"
                    rows={2}
                    className="flex-1 p-1 border rounded resize-none"
                    placeholder="ABCDE,... not required"
                    maxLength={256}
                    value={form.note ?? "NaN"}
                    onChange={onHandleForm}
                  ></textarea>
                </div>

                <div className="w-full p-1">
                  <button
                    type="submit"
                    className="navbar-link relative float-right"
                  >
                    Submit Booking
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="w-full">
            <ClientBooking publicId={publicId} ></ClientBooking>
          </div>
          
          {/* chart feature */}
          <div className=" w-full">
            
          </div>

        </PageContainer>
      ) : (
        <PageContainer url="../BackgroundContent/bghomepage.png">
          <div className="p-2 bg-white/50 text-red-500 font-bold">
            <span>You must be login to use this feature!</span>
          </div>
        </PageContainer>
      )}
    </>
  );
}
