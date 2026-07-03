import MetricCards from "../../features/adminFeatures/metricCard/components/MetricCard";

export default function DashBoardPage() {

  return (
    <>
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="w-full h-full px-0">
        <MetricCards></MetricCards>
      </div>
    </>
  );
}
