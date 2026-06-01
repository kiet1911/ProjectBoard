import { Menu } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ toggle }: { toggle: () => void }) {
    const [isActive , setActive ] = useState<boolean>(false);
    
    return (
    <>
      <header className="bg-white border border-mist-200 rounded-2xl p-4 shadow-sm flex max-sm:flex-col justify-between items-center gap-4">
        <div className="text-sm text-mist-500 max-sm:self-start">
          <button
            className={`max-md:visible invisible border rounded-xl py-1.5 px-3 shadow-sm cursor-pointer flex flex-row items-center gap-1 ${isActive?"bg-mist-500/50 text-white":"border-mist-200"}`}
            onClick={()=>{
                toggle();
                setActive(!isActive);
            }}
          >
            {" "}
           <Menu size={15}></Menu>Filter
          </button>
        </div>

        <div className="flex gap-2 w-1/3 max-md:w-1/2 max-sm:w-full justify-end">
          <input
            type="text"
            placeholder="Find name game..."
            // value={filters.search}
            // onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full border border-mist-200 rounded-xl py-1.5 px-3 font-normal text-sm focus:outline-none focus:border-mist-400"
          />
        </div>
      </header>
    </>
  );
}
