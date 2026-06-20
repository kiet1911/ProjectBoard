
//check out zustand 

import { create } from "zustand"

//state checkout component 
interface CheckOutState {
    config:{
        isCheckout:boolean
        cartItems: {CartId:string,Quantity:number}[] | null
    }
    active: (x:{CartId:string,Quantity:number}[])=>void
    clear:()=>void
}

export const useCheckOutComponent = create<CheckOutState>()((set)=>({
    config:{
        isCheckout:false,
        cartItems:null
    },
    active:(x:{CartId:string,Quantity:number}[])=>{
        set(({config:{isCheckout:true,cartItems:x}}))
    },
    clear:()=>{
        set(({config:{isCheckout:false,cartItems:null}}))
    }
}))