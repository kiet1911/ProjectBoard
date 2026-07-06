import { useQueries } from "@tanstack/react-query";
import {
  FetchCancelledQuery,
  FetchOrderQuery,
  FetchUserQuery,
} from "../services/UserQueryService";
import { LoadingBox } from "../../../../components/LoadingBox";
export default function MetricCards() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["user_number"],
        queryFn: FetchUserQuery,
        staleTime: 4 * 1000,
        refetchOnWindowFocus: false,
        retry: 0,
      },
      {
        queryKey: ["order_number"],
        queryFn: FetchOrderQuery,
        staleTime: 4 * 1000,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["cancel_number"],
        queryFn: FetchCancelledQuery,
        staleTime: 4 * 1000,
        refetchOnWindowFocus: false,
      },
    ],
  });
  const [userQuery, orderQuery, cancelledQuery] = results;
  const subtitle = ["Customer","Order","Cancelled"]; 
  return (
    <div className="w-full min-h-10 bg-white mt-0 border-2 border-mist-400/30 p-2 px-5 flex flex-col items-start gap-2">
      <h6>Short 90 days report</h6>
      <div className="w-full flex flex-row justify-between items-center">
        {[userQuery, orderQuery, cancelledQuery].map((data, index) => {
        return (
          <div key={index} className={`relative ${data.isFetching ? "" : ""}`}>
            {data.isFetching && <LoadingBox></LoadingBox>}
            <h6 className="font-medium text-sm text-center">{subtitle[index] || "Null"}</h6>
            <p className="text-2xl font-bold text-white text-center w-full bg-(--main-color) border">
              {data.data && data.data.data} {data.isError && "Error."}
            </p>
            <p className="text-sm font-normal text-mist-500">Last 90 Days</p>
          </div>
        );
      })}
      </div>
    </div>
  );
}
