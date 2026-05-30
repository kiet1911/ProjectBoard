import { useState } from "react";
import { useProductionFilter } from "../../../store/productionFilter/productionFilter";

export default function FilterLayout() {
  const [filters, setFilters] = useState({
    search: "",
    maxPrice: 2000000, // Base_Price
    players: "", // Khớp với khoảng Min_Player và Max_Player
    playTime: 60, // Max_Time hoặc Min_Time
    minRating: 0, // Rating
    maxComplexity: 5, // Complexity (Thường thang điểm 1-5 trên BGG)
    age: "", // Age_Requirement
  });
  const config = useProductionFilter((state)=>state);
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <>
      <aside className="w-60 max-md:hidden bg-white rounded-2xl border border-mist-200 p-5 shadow-sm flex flex-col gap-6 h-fit sticky top-30">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-bold text-mist-900">Filter Game</h2>
          <button
            onClick={() =>
              setFilters({
                search: "",
                maxPrice: 2000000,
                players: "",
                playTime: 60,
                minRating: 0,
                maxComplexity: 5,
                age: "",
              })
            }
            className="text-xs text-red-500 hover:underline font-medium"
          >
            delete filter
          </button>
        </div>

        {/* 1. Lọc theo Giá (Base_Price) */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex justify-between">
            <span>Price :</span>
            <span className="text-xs text-emerald-600 font-bold">
              {filters.maxPrice.toLocaleString()}đ
            </span>
          </label>
          <input
            type="range"
            min="100000"
            max="3000000"
            step="50000"
            value={filters.maxPrice}
            onChange={(e) =>
              handleFilterChange("maxPrice", Number(e.target.value))
            }
            className="w-full accent-(--main-color,##db3332)"
          />
        </div>

        {/* 2. Số lượng người chơi (Min_Player / Max_Player / Prefer_Player) */}
        {/* <div className="space-y-2">
          <label className="text-sm font-semibold">Số người chơi</label>
          <select
            value={filters.players}
            onChange={(e) => handleFilterChange("players", e.target.value)}
            className="w-full border border-mist-200 rounded-xl p-2 text-sm bg-mist-50 focus:outline-none focus:border-mist-400"
          >
            <option value="">Tất cả</option>
            <option value="1">1 Người (Solo)</option>
            <option value="2">2 Người (Đối kháng)</option>
            <option value="3-4">3 - 4 Người (Nhóm nhỏ)</option>
            <option value="5">5+ Người (Party)</option>
          </select>
        </div> */}

        {/* 3. Thời gian chơi tối đa (Max_Time / Min_Time) */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex justify-between">
            <span>Thời gian chơi dưới:</span>
            <span className="text-xs text-blue-600 font-bold">
              {filters.playTime} phút
            </span>
          </label>
          <input
            type="range"
            min="15"
            max="240"
            step="15"
            value={filters.playTime}
            onChange={(e) =>
              handleFilterChange("playTime", Number(e.target.value))
            }
            className="w-full accent-blue-500"
          />
        </div>

        {/* 4. Thang điểm đánh giá (Rating) */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex justify-between">
            <span>Đánh giá tối thiểu:</span>
            <span className="text-xs text-amber-500 font-bold">
              ★ {filters.minRating}+
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={filters.minRating}
            onChange={(e) =>
              handleFilterChange("minRating", Number(e.target.value))
            }
            className="w-full accent-amber-500"
          />
        </div>

        {/* 5. Độ phức tạp / Độ khó (Complexity) */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex justify-between">
            <span>Độ phức tạp tối đa (Weight):</span>
            <span className="text-xs text-purple-600 font-bold">
              {filters.maxComplexity} / 5
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            value={filters.maxComplexity}
            onChange={(e) =>
              handleFilterChange("maxComplexity", Number(e.target.value))
            }
            className="w-full accent-purple-500"
          />
        </div>

        {/* 6. Độ tuổi yêu cầu (Age_Requirement) */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Độ tuổi tối thiểu</label>
          <div className="grid grid-cols-3 gap-2">
            {["6+", "12+", "16+"].map((age) => (
              <button
                key={age}
                type="button"
                onClick={() =>
                  handleFilterChange("age", filters.age === age ? "" : age)
                }
                className={`py-1.5 text-xs font-medium rounded-xl border transition-all ${
                  filters.age === age
                    ? "border-black bg-black text-white"
                    : "border-mist-200 bg-mist-50 hover:bg-mist-100"
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
