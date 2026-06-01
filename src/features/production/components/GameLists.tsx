import ProductionCard from "../../ProductionCard/components";

export default function GameLists({ gameLists }: { gameLists: [] }) {
  return (
    <>
      <div className="bg-white border border-mist-200 rounded-2xl p-6 shadow-sm min-h-125">
        <div className="grid grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-2 gap-6 max-sm:gap-x-10 justify-items-center">
          {gameLists &&
            gameLists.map((data: any) => (
              <li
                key={data.id}
                className="w-full flex justify-center max-xl:scale-90"
              >
                <ProductionCard data={data} />
              </li>
            ))}
        </div>
      </div>
    </>
  );
}
