
export interface OrderDetail{
    nameRecipient:string,
    phone:string,
    note:string,
    address:string,
    id:string,
    created_at:string,
    status:boolean,
    totalPrice:number,
    urlVnPay:string
    orderItems:OrderItems[]
}
export interface OrderItems{
    quantity:number,
    unitPrice:number,
    boardGame:BoardGame
}
interface BoardGame{
    name:string
    boardGameImage:[]
}
