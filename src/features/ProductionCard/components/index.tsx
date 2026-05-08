import React, { Suspense } from "react";
import { CurrencyConvert } from "../utilities/currencyConverter";
import { Dot, Heart, ShoppingBasket, Star } from "lucide-react";
import { createPortal } from "react-dom";
import CateogoryBoxDetail from "./CategoryBoxDetail";
export default function ProductionCard() {
  const [mouseXY, setMouseXY] = React.useState<
    { x: number; y: number } | undefined
  >(undefined);
  const handleCategoryFull = (e: React.MouseEvent) => {
    setTimeout(() => {
      console.log(e.clientX, e.clientY);
      setMouseXY({ x: e.screenX, y: e.screenY });
    }, 1000);
  };
//   const handleRemoveCategory = () => {
//     const data = document.getElementById("categoryboxdetail");
    
//     setMouseXY(undefined);
//   };

  return (
    <>
      {/* {mouseXY &&
        createPortal(
          <CateogoryBoxDetail x={mouseXY.x} y={mouseXY.y} />,
          document.getElementById("app")!,
        )} */}
      <div className="border border-mist-500/50 rounded-xl max-md:w-40 w-50 h-full flex flex-col justify-start items-center gap-1 shrink-0 p-2 shadow-md/40 shadow-mist-400 relative group cursor-pointer">
        {/* badge */}
        <div className="absolute -top-3 left-2.5 text-xs rounded flex flex-row gap-2 bg-white">
          <span className=" border border-red-600 text-white font-medium text-xs rounded px-1 animate-pulse bg-red-600">
            -20%
          </span>
        </div>

        {/* thumnail */}
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
            className=" w-full h-[50%] object-cover max-md:object-contain rounded-[20px] px-1"
            src={"./Suspense/SuspenseImage.png"}
            alt={"test"}
            loading="lazy"
          ></img>
        </Suspense>
        {/* Production infor */}
        <div className="w-full text-sm font-normal overflow-hidden line-clamp-2 hover:text-(--main-color) hover:underline shrink-0">
          <span title={"name"}>
            Teraforming Mar mar , .asjdlajhskd Mar Teraforming Mar
          </span>
        </div>
        {/* tag category */}
        <div
          id="category"
        //   onMouseEnter={(e) => {
        //     e.stopPropagation();
        //     handleCategoryFull(e);
        //   }}
        //   onMouseLeave={() => {
        //     handleRemoveCategory();
        //   }}
          className="w-full border text-xs font-medium flex flex-row gap-1 flex-wrap text-mist-500"
        >
          <p className="category-boxshadow text-[8px] max-md:text-[8px] border rounded p-0.5 text-center text-white bg-mist-500">
            #Stragety
          </p>
          <p className="category-boxshadow text-[8px] max-md:text-[8px] border rounded p-0.5 text-center text-white bg-mist-500">
            #Family
          </p>
          <p className="category-boxshadow text-[8px] max-md:text-[8px] border rounded p-0.5 text-center text-white bg-mist-500">
            #Party
          </p>
          <p className="category-boxshadow text-[8px] max-md:text-[8px] border rounded p-0.5 text-center text-white bg-mist-500">
            #Cooperatives
          </p>
          <p className="text-[10px] max-md:text-[8px] border rounded p-0.5 text-center text-white bg-mist-500">
            +3
          </p>
        </div>

        {/* final price */}
        <div className="w-full text-xl font-bold overflow-hidden line-clamp-1 text-(--main-color) hover:underline">
          <span>
            {" "}
            {CurrencyConvert({ value: 1000000 })}
            <span className=" align-super text-xs underline">đ</span>
          </span>
        </div>
        {/* before discount */}
        <div className="w-full text-sm font-medium overflow-hidden line-clamp-1 text-mist-500">
          <del>
            {" "}
            {CurrencyConvert({ value: 1200000 })}
            <span className=" align-super text-xs underline">đ</span>
          </del>
        </div>
        {/* rating and sold quantity */}
        <div className="w-full flex flex-row gap-1">
          <div className=" flex flex-row items-center gap-0.5">
            <Star size={12} className=" fill-yellow-400 text-yellow-400"></Star>
            <span className="text-xs text-mist-500 font-medium">10.0</span>
          </div>
          <div className=" flex flex-row items-center gap-0">
            <Dot size={12} className=" fill-mist-400 text-mist-400"></Dot>
            <span className="text-xs text-mist-500 font-medium">Sold 50k</span>
          </div>
        </div>
        {/* action button */}
        <div className="mr-1 w-full flex flex-row gap-2 justify-end-safe">
          <div className=" navbar-link w-auto p-1 hover:bg-(--main-color) hover:text-white duration-100">
            <ShoppingBasket size={12}></ShoppingBasket>
          </div>
          <div className=" navbar-link w-auto p-1 hover:bg-(--main-color) hover:text-white duration-100">
            <Heart size={12}></Heart>
          </div>
        </div>
      </div>
    </>
  );
}
