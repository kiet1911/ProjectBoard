import { Suspense, useCallback, useEffect, useState } from "react";
import { CurrencyConvert } from "../../ProductionCard/utilities/currencyConverter";
import type { RecipientInfo } from "../../../types";
import { User } from "lucide-react";
import { useConfirmContent } from "../../../store/notification/notification";
import { orderService } from "../../../services/order.service";
type CartItem = {
  cartId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};
export const CheckBill = ({
  cartItems,
  cartToken,
  handleClear,
}: {
  cartItems: CartItem[];
  cartToken?: string;
  handleClear: () => void;
}) => {
  const confirmBtn = useConfirmContent((state) => state.active);
  const [recipient, setRecipient] = useState<RecipientInfo>({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });
  const [vnPay, setVnPay] = useState<String>();
  useEffect(() => {
    if (vnPay) {
      console.log(vnPay);
      window.location.href = vnPay.toString();
    }
  }, [vnPay]);
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const confirm = await confirmBtn("Would you like to pay the bill?");
      if (confirm) {
        //call api confirm;
        if (cartToken) {
          const fetch = async () => {
            try {
              const res = await orderService.GetVnpayUrl("v1/Payment/Vnpay", {
                JWT: cartToken,
                fullName: recipient.fullName,
                address: recipient.address,
                phone: recipient.phone,
                note: recipient.note,
              });
              console.log(res.data);
              if (res.data.vnPayUrl) {
                // window.location.href = res.data.VnPayUrl;
                return res.data.vnPayUrl;
              }
            } catch (error) {
              console.log(error);
            }
          };

          const data = await fetch();
          if (data) {
            setVnPay(data);
          }

          // console.log("Recipient Info:", recipient);
          // console.log("Carts:", cartItems);
        } else {
          console.log("token does not exist");
        }
      }
    },
    [recipient],
  );
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
  const shipping = 30000;
  const total = subtotal + shipping;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setRecipient((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full w-full mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-auto"
    >
      <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2 mt-2">
        <span className="bg-(--main-color) w-1 h-8 rounded-full"></span>
        Payment Invoice
      </h1>
      <div className="mb-6 p-4 bg-gray-50/70 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-(--main-color)"></User>
          Recipient Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={recipient.fullName}
              onChange={handleChange}
              required
              placeholder="Nguyen Van A"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition bg-white"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              pattern="^\+?[0-9]{7,14}$"
              id="phone"
              name="phone"
              value={recipient.phone}
              onChange={handleChange}
              required
              placeholder="0123456789"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition bg-white"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Delivery Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={recipient.address}
              onChange={handleChange}
              required
              placeholder="123 Street, Ward, District, City"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Order Notes (Optional)
            </label>
            <textarea
              id="note"
              name="note"
              value={recipient.note}
              onChange={handleChange}
              rows={2}
              placeholder="Any special requests..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition bg-white resize-none"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50/50">
        <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100/80 p-3 text-sm font-semibold text-gray-600 border-b border-gray-200">
          <div className="col-span-5">Products</div>
          <div className="col-span-3 text-center">Unit price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total amount</div>
        </div>

        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div
              key={item.cartId}
              className="p-3 md:p-4 flex flex-col md:grid md:grid-cols-12 md:gap-4 items-start md:items-center bg-white hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3 w-full md:col-span-5">
                <Suspense
                  fallback={
                    <div className="w-12 h-12 shrink-0 bg-gray-200 rounded-lg animate-pulse" />
                  }
                >
                  <img
                    src="./Suspense/SuspenseImage.png"
                    alt={item.name}
                    loading="lazy"
                    className="w-12 h-12 object-cover rounded-lg shrink-0 border border-gray-100"
                  />
                </Suspense>
                <span className="truncate font-medium text-gray-800 text-sm sm:text-base">
                  {item.name}
                </span>
              </div>

              <div className=" md:block md:col-span-3 max-md:text-right text-center w-full text-gray-600 text-sm">
                {CurrencyConvert({ value: item.unitPrice })}đ
              </div>

              <div className="md:col-span-2 flex justify-center items-center gap-2 mt-2 md:mt-0 w-full md:w-auto max-md:justify-end-safe">
                <span className="px-4 py-1 border border-gray-300 rounded-lg text-sm bg-white shadow-sm">
                  {item.quantity}
                </span>
              </div>

              <div className="hidden md:block md:col-span-2 text-right font-medium text-(--main-color)">
                {CurrencyConvert({ value: item.quantity * item.unitPrice })}đ
              </div>

              <div className="md:hidden w-full flex justify-between mt-2 pt-2 border-t border-gray-100 text-sm text-gray-600">
                <span>Total amount:</span>
                <span className="font-medium text-(--main-color)">
                  {CurrencyConvert({ value: item.quantity * item.unitPrice })}đ
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4 space-y-2 bg-gray-50/60 p-4 rounded-xl">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Provisional Invoice</span>
          <span className="font-medium">
            {CurrencyConvert({ value: subtotal })}đ
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery charges</span>
          <span className="font-medium">
            {CurrencyConvert({ value: shipping })}đ
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-800 border-t border-gray-300 pt-3 mt-1">
          <span>Total</span>
          <span className="text-(--main-color) text-xl">
            {CurrencyConvert({ value: total })}đ
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="flex-1 bg-(--main-color) text-white rounded navbar-link"
        >
          Pay now
        </button>
        <button
          type="button"
          className="flex-1 border border-gray-300 text-gray-700 rounded navbar-link"
          onClick={handleClear}
        >
          Back to your basket
        </button>
      </div>
    </form>
  );
};
