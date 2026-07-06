import { useQuery } from "@tanstack/react-query";
import { LoadingBox } from "../../../../components/LoadingBox";
import { CurrencyConvert } from "../../../ProductionCard/utilities/currencyConverter";

export default function TopCurrentOrder({ fn }: { fn: () => Promise<any> }) {
  const { data, isFetching } = useQuery({
    queryKey: ["TopCurrentOrder"],
    queryFn: fn,
    staleTime: 4 * 1000,
    refetchOnWindowFocus: false,
    retry: 0,
  });
  return (
    <div className="w-full min-h-10 bg-white mt-0 border-2 border-mist-400/30 p-2 px-5 flex flex-col items-start gap-2">
      <h6 className="flex flex-row gap-2 items-center">Current Order</h6>
      <div className="w-full grid grid-cols-4 gap-4 rounded-2xl border border-mist-900/10 bg-mist-200 px-4 py-3 text-sm max-md:text-xs font-semibold text-gray-700 shadow-sm">
        <div>Order ID</div>

        <div>Total Price</div>

        <div className=" md:block">Status</div>

        <div className=" md:block">Created_at</div>
      </div>
      <div className="w-full flex flex-col justify-between items-center">
        {isFetching && <LoadingBox></LoadingBox>}
        {data && data.data && data.data.length > 0 ? (
          <>
            {data.data.map(
              (data: {
                id: string;
                totalPrice: number;
                status?: any;
                created_at: string;
              }) => {
                // console.log(data.images)
                return (
                  <div
                    key={data.id}
                    className="w-full grid grid-cols-4 gap-4 px-4 py-3 text-sm max-md:text-xs"
                  >
                    <div>{data.id}</div>

                    <div>{CurrencyConvert({value:data.totalPrice ?? 0})} đ</div>

                    <div className=" md:block text-yellow-500 font-bold">{data.status==0?"Pending":"Error"}</div>

                    <div className=" md:block">{data.created_at.replace("T"," ")}</div>
                  </div>
                );
              },
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
