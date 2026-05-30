import { useEffect, useState, type ReactNode } from "react";
import PageContainer from "../../../components/PageContainer";
import { useProduction } from "../hook/useProduction";
import ProductionCard from "../../ProductionCard/components";
import FilterLayout from "./FilterLayout";

export default function ProductionPage({ children }: { children?: ReactNode }) {
 
  const { dataPro, error, loading } = useProduction();
  useEffect(() => {
    if (dataPro) {
      console.log(dataPro);
    }
  }, [dataPro]);
  return (
    <PageContainer url="../BackgroundContent/bghomepage.png">
      <div className="flex w-full min-h-screen bg-mist-50 p-4 gap-4 font-sans text-mist-800 border-4 border-double border-mist-500/50 rounded-2xl">

        <FilterLayout></FilterLayout>
        
        <main className="flex-1 flex flex-col gap-4">
          {/* THANH TOPBAR (Ô Tìm kiếm / Sắp xếp góc trên bên phải) */}
          <header className="bg-white border border-mist-200 rounded-2xl p-4 shadow-sm flex max-sm:flex-col justify-between items-center gap-4">
            <div className="text-sm text-mist-500 max-sm:self-start">
              Hiển thị <span className="font-bold text-mist-900">12</span> sản
              phẩm
            </div>

            {/* Ô nhập input tương ứng khung chữ nhật nhỏ góc trên bản vẽ của bạn */}
            <div className="flex gap-2 w-1/3 max-md:w-1/2 max-sm:w-full justify-end">
              <input
                type="text"
                placeholder="Tìm tên game..."
                // value={filters.search}
                // onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full border border-mist-200 rounded-xl py-1.5 px-3 font-normal text-sm focus:outline-none focus:border-mist-400"
              />
            </div>
          </header>

          {/* KHUNG HIỂN THỊ GRID CARD (Tương ứng khung viền xanh dương của bạn) */}
          <div className="bg-white border border-mist-200 rounded-2xl p-6 shadow-sm min-h-[500px]">
            {/* Grid responsive tự động co giãn đều đặn */}
            <div className="grid grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-2 gap-6 max-sm:gap-x-10 justify-items-center">
              {dataPro &&
                dataPro.map((data) => (
                  <li
                    key={data.id}
                    className="w-full flex justify-center max-xl:scale-90"
                  >
                    <ProductionCard data={data} />
                  </li>
                ))}
            </div>
          </div>
        </main>
      </div>
      {children}
    </PageContainer>
  );
}
