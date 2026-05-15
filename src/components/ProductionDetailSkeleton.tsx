import { Heart, Hexagon, ShoppingCart } from "lucide-react";
export default function ProductionDetailSkeleton() {
  return (
    <div
      id="productionDetail"
      className="min-h-screen px-[10%] pt-[1rem] bg-[url(/BackgroundContent/bghomepage.png)] bg-center bg-auto bg-origin-border flex flex-col gap-y-[2rem] pb-[2rem]"
    >
      {/* path */}
      <h1 className="text-(--main-color) underline flex gap-1 items-end">../product/<span className="bg-mist-400 animate-pulse w-full h-[1em]"></span> </h1>

      <div className="  w-full p-0 gap-0 border-2 border-mist-800/20 rounded-tl-2xl rounded-tr-xl flex flex-row max-md:flex-col">
        <div className=" flex-1 rounded-tl-xl shrink-0 p-2 bg-white flex flex-col justify-center max-md:items-center">
          <div className=" max-md:w-full  h-40 bg-mist-400 animate-pulse"></div>
          <div className="w-full container flex justify-center-safe gap-2 px-5 py-2 overflow-x-auto">
            <div className=" object-contain h-15 w-20 bg-mist-400 animate-pulse"></div>
            <div className=" object-contain h-15 w-20 bg-mist-400 animate-pulse"></div>
          </div>
        </div>

        <div className=" flex-3 shrink-0 min-w-0 p-2 flex flex-col rounded-tr-xl gap-2 bg-white">
          <div className=" w-full flex flex-row gap-2">
            <div className=" relative inline-block">
              <Hexagon
                size={50}
                className=" stroke-1 fill-mist-400 animate-pulse"
              ></Hexagon>
              <span className="max-w-10 overflow-hidden text-ellipsis whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-sm"></span>
            </div>

            <div className=" w-full flex flex-col p-1 justify-center gap-2 overflow-hidden">
              <span className="bg-mist-400 animate-pulse min-w-10 h-[1rem] text-lg font-bold hover:underline overflow-hidden text-ellipsis whitespace-nowrap"></span>
              <span className="bg-mist-400 animate-pulse min-w-10 h-[1rem] text-sm line-clamp-2 wrap-break-word"></span>
            </div>
          </div>

          <div className=" w-full flex flex-col gap-2">
            <div className="md:border-t cursor-pointer w-full grid grid-rows-1 grid-cols-4 max-md:grid-cols-2 max-md:grid-rows-2 gap-2 text-center font-bold text-sm md:[&>span:not(:nth-child(1))]:border-l">
              <span className="max-md:border wrap-break-word line-clamp-3">
                <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
                <p className="text-xs font-medium underline bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
              </span>
              <span className="max-md:border wrap-break-word line-clamp-3">
                <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
                <p className="text-xs font-medium underline bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
              </span>
              <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
              <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
            </div>
            <div className="text-xs font-medium w-full flex flex-col gap-1 overflow-hidden">
              <span>
                <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
              </span>
              <span>
                <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
              </span>
              <span>
                <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
              </span>
              <span>
                <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
              </span>
            </div>
            <div className="flex flex-row overflow-hidden gap-2 font-bold text-sm text-center">
              <span className="border flex-3 wrap-break-word line-clamp-3">
                <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
              </span>
              <span className="border flex-1 wrap-break-word line-clamp-3">
                <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
              </span>
              <span className={`border flex-1 wrap-break-word line-clamp-3 `}>
                <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 font-bold mt-auto ">
            <div className="flex-1 navbar-link text-center">
              <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
            </div>
            <div className=" navbar-link w-auto  hover:bg-(--main-color) hover:text-white duration-100">
              <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
            </div>
            <div className=" navbar-link w-auto  hover:bg-(--main-color) hover:text-white duration-100">
              <p className="bg-mist-400 animate-pulse min-w-10 h-[1em]"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
