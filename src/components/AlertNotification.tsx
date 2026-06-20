import { BadgeAlert, X } from "lucide-react";
import { useEffect } from "react";
import { useAlertNotification } from "../store/notification/notification";

export default function AlertNotification() {
  const alertNotification = useAlertNotification((state) => state);
  useEffect(() => {
    if (alertNotification.content) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [alertNotification.content]);
  return (
    <>
      {alertNotification.content && (
        <div className="fixed w-full h-full top-0 bg-transparent z-50 flex justify-center-safe items-center-safe backdrop-blur-xs">
          <div className=" min-w-1/3 max-w-1/2 min-h-20 border-2 border-mist-800/20 px-1 pt-1 pb-3 rounded-2xl bg-white flex flex-col gap-2">
            <div className=" flex justify-end-safe">
              <X
                size={20}
                className=" text-mist-400 hover:bg-mist-400 hover:text-white rounded-full p-1 duration-500 transition-all"
                onClick={alertNotification.reset}
              ></X>
            </div>

            <div className=" flex justify-center">
              <BadgeAlert size={30} className=" text-blue-400"></BadgeAlert>
            </div>

            <div className="text-sm font-bold text-mist-500 text-center wrap-break-word">
              <span>{alertNotification.content}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
