import type React from "react";
import { create } from "zustand";

interface update {
    status:boolean,
    node:React.ReactNode,
    active:(x:React.ReactNode)=>void,
    close:()=>void,
}

export const useUpdateContainer = create<update>()((set)=>({
    status:false,
    node:undefined,
    active:(x:React.ReactNode)=> {
        set({status:true,node:x});
    },
    close:()=>{
        set({status:false,node:undefined});
    }
}))