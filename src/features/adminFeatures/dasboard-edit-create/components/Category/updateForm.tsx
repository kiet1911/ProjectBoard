import { useCallback, useEffect, useState } from "react";
import type { CategoryDTO } from "../../stores/serivcesType";
import { CategoryStatus } from "../../stores/enum.service.store";
import { useConfirmContent, useToastNotification } from "../../../../../store/notification/notification";
import { useShallow } from "zustand/shallow";
import { useMutation } from "@tanstack/react-query";
import { category_service_dashboard } from "../../services/category.service";
import { useUpdateContainer } from "../../stores/updateContainer";

export default function UpdateForm({data,gridApi}:{data:Required<CategoryDTO>,gridApi:()=>void}){
    const [form,setForm] = useState<Required<CategoryDTO>>(data);
    const confirm = useConfirmContent(useShallow(state=>state.active));
    const updateForm = useUpdateContainer(useShallow(state=>state.close));
    const notification = useToastNotification(useShallow(state=>state.add));
    const mutation = useMutation({
      mutationKey: ["data_category",form],
      mutationFn: async()=>{
        // console.log(form);
        const res = await category_service_dashboard.updateCategory(form);
        return res;
      },
      onSuccess: (config)=>{
        if(config.data && config.data.message){
            notification({text:config.data.message,type:"success"});
            gridApi();
            updateForm();
        }
        // console.log(config);
      },
      onError: (error)=>{
        // console.log(error);
        notification({text:error.message,type:"error"});
      }
    })
    const handleConfirm= useCallback(async()=>{
        const confirmValue = await confirm("Are your sure to update this Category");
        //  console.log(form);
        if(confirmValue){
            // console.log("success");
            await mutation.mutateAsync();
        }
        else{
        
        }
    },[data]);
    return<>
        <form key={data.id} className="w-full h-full" action="" method="post" onSubmit={(e)=>{e.preventDefault();e.stopPropagation()}}>
         <fieldset className="w-full flex flex-col gap-2 px-1 items-start justify-center font-medium">
            <legend className="text-xl font-medium ">Update Category information</legend>
            <div className=" space-x-2 mt-2 w-full flex flex-row">
                <label className="shrink-0" htmlFor="Name">Name :</label>
                <input className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal" type="text" name="Name" id="Name" maxLength={256} minLength={1} defaultValue={form.name.toString()??" "} required onChange={(e)=>{
                    setForm({...form,name:e.target.value});
                }} />
            </div>
            <div className=" space-x-2 w-full flex flex-row ">
                <label className=" shrink-0" htmlFor="Description">Description :</label>
                <textarea className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal" rows={5} maxLength={256} minLength={1} name="Description" id="Description" defaultValue={form.description.toString().trim() ?? " "} required onChange={(e)=>{
                    setForm({...form,description:e.target.value});
                }} />
            </div>
            <div className=" space-x-2">
                <label htmlFor="Status">Status :</label>
                <select className="border px-0.5 rounded font-normal" name="Status" id="Status" required defaultValue={form.status ?? 0} onChange={(e)=>{ setForm({...form,status:Number(e.target.value)});}}>
                    {CategoryStatus.map((data,index)=>{
                        return <>
                            {index === form.status ? <option value={index} >{data}</option>:<option value={index}>{data}</option>}
                        </>
                    })}
                </select>
            </div>
         </fieldset>
         <button type="button" onClick={handleConfirm} className="navbar-link hover:bg-(--main-color) hover:text-white my-2 mx-2 relative float-right">
            <span>Save change</span>
         </button>
        </form>
    </>
}