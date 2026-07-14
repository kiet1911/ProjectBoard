

export function enumStoreOrder(status: number){
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
export function enumStoreBoardGameStatus(status:number){
  switch(status){
    case 2 : return "OutStock"
    case 1 : return "Inactive"
    default : return "Active"
  }
}

export function enumStoreCategoryStatusConvertToNumber(status:string){
  switch(status){
    case "Active": return 0;
    case "Inactive": return 1;
    default : return 2;
  }
}