import React, { Suspense, useEffect, useRef, useState } from "react";
import { CurrencyConvert } from "../utilities/currencyConverter";
import { Dot, Heart, ShoppingBasket, Star } from "lucide-react";
import type { BoardGames } from "../../../types";
import { useNavigate } from "react-router-dom";
import { FavoriteButton } from "../../favoriteButton/components";
export default function ProductionCard({ data }: { data?: BoardGames }) {
  const divref = useRef<HTMLDivElement>(null);
  const isExpanding = useRef(false);
  const timeofRef = useRef(0);
  const [isHover, setIsHover] = useState(false);
  const navgation = useNavigate();
  useEffect(() => {
    const node = divref.current;

    if (node) {
      node.addEventListener("mouseenter", handleCategoryFull);
      node.addEventListener("mouseleave", handleRemoveCategory);
    }
    return () => {
      node?.removeEventListener("mouseenter", handleCategoryFull);
      node?.removeEventListener("mouseleave", handleRemoveCategory);
    };
  }, [isHover]);
  const handleCategoryFull = () => {
    isExpanding.current = true;
    timeofRef.current = setTimeout(() => {
      if (isExpanding.current) {
        setIsHover(true);
      }
    }, 1000);
  };
  const handleRemoveCategory = () => {
    isExpanding.current = false;
    clearTimeout(timeofRef.current);
    setIsHover(false);
  };

  return (
    <>
      <div
        key={data?.id ?? "default".concat((Math.random() * 100).toString())}
        className="border border-mist-500/50 rounded-xl max-md:w-40 w-50 h-full flex flex-col justify-start items-center gap-1 shrink-0 p-2 shadow-md/40 shadow-mist-400 relative group cursor-pointer"
        title={data?.name}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (data?.id) {
            navgation(`/product/${data?.id}`, { state: { data: data } });
          }
        }}
      >
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
          <span title={data?.name}>{data?.name}</span>
        </div>
        {/* tag category */}
        <div
          ref={divref}
          id="category"
          className={`w-full text-xs font-medium flex flex-row gap-1 flex-wrap text-mist-500 relative ${isHover ? "" : "cursor-progress"} `}
        >
          {data?.categories?.slice(0, 3).map((items, index) => {
            return (
              <p
                key={items.category_Id}
                className="category-boxshadow text-[8px] max-md:text-[8px] border rounded p-0.5 text-center text-white bg-mist-500"
              >
                #{items.name}
              </p>
            );
          })}
          {data?.categories && data?.categories.length > 3 && (
            <p
              className="navbar-link category-boxshadow text-[8px] max-md:text-[8px] border rounded p-0.5 text-center text-white bg-mist-500"
              onClick={() => {
                setIsHover((state) => {
                  return !state;
                });
              }}
            >
              +{data.categories.length - 3}
            </p>
          )}
          <div
            className={`w-full max-h-30 p-1 pb-4 rounded backdrop-blur-md absolute -top-20 left-0 text-xs font-medium flex flex-row flex-wrap gap-1 overflow-auto text-mist-500 shirk-0 transition-all duration-500 ease-out ${isHover == true ? "opacity-100 -top-25 pointer-events-auto" : "opacity-0 translate-y-0 pointer-events-none"} `}
          >
            <div className=" w-full h-20 overflow-auto flex flex-row border-r flex-wrap gap-1">
              {data?.categories?.map((items, index) => {
                return (
                  <p
                    key={items.category_Id}
                    className="category-boxshadow h-[1rem] text-[8px] max-md:text-[8px] border rounded p-0.5 text-center text-white bg-mist-500 shirk-0"
                  >
                    #{items.name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        {/* full tag category */}

        {/* final price */}
        <div className="w-full text-xl font-bold overflow-hidden line-clamp-1 text-(--main-color) hover:underline">
          <span>
            {CurrencyConvert({ value: data!.base_Price })}
            <span className=" align-super text-xs underline">đ</span>
          </span>
        </div>
        {/* before discount */}
        {data?.discount && data?.discount > 0 ? (
          <>
            <div className="w-full text-sm font-medium overflow-hidden line-clamp-1 text-mist-500">
              <del>
                {" "}
                {CurrencyConvert({ value: data?.base_Price })}
                <span className=" align-super text-xs underline">đ</span>
              </del>
            </div>
          </>
        ) : (
          <>
            <div className="w-full text-sm font-medium overflow-hidden line-clamp-1 text-mist-500">
              <span>
                {" "}
                {CurrencyConvert({ value: data?.base_Price })}
                <span className=" align-super text-xs underline">đ</span>
              </span>
            </div>
          </>
        )}

        {/* rating and sold quantity */}
        <div className="w-full flex flex-row gap-1 mt-auto">
          <div className=" flex flex-row items-center gap-0.5">
            <Star size={12} className=" fill-yellow-400 text-yellow-400"></Star>
            <span className="text-xs text-mist-500 font-medium">
              {data?.rating}
            </span>
          </div>
          <div className=" flex flex-row items-center gap-0">
            <Dot size={12} className=" fill-mist-400 text-mist-400"></Dot>
            <span className="text-xs text-mist-500 font-medium">
              Sold {data?.sold_Quantity}
            </span>
          </div>
        </div>
        {/* action button */}
        <div className="mr-1 w-full flex flex-row gap-2 self-end mt-auto justify-end">
          <div className=" navbar-link w-auto p-1 hover:bg-(--main-color) hover:text-white duration-100">
            <ShoppingBasket size={12}></ShoppingBasket>
          </div>
          <FavoriteButton boardGameId={data?.id}></FavoriteButton>
        </div>
      </div>
    </>
  );
}
