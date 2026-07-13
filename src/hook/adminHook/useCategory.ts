import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

const useCategorySwitchStatusHook = useCallback((id:string)=>{
    const mutation = useMutation({
        mutationFn: async()=>{
            
        }
    })
    mutation.mutate();
},[])