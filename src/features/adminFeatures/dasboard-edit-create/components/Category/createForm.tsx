import { useCallback, useState } from "react";
import type { CategoryDTO } from "../../stores/serivcesType";
import {
  useConfirmContent,
  useToastNotification,
} from "../../../../../store/notification/notification";
import { useCreateContainer } from "../../stores/createContainer";
import { useShallow } from "zustand/shallow";
import { CategoryStatus } from "../../stores/enum.service.store";
import { useMutation } from "@tanstack/react-query";
import { category_service_dashboard } from "../../services/category.service";

export default function CreateForm({
  data,
  gridApi,
}: {
  data: Required<CategoryDTO>;
  gridApi: () => void;
}) {
  const [form, setForm] = useState<CategoryDTO>(data);
  const confirm = useConfirmContent(useShallow((state) => state.active));
  const createForm = useCreateContainer(useShallow((state) => state.close));
  const notification = useToastNotification(useShallow((state) => state.add));
      const mutation = useMutation({
      mutationKey: ["data_create_category",form],
      mutationFn: async()=>{
        // console.log(form);
        const res = await category_service_dashboard.addCategory(form);
        return res;
      },
      onSuccess: (config)=>{
        if(config.data && config.data.message){
            notification({text:config.data.message,type:"success"});
            gridApi();
            createForm();
        }
        // console.log(config);
      },
      onError: (error)=>{
        // console.log(error);
        notification({text:error.message,type:"error"});
      }
    })
    const handleConfirm= useCallback(async()=>{
          const confirmValue = await confirm("Are your sure to add this Category");
          //  console.log(form);
          if(confirmValue){
              // console.log("success");
              await mutation.mutateAsync();
          }
          else{
          
          }
    },[form]);
  return <>
    <form key={data.id} className="w-full h-full" action="" method="post" onSubmit={(e)=>{e.preventDefault();e.stopPropagation();handleConfirm();}}>
            <fieldset className="w-full flex flex-col gap-2 px-1 items-start justify-center font-medium">
                <legend className="text-xl font-medium ">Add Category information</legend>
                <div className=" space-x-2 mt-2 w-full flex flex-row">
                    <label className="shrink-0" htmlFor="Name">Name :</label>
                    <input placeholder="ABCDEFG" className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal" type="text" name="Name" id="Name" maxLength={256} minLength={1} defaultValue={form.name.toString()??" "} required onChange={(e)=>{
                        setForm({...form,name:e.target.value});
                    }} />
                </div>
                <div className=" space-x-2 w-full flex flex-row ">
                    <label className=" shrink-0" htmlFor="Description">Description :</label>
                    <textarea placeholder="Hello world,..." className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal" rows={5} maxLength={256} minLength={1} name="Description" id="Description" defaultValue={form.description.toString().trim() ?? " "} required onChange={(e)=>{
                        setForm({...form,description:e.target.value});
                    }} />
                </div>
                <div className=" space-x-2">
                    <label htmlFor="Status">Status :</label>
                    <select className="border px-0.5 rounded font-normal" name="Status" id="Status" required defaultValue={form.status ?? 0} onChange={(e)=>{ setForm({...form,status:Number(e.target.value)});}}>
                        {CategoryStatus.map((data,index)=>{
                            return <option key={index+data+index} value={index} >{data}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <button type="submit" className="navbar-link hover:bg-(--main-color) hover:text-white my-2 mx-2 relative float-right">
                <span>Save change</span>
            </button>
    </form>
  </>;
}
