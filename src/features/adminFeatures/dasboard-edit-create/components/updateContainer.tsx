import { X, SaveAll } from "lucide-react";
import type React from "react";
import { useUpdateContainer } from "../stores/updateContainer";
import { useShallow } from "zustand/shallow";

export default function UpdateContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  const status = useUpdateContainer(useShallow((state) => state.status));
  const node = useUpdateContainer(useShallow((state) => state.node));
  const close = useUpdateContainer(useShallow((close) => close.close));
  return (
    <>
      {status && (
        <>
          <div className="fixed w-full h-full top-0 bg-transparent z-2 flex justify-center-safe items-center-safe backdrop-blur-xs">
            <div className="min-w-2/3 min-h-20 border-2 border-mist-800/20 px-2 pt-1 pb-3 rounded-2xl bg-white flex flex-col justify-center items-center gap-3">
              <div className=" flex justify-end-safe self-end-safe">
                <X
                  size={20}
                  className=" text-mist-400 hover:bg-mist-400 hover:text-white rounded-full p-1 duration-500 transition-all"
                  onClick={close}
                ></X>
              </div>
              <div className=" flex justify-center">
                <SaveAll size={30} className=" text-blue-400"></SaveAll>
              </div>
              <div className="text-sm font-bold text-mist-500 text-center wrap-break-word w-full h-full flex flex-row gap-1 justify-center items-center overflow-y-auto">
                {children}
                {node}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
