import { useQueries } from "@tanstack/react-query";

export default function MetricCards() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["user_number"],
        queryFn: () => {},
        staleTime: 4 * 1000,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["order_number"],
        queryFn: () => {},
        staleTime: 4 * 1000,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["cancel_number"],
        queryFn: () => {},
        staleTime: 4 * 1000,
        refetchOnWindowFocus: false,
      },
    ],
  });
  const [userQuery, orderQuery, cancelQuery] = results;
  return (
    <div className="w-full min-h-10 bg-white mt-2 border-2 border-mist-400/30 rounded-lg p-2 px-5 flex flex-row justify-between items-center">
      {/* customer */}
      <div>
        <h6 className="font-medium text-sm">Customers</h6>

        <p className="text-sm font-normal text-mist-500">Last 90 Days</p>
      </div>
      {/* customer */}
      <div>
        <h6 className="font-medium text-sm">Customers</h6>

        <p className="text-sm font-normal text-mist-500">Last 90 Days</p>
      </div>
      {/* customer */}
      <div>
        <h6 className="font-medium text-sm">Customers</h6>

        <p className="text-sm font-normal text-mist-500">Last 90 Days</p>
      </div>
    </div>
  );
}
