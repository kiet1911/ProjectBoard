import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { VnPayResult } from "../types";
import PageContainer from "../components/PageContainer";
import { CurrencyConvert } from "../features/ProductionCard/utilities/currencyConverter";
import { parseVnpayDate } from "../utility/parseVnpayDate";
import { paymentService } from "../services/payment.service";
import useAuthStore from "../store/authentication/authState";
import { useShallow } from "zustand/shallow";
import { useToastNotification } from "../store/notification/notification";

type PaymentState = {
  type: "success" | "cancelled" | "failed";
  title: string;
  message: string;
};

const getPaymentResult = (
  responseCode?: string,
  transactionStatus?: string,
): PaymentState => {
  if (responseCode === "00" && transactionStatus === "00") {
    return {
      type: "success",
      title: "Payment Successful",
      message: "Your payment has been processed successfully.",
    };
  }

  if (responseCode === "24") {
    return {
      type: "cancelled",
      title: "Payment Cancelled",
      message: "You cancelled the payment transaction.",
    };
  }

  return {
    type: "failed",
    title: "Payment Failed",
    message: "The payment could not be completed.",
  };
};

export default function VnPayPaymentResult() {
  const publicId = useAuthStore(useShallow((state) => state.publicId));
  const toastNotification = useToastNotification((state) => state.add);
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<VnPayResult | null>(null);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries()) as VnPayResult;

    const { vnp_TxnRef, vnp_ResponseCode, vnp_TransactionStatus } = params;

    if (!vnp_TxnRef || !vnp_ResponseCode || !vnp_TransactionStatus) {
      setError("Transaction details from VNPay are missing.");

      setLoading(false);

      window.history.replaceState({}, document.title, window.location.pathname);

      return;
    }

    setResult(params);

    const confirmPayment = async () => {
      try {
        const data = await paymentService.confirmPayment(
          "v1/Payment/ConfirmPayment",
          {
            PublicId: publicId,
            txnRef: vnp_TxnRef,
            responseCode: vnp_ResponseCode,
            transactionStatus: vnp_TransactionStatus,
          },
        );
        if (data.message) {
          toastNotification({ text: data.message, type: "success" });
        }
        console.log(data);
      } catch (err) {
        console.error(err);
        setError("The payment verification process failed.");
        toastNotification({ text: "The payment verification process failed.", type: "error" });
      } finally {
        setLoading(false);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      }
    };

    confirmPayment();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--main-color) mx-auto" />

          <p className="mt-4 text-gray-600">Processing payment result...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <PageContainer url="../BackgroundContent/bghomepage.png">
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl max-w-md">
            <h2 className="text-xl font-bold text-red-700">Payment Error</h2>

            <p className="mt-2 text-red-600">{error}</p>

            <button
              onClick={() => (window.location.href = "/")}
              className="mt-6 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </PageContainer>
    );
  }

  const paymentResult = getPaymentResult(
    result?.vnp_ResponseCode,
    result?.vnp_TransactionStatus,
  );

  const styles = {
    success: {
      container: "bg-green-50 border-green-200",
      title: "text-green-700",
      button: "bg-green-600 hover:bg-green-700",
    },

    cancelled: {
      container: "bg-yellow-50 border-yellow-200",
      title: "text-yellow-700",
      button: "bg-yellow-600 hover:bg-yellow-700",
    },

    failed: {
      container: "bg-red-50 border-red-200",
      title: "text-red-700",
      button: "bg-red-600 hover:bg-red-700",
    },
  };

  const currentStyle = styles[paymentResult.type];

  return (
    <PageContainer url="../BackgroundContent/bghomepage.png">
      <div className="flex justify-center items-center min-h-screen">
        <div
          className={`border p-6 rounded-xl max-w-md w-full ${currentStyle.container}`}
        >
          <h2 className={`text-xl font-bold ${currentStyle.title}`}>
            {paymentResult.title}
          </h2>

          <p className="mt-2 text-slate-600">{paymentResult.message}</p>

          <div className="mt-5 space-y-2 text-sm">
            <p>
              <span className="font-semibold">Transaction Code:</span>{" "}
              {result?.vnp_TxnRef}
            </p>

            <p>
              <span className="font-semibold">Amount:</span>{" "}
              {CurrencyConvert({
                value: result?.vnp_Amount ? Number(result.vnp_Amount) / 100 : 0,
              })}
              {" đ"}
            </p>

            <p>
              <span className="font-semibold">Bank:</span>{" "}
              {result?.vnp_BankCode ?? "Unknown"}
            </p>

            <p>
              <span className="font-semibold">Payment Date:</span>{" "}
              {parseVnpayDate(result?.vnp_PayDate!).toLocaleString("vi-vn") ??
                "Unknown"}
            </p>

            <p>
              <span className="font-semibold">Response Code:</span>{" "}
              {result?.vnp_ResponseCode}
            </p>

            <p>
              <span className="font-semibold">Transaction Status:</span>{" "}
              {result?.vnp_TransactionStatus}
            </p>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className={`mt-6 px-4 py-2 rounded-lg text-white ${currentStyle.button}`}
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </PageContainer>
  );
}
