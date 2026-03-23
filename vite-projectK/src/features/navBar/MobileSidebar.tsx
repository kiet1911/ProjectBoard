import { NavLinks } from "./NavLinks.tsx";
import { X } from "lucide-react";

export const MobileSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <div className={`fixed inset-0 z-50 duration-300 ${isOpen ? "visible" : "invisible"}`}>
    <div
      className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    />

    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-5">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose}>
            <X size={20} className=" p-1 rounded-full hover:bg-mist-200" />
          </button>
        </div>

        <NavLinks className="flex flex-col gap-4" onClick={onClose} />
      </div>
    </div>
  </div>
);
