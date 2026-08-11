import type { OrderTransactionStatus } from "../features/adminFeatures/dasboard-edit-create/stores/serivcesType";


export function enumStoreOrder(status: number) {
  switch (status) {
    case 1:
      return {
        text: "Confirmed",
        color: "text-green-600 bg-green-100"
      };
    case 2:
      return {
        text: "Cancelled",
        color: "text-red-600 bg-red-100"
      };
    case 3:
      return {
        text: "Refunded",
        color: "text-orange-600 bg-orange-100"
      };
    case 4:
      return {
        text: "Shipping",
        color: "text-blue-600 bg-blue-100"
      };
    case 5:
      return {
        text: "Delivered",
        color: "text-purple-600 bg-purple-100"
      };
    default:
      return {
        text: "Pending",
        color: "text-yellow-600 bg-yellow-100"
      };
  }
}
export function enumStoreBoardGameStatus(status: number) {
  switch (status) {
    case 2: return "OutStock"
    case 1: return "Inactive"
    default: return "Active"
  }
}

export function enumStoreCategoryStatusConvertToNumber(status: string) {
  switch (status) {
    case "Active": return 0;
    case "Inactive": return 1;
    default: return 2;
  }
}

export function enumStorePublisherTypeConvertToString(type: number) {
  switch (type) {
    case 0: return { name: "Author", color: "" };
    case 1: return { name: "Artist", color: "" };
    case 2: return { name: "Designer", color: "" };
    case 3: return { name: "Publisher", color: "" };
    default: return { name: "NaN", color: "" };
  }
}

export function enumStorePublisherStatusConvertToString(type: number) {
  switch (type) {
    case 0: return { name: "Active", color: "" };
    case 1: return { name: "Inactive", color: "" };
    case 2: return { name: "Banned", color: "" };
    default: return { name: "NaN", color: "" };
  }
}
export function enumStoreOrderStatusConvertToString(type: number) {
  switch (type) {
    case 0: return { name: "Pending", color: "yellow" }
    case 1: return { name: "Confirmed", color: "green" }
    case 2: return { name: "Cancelled", color: "red" }
    case 3: return { name: "Refunded", color: "orange" }
    case 4: return { name: "Shipping", color: "blue" }
    case 5: return { name: "Delivered", color: "purple" }
  }
}

export function enumStoreBookingStatusConvertToString(type: number){
  switch(type){
    case 0 : return {name: "Pending", color: "yellow"}
    case 1 : return {name: "Confirmed", color: "green"}
    case 2 : return {name: "Arrived", color: "blue"}
    case 3 : return {name: "Cancelled", color: "red"}
    case 4 : return {name: "Rejected", color: "red"}
  }
}

export function enumStoreOrderStatusTransactionConvert(dataType: OrderTransactionStatus) {

  if (dataType == null || dataType == undefined) {
    return "Response transaction was not found";
  }

  if (dataType.vnp_ResponseCode != null) {
    switch (dataType.vnp_ResponseCode) {
      case "00":
        switch (dataType.vnp_TransactionStatus) {
          case "00":
            return "Payment successful";
          case "01":
            return "Transaction pending";
          case "02":
            return "Transaction failed";
          case "04":
            return "Transaction reversed";
          case "05":
            return "Refund is being processed";
          case "06":
            return "Refund request sent to bank";
          case "07":
            return "Suspected fraud";
          case "08":
            return "Payment timeout";
          case "09":
            return "Refund rejected";
          case "10":
            return "Order delivered";
          case "11":
            return "Transaction cancelled";
          case "20":
            return "Transaction settled with merchant";
          default:
            return `Unknown status (${dataType.vnp_TransactionStatus})`;
        }
      case "94":
        return "Request is duplicated";
    }
  }

  // if(dataType.vnp_ResponseCode == "00"){

  // }

  // if(dataType.vnp_ResponseCode == "94"){
  //   return "Request is duplicated";
  // }

  return "Something went wrong!"
}