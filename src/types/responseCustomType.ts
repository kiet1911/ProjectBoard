
//response from cart api 
export type ResponseCartItems = {
    base_Price:number,
    categories: { category_Id: number; name: string }[],
    id:string,
    name:string,
    quantity:string,
}
export type ResponseGetByUserId = {
    cartItems: ResponseCartItems[],
    status:number
}

export type OrderSummary = {
    [k in keyof ResponseCartItems] : ResponseCartItems[k] ;
} & {
    checkBox: boolean;
}