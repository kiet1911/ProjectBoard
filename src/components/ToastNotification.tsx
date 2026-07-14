import { useEffect, useState } from "react";
import {
  useToastNotification,
  type ToastType,
} from "../store/notification/notification";
import { ToastIcon } from "../store/notification/notification";
export default function ToastNotification() {
  const data = useToastNotification((state) => state.content);
  return (
    <>
      <div className="p-1 z-50 min-w-50 fixed bottom-0 right-0 translate-y-0 origin-top-right flex flex-col gap-1 pointer-events-none">
        {data.map((data, index) => {
          return (
            <div key={data.id}>
              <ToastItems index={index} item={data}></ToastItems>
            </div>
          );
        })}
      </div>
    </>
  );
}

const ToastItems = ({
  index,
  item,
}: {
  index: number;
  item: { id: string; text: string; type: ToastType };
}) => {
  const [visible, setVisible] = useState(false);
  const remove = useToastNotification((state) => state.remove);
  const IconComponent = ToastIcon[item.type];
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    const dowTimer = setTimeout(() => {
      remove({ id: item.id });
    }, 3800);
    return () => {
      clearTimeout(timer);
      clearTimeout(dowTimer);
    };
  }, []);

  return (
    <>
      <div
        key={item.id}
        className={`${IconComponent.bgStyles} border-2 border-mist-800/20 w-full transition-all duration-700 ease-out text-xs max-md:text-xs font-normal ${visible ? " translate-y-0 opacity-100" : " translate-y-12 opacity-0"}`}
      >
        <div className="max-w-100 flex justify-start-safe items-center-safe gap-1 p-1">
          <IconComponent.icon size={20} fill={IconComponent.color} className={`text-white shirk-0`} ></IconComponent.icon>
          <span className=" flex-2 shirk-0 text-ellipsis overflow-hidden ">{item.text}</span>
        </div>
        <div className={`h-1 w-full ${IconComponent.bgProgress} relative overflow-hidden`}>
          <div className=" w-full h-full bg-white absolute top-0 left-0 animation-slide-in"></div>
        </div>
      </div>
    </>
  );
};
