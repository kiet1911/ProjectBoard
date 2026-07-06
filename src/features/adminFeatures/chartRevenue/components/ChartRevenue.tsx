import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FetchRevenue } from "../services/RevenueChartService";
import { CurrencyConvert } from "../../../ProductionCard/utilities/currencyConverter";
export default function ChartRevenue() {
  const [filter, setFilter] = useState("month");
  const { data } = useQuery({
    queryKey: ["revenue", filter],
    queryFn: async () => {
      const res = await FetchRevenue(filter);
      return res;
    },
    refetchOnWindowFocus: false,
    staleTime: 4 * 1000,
    retry: 0,
  });
  useEffect(() => {
    if (data && data.data !== undefined) {
      console.log(data.data);
    }
  }, [data]);
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 100000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return `${CurrencyConvert({ value: value }) ?? 0}đ`;
  };
  return (
    <div className="w-full min-h-10 bg-white mt-0 border-2 border-mist-400/30 p-2 px-5 flex flex-col gap-2 justify-between items-center">
      <div className="py-2 flex flex-row justify-between w-full">
        <div>
          <h6>Revenue report</h6>
        </div>
        <div className="text-mist-400">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="today">Today</option>

            <option value="week">This Week</option>

            <option value="month">This Month</option>

            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      <div className="w-full p-2 border">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data && data.data !== undefined && data.data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis
              tickFormatter={formatCurrency}
              width={80}
              domain={[0, "dataMax"]}
            />

            <Tooltip
              formatter={(value) => {
                if (value) {
                  return (
                    CurrencyConvert({ value: Number(value.toString()) }) + "đ"
                  );
                } else {
                  return "NaN";
                }
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              dot={{
                r: 4,
                fill: "#3b82f6",
                stroke: "#3b82f6",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
