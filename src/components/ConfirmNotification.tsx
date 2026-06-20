import { useShallow } from "zustand/shallow";
import { useConfirmContent } from "../store/notification/notification";
import { BadgeAlert, X } from "lucide-react";
import { useEffect } from "react";

export default function ConfirmNotification() {
  const confirmContent = useConfirmContent(
    useShallow((state) => state.content),
  );
  const close = useConfirmContent((state)=> state.close);
  const reject = useConfirmContent((state)=> state.reject);
  const accept = useConfirmContent((state)=> state.accept);
  useEffect(()=>{
    if(confirmContent.isContent){
        document.body.style.overflow = 'hidden';
    }
    return ()=>{
        document.body.style.overflow = 'unset';
    }
  },[confirmContent.isContent])
  return (
    <>
      {confirmContent.isContent && (
        <>
          <div className="fixed w-full h-full top-0 bg-transparent z-50 flex justify-center-safe items-center-safe backdrop-blur-xs">
            <div className=" min-w-1/3 max-w-1/2 min-h-20 border-2 border-mist-800/20 px-2 pt-1 pb-3 rounded-2xl bg-white flex flex-col justify-center items-center gap-3">
              <div className=" flex justify-end-safe self-end-safe">
                <X
                  size={20}
                  className=" text-mist-400 hover:bg-mist-400 hover:text-white rounded-full p-1 duration-500 transition-all"
                  onClick={()=>{reject(),close()}}
                ></X>
              </div>

              <div className=" flex justify-center">
                <BadgeAlert size={30} className=" text-blue-400"></BadgeAlert>
              </div>

              <div className="text-sm font-bold text-mist-500 text-center wrap-break-word">
                <span>{confirmContent.text}</span>
              </div>

              <div onClick={accept} className="text-sm font-bold text-mist-500 text-center wrap-break-word navbar-link hover:bg-(--main-color) hover:text-white">
                <button >
                    Accept
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
