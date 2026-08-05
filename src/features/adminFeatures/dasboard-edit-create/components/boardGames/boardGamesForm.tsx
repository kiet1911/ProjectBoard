import { BoardGameStatus } from "../../stores/enum.service.store";
import type { BoardGameDTO } from "../../stores/serivcesType";

export default function BoardGameForm({
  handleUpdate,
  form,
  handleChange,
  typeForm
}: {
  handleUpdate: () => Promise<void>;
  form: BoardGameDTO;
  handleChange:(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement, Element>) => void;
  typeForm: "add" | "update"
}) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleUpdate();
        }}
        className="w-full"
      >
        <fieldset className="w-full flex flex-col gap-4 px-1 items-start justify-center font-medium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-h-120 overflow-y-auto">
            <fieldset className="border p-3 flex flex-col gap-2">
              <legend className="px-2">Basic Information</legend>

              <div className="flex flex-row gap-2 items-start">
                <label className="w-36 shrink-0 text-left">Id :</label>
                <input
                  disabled
                  value={form.id || ""}
                  className="w-full border px-1 rounded font-normal bg-gray-100"
                />
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 shrink-0 text-left">Name :</label>
                <input
                  name="name"
                  value={form.name || ""}
                  minLength={10}
                  maxLength={256}
                  required
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal focus:border-(--main-color)"
                />
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 shrink-0 text-left">Status :</label>

                <select
                  name="status"
                  disabled={typeForm === "update"?false:true}
                  value={form.status || 0}
                  onChange={(e)=> { if(typeForm === "update"){handleChange(e)} }}
                  className={`w-full border px-0 rounded font-normal ${typeForm === "update"?"":"bg-gray-100"}`}
                >
                 
                  { BoardGameStatus.map((data, index) => {
                    return (
                      <option key={data + index} value={index}>
                        {data}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 shrink-0 text-left">Created :</label>

                <input
                  disabled
                  value={form.created_at.replace("T", " ") || ""}
                  className="w-full border px-1 rounded font-normal bg-gray-100"
                />
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 shrink-0 text-left">Updated :</label>

                <input
                  disabled
                  value={form.updated_at.replace("T", " ") || ""}
                  className="w-full border px-1 rounded font-normal bg-gray-100"
                />
              </div>
            </fieldset>

            <fieldset className="border p-3 flex flex-col gap-2">
              <legend className="px-2">Inventory</legend>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 text-left">Base Price :</label>

                <input
                  type="number"
                  name="base_Price"
                  value={form.base_Price || 0}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 text-left">Stock :</label>

                <input
                  type="number"
                  name="stock_Quantity"
                  disabled={true}
                  value={form.stock_Quantity || 0}
                  className="w-full border px-1 rounded font-normal bg-gray-100"
                />
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 text-left">Reservation :</label>

                <input
                  type="number"
                  name="reservation_Quantity"
                  disabled={true}
                  value={form.reservation_Quantity || 0}
                  className="w-full border px-1 rounded font-normal bg-gray-100"
                />
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 text-left">Sold :</label>

                <input
                  type="number"
                  name="sold_Quantity"
                  disabled={true}
                  value={form.sold_Quantity || ""}
                  className="w-full border px-1 rounded font-normal bg-gray-100"
                />
              </div>
            </fieldset>

            <fieldset className="border p-3 flex flex-col gap-2">
              <legend className="px-2">Dimension</legend>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 text-left">Weight :</label>

                <input
                  type="number"
                  name="weight"
                  step={0.1}
                  min={0}
                  max={100}
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 text-left">Size :</label>

                <input
                  type="number"
                  name="size_X"
                  step={0.1}
                  min={0}
                  value={form.size_X}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />

                <span>x</span>

                <input
                  type="number"
                  name="size_Y"
                  step={0.1}
                  min={0}
                  value={form.size_Y}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />

                <span>x</span>

                <input
                  type="number"
                  name="size_Z"
                  step={0.1}
                  min={0}
                  value={form.size_Z}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />
              </div>
            </fieldset>

            <fieldset className="border p-3 flex flex-col gap-2">
              <legend className="px-2">Gameplay</legend>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 text-left">Players :</label>

                <input
                  type="number"
                  name="min_Player"
                  min={0}
                  value={form.min_Player}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />

                <span>~</span>

                <input
                  type="number"
                  name="max_Player"
                  min={0}
                  value={form.max_Player}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 text-left">Time :</label>

                <input
                  type="number"
                  name="min_Time"
                  min={0}
                  value={form.min_Time}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />

                <span>~</span>

                <input
                  type="number"
                  name="max_Time"
                  min={0}
                  value={form.max_Time}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 text-left">Prefer Player :</label>

                <input
                  type="number"
                  name="prefer_Player"
                  min={0}
                  value={form.prefer_Player}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 text-left">Complexity :</label>

                <input
                  type="number"
                  step="0.01"
                  name="complexity"
                  min={0}
                  value={form.complexity}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 text-left">Rating :</label>

                <input
                  type="number"
                  step="0.1"
                  name="rating"
                  min={0}
                  max={10}
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />
              </div>

              <div className="flex flex-row gap-2 items-center">
                <label className="w-36 text-left shrink-0">
                  Age Requirement :
                </label>

                <input
                  type="number"
                  name="age_Requirement"
                  min={0}
                  value={form.age_Requirement}
                  onChange={handleChange}
                  className="w-full border px-1 rounded font-normal"
                />
              </div>
            </fieldset>
          </div>

          <div className="w-full flex justify-end gap-2 mt-0 mb-2">
            <button
              type="submit"
              className="navbar-link hover:bg-(--main-color) hover:text-white duration-200"
            >
              <span className="capitalize">{typeForm}</span>
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
