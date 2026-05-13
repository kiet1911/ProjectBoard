import { XCircle } from "lucide-react";
import { useLayoutEffect } from "react";

export default function EventImageView({
  src,
  isView = false,
  topValue=0,
  closeView,
}: {
  src: string | undefined;
  isView: boolean;
  topValue?:number;
  closeView: () => void;
}) {
  useLayoutEffect(() => {
    if (isView) document.body.style.overflow = "hidden";
    if (topValue) console.log("scrolly",topValue);
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isView]);
  return (
    isView && (
      <div className={`w-full h-full backdrop-blur-2xl fixed flex flex-col justify-center items-center top-0 left-0 z-50 overflow-hidden duration-500 `}>
        <div className=" w-full h-full relative border flex justify-center p-1">
          <img
            className=" h-full object-contain"
            src={src ?? "./Suspense/SuspenseImage.png"}
            alt="view"
          />
          <XCircle size={30} className=" absolute top-0 right-0 cursor-pointer" onClick={closeView}></XCircle>
        </div>
      </div>
    )
  );
}
