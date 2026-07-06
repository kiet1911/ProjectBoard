import { Triangle } from "lucide-react";
import ChartRevenue from "../../features/adminFeatures/chartRevenue/components/ChartRevenue";
import MetricCards from "../../features/adminFeatures/metricCard/components/MetricCard";
import ProductionAnalyst from "../../features/adminFeatures/productionAnalyst/components/ProductionAnalyst";
import { FetchProductionAnalyst } from "../../features/adminFeatures/productionAnalyst/services/productionAnalystService";
import TopCurrentOrder from "../../features/adminFeatures/topCurrentOrder/components/TopCurrentOrder";
import { FetchCurrentOrder } from "../../features/adminFeatures/topCurrentOrder/services/topCurrentOrderService";

export default function DashBoardPage() {
  return (
    <>
      <div className="">
        <h1 className="text-xl font-bold py-2 px-1 bg-white border-2 border-mist-400/30">
          Dashboard
        </h1>
        <div className="w-full h-full px-0 space-y-0">
          <MetricCards></MetricCards>
          <ChartRevenue></ChartRevenue>
          <div className="flex flex-row gap-2 max-md:flex-col">
            <ProductionAnalyst title="Top Sell" icons={<Triangle size={20} className="fill-green-500"></Triangle>} fn={FetchProductionAnalyst.TopMostSell} ></ProductionAnalyst>
            <ProductionAnalyst title="Low Stock" icons={<Triangle size={20} className="fill-red-500 rotate-180"></Triangle>} fn={FetchProductionAnalyst.LowStock} ></ProductionAnalyst>
          </div>
          <TopCurrentOrder fn={FetchCurrentOrder.TopCurrentOrder}></TopCurrentOrder>
        </div>
      </div>
    </>
  );
}
