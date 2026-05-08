import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

import { Suspense, useEffect, useLayoutEffect, useState } from "react";

import { EventDatas } from "../../../store/carouselEvent/carouselEvent";
import EventImageView from "./EventImageView";

export default function CarouselEvent() {
  const [eventIndex, setEventIndex] = useState(0);
  const [isCancleInverval, setIsCancleInverval] = useState(true);
  const [isView, setIsView] = useState({src:"",isView:false});
  const events = EventDatas;
  const intervalSlider = () => {
    return setInterval(() => {
      setEventIndex((prevIndex) => {
        if (isCancleInverval && events && prevIndex < events.length - 1) {
          return prevIndex + 1;
        } else if (events && prevIndex === events.length - 1) {
          return (prevIndex = 0);
        }
        return prevIndex;
      });
    }, 5000);
  };
  useLayoutEffect(() => {
    if (events && events.length > 0) {
      setEventIndex(0);
    }
  }, []);
  useEffect(() => {
    const interval = intervalSlider();
    return () => clearInterval(interval);
  }, [events?.length, isCancleInverval]);
  const handleRightClick = () => {
    if (events && eventIndex < events.length - 1) {
      setEventIndex((t) => (t = t + 1));
    } else {
      setEventIndex(0);
    }
  };
  const handleLeftClick = () => {
    if (events && eventIndex > 0) {
      setEventIndex((t) => (t = t - 1));
    } else {
      setEventIndex(0);
    }
  };
  const handleView = (e : EventTarget) => {
    // console.log(e);
    const data = e as HTMLImageElement ; 
    setIsView({src:data.src,isView:true});
  }
  const handleCloseView = () => {
    setIsView({src:"",isView:false});
  }

  return (
    <>
      <div className=" w-full h-100 border border-mist-500/50 relative rounded">
        {/* image */}
        <Suspense
          fallback={
            <img
              className=" w-full h-full object-cover rounded"
              src="./Suspense/SuspenseImage.png"
              alt="test"
            ></img>
          }
        >
          <img
            className=" w-full h-full object-cover max-md:object-fill cursor-zoom-in rounded"
            src={events[eventIndex].name ?? "./Suspense/SuspenseImage.png"}
            alt={events[eventIndex].alt ?? "errorImage"}
            loading="lazy"
            title="Double click to view"
            onMouseEnter={() => {
              setIsCancleInverval(false);
            }}
            onMouseLeave={() => {
              setIsCancleInverval(true);
            }}
            onClick={(e)=>{
             e.target&&handleView(e.target);
            }}
          ></img>
        </Suspense>
        {/* button switch */}
        <button
          className="h-full cursor-pointer absolute bottom-[50%] right-0 translate-y-[50%] opacity-10 hover:opacity-100 backdrop-blur-xs duration-500 peer/btnRight"
          onClick={(e) => {
            // console.log("test right");
            handleRightClick();
          }}
          onMouseEnter={() => {
            setIsCancleInverval(false);
          }}
          onMouseLeave={() => {
            setIsCancleInverval(true);
          }}
        >
          {" "}
          <ChevronRightCircle size={30}></ChevronRightCircle>{" "}
        </button>
        <button
          className="h-full cursor-pointer absolute bottom-[50%] left-0 translate-y-[50%] opacity-10 hover:opacity-100 backdrop-blur-xs duration-500 peer/btnRight"
          onClick={(e) => {
            // console.log("test left");
            handleLeftClick();
          }}
          onMouseEnter={() => {
            setIsCancleInverval(false);
          }}
          onMouseLeave={() => {
            setIsCancleInverval(true);
          }}
        >
          {" "}
          <ChevronLeftCircle size={30}></ChevronLeftCircle>{" "}
        </button>
        {/* count image */}
        <div className="w-full absolute bottom-0 flex justify-center items-center gap-2 opacity-50 peer-hover/btnRight:opacity-100 peer-hover/btnRight:bottom-2 peer-hover/btnLeft:opacity-100 duration-500">
          {events.map((event, index) => {
            return (
              <span
                key={event.alt}
                className={`max-md:scale-75 w-10 h-3 border border-mist-500 rounded-full duration-500 ${index === eventIndex ? "bg-(--main-color)" : "bg-white"}`}
              ></span>
            );
          })}
        </div>
      </div>
      {/* view image event */}
      {isView.isView && <EventImageView src={isView.src} isView={isView.isView} closeView={handleCloseView}></EventImageView>}
    </>
  );
}
