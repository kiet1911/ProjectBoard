import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../services/adminServices/dashboard.service";
import { useEffect } from "react";
import { useToastNotification } from "../../store/notification/notification";
import { useShallow } from "zustand/shallow";

export default function DashBoardPage() {
  const useToast = useToastNotification(useShallow((state) => state.add));
  // const { data } = useQuery({
  //   queryKey: ["customers"],
  //   queryFn: async () => {
  //     const res = await dashboardService.Customers();
  //     console.log(res);
  //     useToast({text:res.message,type:"success"});
  //     return res;
  //   },
  //   retry: 0,

  //   staleTime: 5000,
  // });
  // useEffect(()=>{console.log("line 16",data)},[data])
  return (
    <>
      <h1>Dashboard </h1>
      <div className="w-full h-full border px-2">
      
      </div>
    </>
  );
}
