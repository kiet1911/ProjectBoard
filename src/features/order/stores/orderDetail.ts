import { create } from "zustand"

type orderDetailComponent = {
    Config:{
        data:{PublicId:string,OrderId:string}|undefined
        isOpen:boolean,
    },
    Active:(res:{PublicId:string,OrderId:string})=>void,
    Clear:()=>void,
}

export const useOrderDetailComponent = create<orderDetailComponent>()((set)=>({
    Config:{
        data:undefined,
        isOpen:false,
    },
    Active: (res: {PublicId:string,OrderId:string}) => set({ Config: { data: res, isOpen: true } }),
    Clear: () => set({ Config: { data: undefined, isOpen: false } }),
}))