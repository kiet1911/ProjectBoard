import type {
  ColDef,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
  PaginationChangedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { dashboardService } from "../../services/adminServices/dashboard.service";
import { useQuery } from "@tanstack/react-query";
interface BoardgameData {
  id: number;
  name: string;
  price: number;
  maxPlayers: number;
  status: string;
}
export default function CustomerAccountDashboardPage() {
  //api get
  //table ag grid community
  //   PublicId = t.User.Public_id,//filter
  // DisplayName = t.Display_Name,//filter
  // FullName = t.Full_Name,
  // Birth = t.Birth,
  // Gender = t.Gender,
  // Address = t.Address,//filter
  // AccountCreatedAt = t.User.Created_at,
  // ProfileUpdateAt = t.Updated_at,
  // AccountStatus = t.User.Status,
  const [Page, setPage] = useState<number>(0);
  const [columnDefs, setColumnDefs] = useState([
    { field: "publicId", header:"public Id", flex: 2 },
    { field: "displayName", header:"display name" },
    { field: "fullName" },
    { field: "birth" },
    { field: "gender" },
    { field: "address" },
    { field: "accountCreatedAt" },
    { field: "profileUpdateAt" },
    { field: "accountStatus" },
  ]);
  const { data } = useQuery({
    queryKey: ["customer_table", Page],
    queryFn: async () => {
      const res = await dashboardService.CustomerTable({
        page: Page,
        pageSize: 10,
      });
      console.log(res);
      return res.data.items;
    },
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: 4 * 1000,
  });

  return (
    <>
      <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
        {data && <AgGridReact columnDefs={columnDefs} rowData={data} />}
      </div>
    </>
  );
}
