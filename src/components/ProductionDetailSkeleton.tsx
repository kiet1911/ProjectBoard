import { Hexagon } from "lucide-react";
export default function ProductionDetailSkeleton() {
  return (
    <div
      id="productionDetail"
      className="min-h-screen px-[10%] pt-4 bg-[url(/BackgroundContent/bghomepage.png)] bg-auto bg-origin-border flex flex-col gap-y-4 pb-8 opacity-100 duration-500"
    >
      {/* path */}
      <h1 className="text-(--main-color) underline flex items-center"><p className="animate-pulse w-1/3 h-4 bg-mist-300"></p></h1>

      <div className="w-full p-0 gap-0 border-2 border-mist-800/20 rounded-tl-2xl rounded-tr-xl flex flex-row max-md:flex-col">
        <div className="flex-1 rounded-tl-xl max-md:rounded-t-xl shrink-0 p-2 bg-(--footer-bg-color) flex flex-col justify-center max-md:items-center">
          <img
            className="animate-pulse object-contain h-40"
            src="/Suspense/SuspenseImage.png"
            alt="suspense_image"
          ></img>
          <div className="w-full container flex justify-center-safe gap-2 px-5 py-2 overflow-x-auto">
            <img
              className="animate-pulse object-contain h-15 border"
              src="/Suspense/SuspenseImage.png"
              alt="suspense_image"
            ></img>
            <img
              className="animate-pulse object-contain h-15 border"
              src="/Suspense/SuspenseImage.png"
              alt="suspense_image"
            ></img>
          </div>
        </div>

        <div className=" flex-3 shrink-0 min-w-0 p-2 flex flex-col md:rounded-tr-xl gap-2 bg-white">
          <div className=" w-full flex flex-row gap-2">
            <div className=" relative inline-block">
              <Hexagon
                size={50}
                className="animate-pulse stroke-1 fill-(--footer-bg-color)/90"
              ></Hexagon>
              <span className=" max-w-10 overflow-hidden text-ellipsis whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-sm text-white"></span>
            </div>

            <div className=" w-full flex flex-col p-1 justify-center overflow-hidden gap-1">
              <span className="text-lg font-bold hover:underline overflow-hidden text-ellipsis whitespace-nowrap h-4 w-full animate-pulse bg-mist-300"></span>
              <span className="text-sm line-clamp-2 wrap-break-word h-4 w-full animate-pulse bg-mist-300"></span>
            </div>
          </div>

          <div className=" w-full flex flex-col gap-2">
            <div className="md:border-t cursor-pointer w-full grid grid-rows-1 grid-cols-4 max-md:grid-cols-2 max-md:grid-rows-2 gap-2 text-center font-bold text-sm md:[&>span:not(:nth-child(1))]:border-l">
              <span className="max-md:border wrap-break-word line-clamp-3 h-6 w-full animate-pulse bg-mist-300">
                <p></p>
                <p className="text-xs font-medium underline"></p>
              </span>
              <span className="max-md:border wrap-break-word line-clamp-3 h-6 w-full animate-pulse bg-mist-300">
                <p></p>
                <p className="text-xs font-medium underline"></p>
              </span>
              <span className="max-md:border wrap-break-word line-clamp-3 flex justify-center items-center h-6 w-full animate-pulse bg-mist-300"></span>
              <span className="max-md:border wrap-break-word line-clamp-3 flex justify-center items-center h-6 w-full animate-pulse bg-mist-300"></span>
            </div>
            <div className="text-xs font-medium w-full flex flex-col gap-1 overflow-hidden">
              <span className="flex">
                <p className="h-4 w-full animate-pulse bg-mist-300"></p>
              </span>
              <span className="flex">
                <p className="h-4 w-full animate-pulse bg-mist-300"></p>{" "}
              </span>
              <span className="flex">
                <p className="h-4 w-full animate-pulse bg-mist-300"></p>
              </span>
              <span className="flex">
                <p className="h-4 w-full animate-pulse bg-mist-300"></p>
              </span>
            </div>
            <div className="flex flex-row overflow-hidden gap-1 p-1 font-bold text-sm text-center border navbar-link">
              <div
                className={`flex-3 wrap-break-word line-clamp-3 flex items-center justify-center `}
              >
                <p
                  className={`text-sm rounded-lg font-bold px-2 py-1 gap-1 flex flex-row justify-center items-center  border border-mist-200 w-full h-4 animate-pulse bg-mist-300`}
                  title="Weight x Height x Length"
                ></p>
              </div>
              <div
                className={`flex-1 wrap-break-word line-clamp-3 flex items-center justify-center `}
              >
                <p
                  className={`text-sm w-full relative rounded-lg font-bold p-1 gap-1 flex flex-row justify-center items-center  border border-mist-200 h-4 animate-pulse bg-mist-300`}
                  title="Stock"
                ></p>
              </div>
              <div
                className={`flex-1 wrap-break-word line-clamp-3 flex items-center justify-center `}
              >
                <p
                  className={`text-sm relative rounded-lg font-bold p-1 gap-1 flex flex-row justify-center items-center h-4 w-full animate-pulse bg-mist-300`}
                ></p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 font-bold mt-auto ">
            <div className="flex-1 navbar-link text-center h-10 w-full animate-pulse bg-mist-300">
              {" "}
              <span className=" text-(--main-color) font-bold"></span>
            </div>

            <div className=" navbar-link w-auto  hover:bg-(--main-color) hover:text-white duration-100 h-10 animate-pulse bg-mist-300"></div>
            <div className=" navbar-link w-auto  hover:bg-(--main-color) hover:text-white duration-100 h-10 animate-pulse bg-mist-300"></div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-100 border-2 border-mist-800/20 bg-white flex flex-row gap-1 p-1 cursor-pointer ">
        <div className="flex-3 flex flex-col gap-1 ">
          <div className="border-b-3 border-b-mist-200 text-sm font-bold pb-1 flex flex-row gap-2 [&>span]:hover:text-(--main-color)">
            <span className=" h-4 w-20 animate-pulse bg-mist-300 "></span>
            <span className=" h-4 w-20 animate-pulse bg-mist-300 "></span>
          </div>
          <div className=" h-full w-full animate-pulse bg-mist-300">

          </div>
          {/* tabs content */}
        </div>

        <div className=" flex-1 bg-mist-100 text-sm font-bold p-1">
          <span className="flex gap-1 items-center mb-1 h-4 w-full animate-pulse bg-mist-300 "></span>
          <div className=" grid grid-cols-2 gap-1">
            {new Array(2).fill(2).map((item, index) => (
              <span
                key={index+item}
                className="flex gap-1 items-center mb-1 h-4 w-full animate-pulse bg-mist-300 "
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
