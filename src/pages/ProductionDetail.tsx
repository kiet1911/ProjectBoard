import { use, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { boardgamesService } from "../services/boardgames.service";
import type { BoardGameCreators, BoardGames } from "../types";
import {
  Heart,
  Hexagon,
  Info,
  Package,
  PenLineIcon,
  Ruler,
  ShoppingCart,
} from "lucide-react";
import { CurrencyConvert } from "../features/ProductionCard/utilities/currencyConverter";
import ProductionDetailSkeleton from "../components/ProductionDetailSkeleton";
import { favoriteService } from "../services/favorite.service";
import useAuthStore from "../store/authentication/authState";
import {
  useAlertNotification,
  useToastNotification,
} from "../store/notification/notification";
import { FavoriteButton } from "../features/favoriteButton/components";
import { CartButton } from "../features/cartButton/components";
export default function ProductionDetail() {
  const id = useParams();
  const [detailBoardGame, setdetailBoardGame] = useState<BoardGames>();
  const [loading, setLoading] = useState(false);
  const [creators, setCreators] = useState<BoardGameCreators>({});
  const [tabs, setTabs] = useState([
    { name: "Description", isActive: true },
    { name: "Full Credit", isActive: false },
  ]);
  const tabContent = useRef<HTMLDivElement>(null);
  const navigation = useNavigate();
  const handleTabClick = (index: number) => {
    if (tabContent.current?.offsetTop)
      window.scrollTo({
        top: tabContent.current?.offsetTop - 100,
        behavior: "smooth",
      });
    setTabs((prev) => {
      return prev.map((tab, i) => {
        if (i === index) {
          return { ...tab, isActive: true };
        } else {
          return { ...tab, isActive: false };
        }
      });
    });
  };
  const handleFavoriteClick = () => {
    if (
      detailBoardGame?.id &&
      useAuthStore.getState().isAuthentication &&
      useAuthStore.getState().publicId != null
    ) {
      const fetch = async () => {
        try {
          const res = await favoriteService.Add(
            "v1/Favorite/Add",
            detailBoardGame.id,
          );
          // useAlertNotification.getState().setText("success");
          // console.log(res);
          useToastNotification
            .getState()
            .add({
              text: !res.isdelete ? "Add success" : "Remove success",
              type: "success",
            });
        } catch (error) {
          // console.log(error);
        }
      };
      fetch();
    } else {
      useToastNotification
        .getState()
        .add({ text: "You must be login!", type: "error" });
      // useAlertNotification.getState().setText("You must be login!");
      // console.log("You must be login!");
    }
  };
  useLayoutEffect(() => {
    // scoll to top
    window.scrollTo(0, 0);
    // setup data
    if (id.id) {
      //call api
      const fetch = async () => {
        try {
          //loading
          setLoading(true);
          const res = await boardgamesService.get("v1/BoardGames/Id", {
            guid: id.id,
          });
          // if res have data
          if (res) {
            setdetailBoardGame(res);
          }
          // else navigation to error page 404
          else {
            navigation("/404");
          }
          // console.log(res);
        } catch (error) {
          navigation("/404");
          setLoading(false);
          // console.log(error);
        }
        setLoading(false);
      };
      fetch();
    }
  }, [id.id]);
  useLayoutEffect(() => {
    if (!detailBoardGame?.creators || !detailBoardGame.creators.length) return;

    setCreators((prev) => {
      const updated: Record<string, any[]> = { ...prev };

      detailBoardGame.creators.forEach((data) => {
        if (data.type === undefined) return;

        if (!updated[data.type]) {
          updated[data.type] = [];
        }

        const exists = updated[data.type].some((item) => item.id === data.id);

        if (!exists) {
          updated[data.type].push(data);
        }
      });

      return updated;
    });
  }, [detailBoardGame?.creators]);
  return (
    <>
      {loading ? (
        <ProductionDetailSkeleton></ProductionDetailSkeleton>
      ) : (
        <div
          id="productionDetail"
          className="min-h-screen px-[10%] pt-[1rem] bg-[url(/BackgroundContent/bghomepage.png)] bg-auto bg-origin-border flex flex-col gap-y-[1rem] pb-[2rem] opacity-100 duration-500"
        >
          {/* path */}
          <h1 className="text-(--main-color) underline">
            ../product/{detailBoardGame?.name || "NaN..."}
          </h1>

          <div className="  w-full p-0 gap-0 border-2 border-mist-800/20 rounded-tl-2xl rounded-tr-xl flex flex-row max-md:flex-col">
            <div className=" flex-1 rounded-tl-xl max-md:rounded-t-xl shrink-0 p-2 bg-(--footer-bg-color) flex flex-col justify-center max-md:items-center">
              <img
                className=" object-contain h-40"
                src="/CarouselEventContent/event00.png"
                alt="suspense_image"
              ></img>
              <div className="w-full container flex justify-center-safe gap-2 px-5 py-2 overflow-x-auto">
                <img
                  className=" object-contain h-15 border"
                  src="/CarouselEventContent/event00.png"
                  alt="suspense_image"
                ></img>
                <img
                  className=" object-contain h-15 border"
                  src="/CarouselEventContent/event00.png"
                  alt="suspense_image"
                ></img>
                <img
                  className=" object-contain h-15 border"
                  src="/CarouselEventContent/event00.png"
                  alt="suspense_image"
                ></img>
                <img
                  className=" object-contain h-15 border"
                  src="/CarouselEventContent/event00.png"
                  alt="suspense_image"
                ></img>
                <img
                  className=" object-contain h-15 border"
                  src="/CarouselEventContent/event00.png"
                  alt="suspense_image"
                ></img>
              </div>
            </div>

            <div className=" flex-3 shrink-0 min-w-0 p-2 flex flex-col md:rounded-tr-xl gap-2 bg-white">
              <div className=" w-full flex flex-row gap-2">
                <div className=" relative flex flex-col justify-center items-center ">
                  <Hexagon
                    size={50}
                    className=" stroke-1 fill-(--footer-bg-color)/90"
                  ></Hexagon>
                  <span className="max-w-10 overflow-hidden text-ellipsis whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-sm text-white">
                    {detailBoardGame?.rating ?? "NaN"}
                  </span>
                </div>

                <div className=" w-full flex flex-col p-1 justify-center overflow-hidden">
                  <span className="text-lg font-bold hover:underline overflow-hidden text-ellipsis whitespace-nowrap">
                    {detailBoardGame?.name ?? "NaN"}
                  </span>
                  <span className="text-sm line-clamp-2 wrap-break-word">
                    {detailBoardGame?.description &&
                    detailBoardGame?.description.short_Description
                      ? detailBoardGame?.description.short_Description
                      : "no description"}
                  </span>
                </div>
              </div>

              <div className=" w-full flex flex-col gap-2">
                <div className="md:border-t cursor-pointer w-full grid grid-rows-1 grid-cols-4 max-md:grid-cols-2 max-md:grid-rows-2 gap-2 text-center font-bold text-sm md:[&>span:not(:nth-child(1))]:border-l">
                  <span className="max-md:border wrap-break-word line-clamp-3">
                    <p>
                      {detailBoardGame?.min_Player ?? "NaN"}-
                      {detailBoardGame?.max_Player ?? "NaN"} Players
                    </p>
                    <p className="text-xs font-medium underline">
                      Best: {detailBoardGame?.prefer_Player ?? "NaN"}
                    </p>
                  </span>
                  <span className="max-md:border wrap-break-word line-clamp-3">
                    <p>
                      {detailBoardGame?.min_Time ?? "NaN"}-
                      {detailBoardGame?.max_Time ?? "NaN"} Min
                    </p>
                    <p className="text-xs font-medium underline">
                      Playing Time
                    </p>
                  </span>
                  <span className="max-md:border wrap-break-word line-clamp-3 flex justify-center items-center">
                    <p>Age: {detailBoardGame?.age_Requirement ?? "NaN"}+</p>
                  </span>
                  <span className="max-md:border wrap-break-word line-clamp-3 flex justify-center items-center">
                    <p>Weight: {detailBoardGame?.weight ?? "NaN"}/5</p>
                  </span>
                </div>
                <div className="text-xs font-medium w-full flex flex-col gap-1 overflow-hidden">
                  {["Author", "Artist", "Designer", "Publisher"].map(
                    (items, index) => {
                      return (
                        <span key={items + index}>
                          {items}:{" "}
                          {creators[index] && creators[index].length > 0 ? (
                            <>
                              {creators[index].map((data, index) => {
                                if (index === 1)
                                  return (
                                    <span
                                      className="underline cursor-pointer font-bold"
                                      key={index}
                                      onClick={() => {
                                        handleTabClick(1);
                                      }}
                                    >
                                      more+
                                    </span>
                                  );
                                else if (index < 1) {
                                  return (
                                    <span
                                      className="underline mr-1"
                                      key={index}
                                    >
                                      {data.name}
                                    </span>
                                  );
                                }
                              })}
                            </>
                          ) : (
                            <></>
                          )}
                        </span>
                      );
                    },
                  )}
                </div>
                <div className="flex flex-row overflow-hidden gap-1 p-1 font-bold text-center border navbar-link text-sm max-md:text-xs">
                  <div
                    className={`flex-3 wrap-break-word line-clamp-3 flex items-center justify-center `}
                  >
                    <p
                      className={` max-md:text-xs rounded-lg font-bold px-2 py-1 gap-1 flex flex-row justify-center items-center bg-white border border-mist-200 w-full`}
                      title="Weight x Height x Length"
                    >
                      <Ruler size={18}></Ruler> : {""}
                      {detailBoardGame?.size_X ?? "NaN"} x{" "}
                      {detailBoardGame?.size_Y ?? "NaN"} x{" "}
                      {detailBoardGame?.size_Z ?? "NaN"}
                      {" cm"}
                    </p>
                  </div>
                  <div
                    className={`flex-1 wrap-break-word line-clamp-3 flex items-center justify-center`}
                  >
                    <p
                      className={` w-full relative rounded-lg font-bold p-1 gap-1 flex flex-row justify-center items-center bg-white border border-mist-200 ${detailBoardGame?.stock_Quantity == 0 ? "text-red-800 line-through" : "  "} `}
                      title="Stock"
                    >
                      <Package size={18}></Package>:{" "}
                      {detailBoardGame?.stock_Quantity ?? "NaN"}
                    </p>
                  </div>
                  <div
                    className={`flex-1 wrap-break-word line-clamp-3 flex items-center justify-center `}
                  >
                    <p
                      className={` w-full relative rounded-lg font-bold p-1 gap-1 flex flex-row justify-center items-center ${detailBoardGame?.status == "0" && " border border-green-900 bg-green-100 text-green-800"} ${detailBoardGame?.status == "1" && "border border-red-900 bg-red-100 text-red-800"}`}
                    >
                      <Info size={18}></Info>
                      {detailBoardGame?.status == "0" ? <>Available</> : ""}
                      {detailBoardGame?.status == "1" ? <>InAvailable</> : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 font-bold mt-auto ">
                <div className="flex-1 navbar-link text-center">
                  {" "}
                  <span className=" text-(--main-color) font-bold">
                    {CurrencyConvert({
                      value: detailBoardGame?.base_Price ?? 0,
                    })}
                    đ
                  </span>
                </div>
                {detailBoardGame?.discount && detailBoardGame?.discount > 0 && (
                  <div className="flex-1 navbar-link  text-center">
                    {" "}
                    <del className=" text-mist-500 font-bold">
                      {CurrencyConvert({
                        value: detailBoardGame?.base_Price ?? 10000,
                      })}
                      đ
                    </del>
                  </div>
                )}
                <CartButton
                  boardGameId={detailBoardGame?.id}
                  cartSize={20}
                ></CartButton>
                <FavoriteButton
                  boardGameId={detailBoardGame?.id}
                  heartSize={20}
                ></FavoriteButton>
              </div>
            </div>
          </div>

          <div
            ref={tabContent}
            className="w-full min-h-200 border-2 border-mist-800/20 bg-white flex flex-row gap-1 p-1 cursor-pointer "
          >
            <div className="flex-3 flex flex-col gap-1 ">
              <div className="border-b-3 border-b-mist-200 text-sm font-bold pb-1 flex flex-row gap-2 [&>span]:hover:text-(--main-color)">
                {tabs.map((tab, index) => (
                  <span
                    key={tab.name}
                    className={`cursor-pointer ${tab.isActive === true ? "text-(--main-color)" : ""}`}
                    onClick={() => {
                      handleTabClick(index);
                    }}
                  >
                    {tab.name}
                  </span>
                ))}
              </div>
              {/* tabs content */}
              <div className=" h-full w-full overflow-auto ">
                {tabs[0].isActive && (
                  <>
                    <div
                      className="font-bold text-sm"
                      dangerouslySetInnerHTML={{
                        __html:
                          detailBoardGame?.description &&
                          detailBoardGame?.description.full_Description
                            ? detailBoardGame?.description.full_Description
                            : "No Description",
                      }}
                    ></div>
                  </>
                )}
                {tabs[1].isActive && (
                  <>
                    <h1 className=" font-bold text-sm border-b w-full">
                      Full Credit
                    </h1>
                    <div className=" flex flex-col gap-2 mt-2">
                      {["Author", "Artist", "Designer", "Publisher"].map(
                        (items, index) => {
                          return (
                            <div
                              key={items + index}
                              className="flex flex-row text-xs font-medium border-b border-b-mist-800/20"
                            >
                              <span className="flex-1">{items}:</span>
                              <div className="flex-3 flex flex-col w-full">
                                {creators[index] &&
                                creators[index].length > 0 ? (
                                  <>
                                    {creators[index].map((data, index) => {
                                      return (
                                        <span
                                          className="text-blue-500 mr-1"
                                          key={index}
                                        >
                                          {data.name}
                                        </span>
                                      );
                                    })}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className=" flex-1 bg-mist-100 text-sm font-bold p-1">
              <span className="flex gap-1 items-center mb-1 ">
                Category <PenLineIcon size={10}></PenLineIcon>
              </span>
              <div className=" grid grid-cols-2 ">
                {detailBoardGame?.categories ? (
                  detailBoardGame.categories.map((items) => {
                    return (
                      <p
                        key={items.category_Id + items.name}
                        className="category-box shadow text-xs max-md:text-[8px] border rounded p-0.5 text-center text-white bg-mist-500 shirk-0 mb-1 overflow-hidden text-ellipsis whitespace-nowrap"
                        title={items.name}
                      >
                        #{items.name}
                      </p>
                    );
                  })
                ) : (
                  <span className="font-bold">NaN</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
