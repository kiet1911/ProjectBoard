import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { cartService } from "../../../services/cart.service";
import useAuthStore from "../../../store/authentication/authState";
import { Suspense, useEffect } from "react";
import { CurrencyConvert } from "../../ProductionCard/utilities/currencyConverter";

export default function CartList() {
  const publicId = useAuthStore((state) => state.publicId);

  const { data, isPending, error, isStale } = useQuery({
    queryKey: ["users_cart"],
    queryFn: async () => {
      const data = await cartService.GetByUserId("v1/Cart/id", publicId!);
      return data;
    },
    staleTime: 5000,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      console.log(isStale);
    }
  }, [data]);

  return (
    <>
      <div className="w-full flex md:flex-row max-md:flex-col p-2 gap-2">
        <div className="flex-4 shrink-0 h-full flex flex-col gap-1">
          <ul className="border border-mist-900/10 bg-mist-100 rounded-xl w-full min-h-12 flex items-center px-3 gap-3 text-sm max-md:text-xs font-medium">
            <li className="w-6 shrink-0">
              <input
                type="checkbox"
                name="checkAll"
                id="checkAll"
                className="w-4 h-4"
              />
            </li>

            <li className="flex-1 min-w-0">
              <span>Product</span>
            </li>

            <li className="hidden md:flex flex-1 justify-center">
              <span>Price</span>
            </li>

            <li className="hidden md:flex flex-1 justify-center">
              <span>Quantity</span>
            </li>

            <li className="hidden md:flex flex-1 justify-center">
              <span>Total</span>
            </li>

            <li className="w-8 shrink-0 flex justify-center">
              <button
                type="button"
                className="p-2 hover:bg-mist-300 hover:cursor-pointer rounded-xl transition-colors duration-300"
              >
                <Trash2 size={18} />
              </button>
            </li>
          </ul>
          <div className="w-full py-0 space-y-1 flex flex-col justify-center-safe items-center min-h-50 max-h-200 overflow-y-auto">
            {isPending ? (
              <div className="animate-spin border-4 border-slate-200 border-t-mist-500 h-10 w-10 rounded-full" />
            ) : (
              <>
                {data && data.cartItems && data.cartItems.length > 0 ? (
                  <>
                    {data.cartItems &&
                      data.cartItems.map((data) => {
                        return (
                          <ul
                            className={`first:rounded-tl-2xl first:rounded-tr-2xl last:rounded-bl-2xl last:rounded-br-2xl border border-mist-900/10 bg-mist-100 w-full min-h-20 flex items-center px-0.5 py-2 text-sm max-md:text-xs`}
                          >
                            <li className="flex items-center px-2">
                              <input
                                type="checkbox"
                                name="checkAll"
                                id={`check-${data.id}`}
                                className="w-4 h-4"
                              />
                            </li>

                            <li className="flex flex-1 items-center gap-3 min-w-0">
                              <Suspense
                                fallback={
                                  <div className="w-16 h-16 shrink-0">
                                    <img
                                      src="./Suspense/SuspenseImage.png"
                                      alt="loading"
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  </div>
                                }
                              >
                                <div className="w-16 h-16 shrink-0">
                                  <img
                                    src="./Suspense/SuspenseImage.png"
                                    alt={data.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                </div>
                              </Suspense>

                              <span
                                className="flex-1 truncate font-medium text-left max-md:flex max-md:flex-col max-md:justify-between gap-5"
                                title={data.name}
                              >
                                <span>{data.name}</span>
                                <span className=" md:hidden">
                                  {CurrencyConvert({
                                    value: data?.base_Price ?? 0,
                                  })}
                                  đ
                                </span>
                              </span>
                            </li>

                            <li className="hidden md:flex flex-1 justify-center">
                              <span>
                                {CurrencyConvert({
                                  value: data?.base_Price ?? 0,
                                })}
                                đ
                              </span>
                            </li>

                            <li className="flex flex-1 justify-center">
                              <div className="flex items-center gap-3 border rounded-lg px-2 py-1">
                                <button
                                  type="button"
                                  className="w-6 h-6 flex items-center justify-center hover:bg-mist-300 duration-300 rounded-md"
                                >
                                  -
                                </button>

                                <span>{data.quantity}</span>

                                <button
                                  type="button"
                                  className="w-6 h-6 flex items-center justify-center hover:bg-mist-300 duration-300 rounded-md"
                                >
                                  +
                                </button>
                              </div>
                            </li>

                            <li className="hidden md:flex flex-1 justify-center text-(--main-color)">
                              <span>
                                {CurrencyConvert({
                                  value:
                                    (data?.base_Price ?? 0) *
                                    (data?.quantity ?? 0),
                                })}
                                đ
                              </span>
                            </li>

                            <li className="flex justify-end px-2">
                              <button
                                type="button"
                                className="p-2 hover:bg-mist-300 hover:cursor-pointer rounded-xl transition-colors duration-300"
                              >
                                <Trash2 size={18} />
                              </button>
                            </li>
                          </ul>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {!error ? (
                      <p className="text-slate-400 text-sm">No items found.</p>
                    ):<></>}
                  </>
                )}
              </>
            )}
            {error && (
              <>
                <span className="text-(--main-color)">
                  {"Api Error: Network Error"}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="border border-mist-900/10 bg-mist-100 rounded-xl flex-1 shrink-0 min-h-50"></div>
      </div>
    </>
  );
}
