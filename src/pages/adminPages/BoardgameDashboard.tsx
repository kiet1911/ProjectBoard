import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { dashboardService } from "../../services/adminServices/dashboard.service";
import type {
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import { enumStoreBoardGameStatus } from "../../types/enumStore";
import { useQueryClient } from "@tanstack/react-query";

export default function BoardgamesDashboardPage() {
  const query = useQueryClient();
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", flex: 2 },
    {
      field: "name",
      floatingFilter: true,
      filter: true,
      filterParams: {
        filterOptions: ["contains"],
        maxNumConditions: 1,
        debounceMs: 500,
      },
    },
    { field: "stock_Quantity" },
    {
      field: "status",
      valueFormatter: (p: any) => {
        return enumStoreBoardGameStatus(Number(p.value));
      },
      floatingFilter: true,
      filter: true,
      filterParams: {
        filterOptions: ["contains"],
        maxNumConditions: 1,
        debounceMs: 500,
      },
    },
    { field: "action" },
  ]);

  const onGridReady = (params: GridReadyEvent) => {
    const datasource: IDatasource = {
      getRows: async (requestParams: IGetRowsParams) => {
        try {
          const start = requestParams.startRow;
          const end = requestParams.endRow;
          const pageSize = end - start;
          const pageIndex = start / pageSize;
          const sort = requestParams.sortModel[0];
          const nameFilter = requestParams.filterModel.name?.filter;
          const statusFilter = requestParams.filterModel.status?.filter;
          console.log(start, end, pageSize, sort, nameFilter, statusFilter);
          const res = await query.fetchQuery({
            queryKey: [
              "board-game-get-dashboard",
              pageIndex,
              pageSize,
              sort?.colId,
              sort?.sort,
              nameFilter,
              statusFilter,
            ],
            queryFn: async () => {
              return await dashboardService.BoardgamesTable({
                page: pageIndex,
                pageSize: pageSize,
                sortBy: sort?.colId,
                sortDirection: sort?.sort,
                nameSearch: nameFilter,
                statusSearch: statusFilter,
              });
            },
            staleTime: 4 * 1000,
            retry: 0,
          });

          if (res?.data?.items) {
            const fetchedItems = res.data.items;
            const lastRow =
              fetchedItems.length < pageSize ? start + fetchedItems.length : -1;
            // console.log(fetchedItems, lastRow);
            requestParams.successCallback(fetchedItems, lastRow);
          } else {
            requestParams.successCallback([], 0);
          }
        } catch (error) {
          requestParams.failCallback();
        }
      },
    };
    params.api.setGridOption("datasource", datasource);
  };

  return (
    <>
      <div className="h-full">
        <h1 className="text-2xl font-bold py-2 px-1 rounded bg-white/30 border-2 border-mist-400/30 text-(--main-color) text-shadow-lg/30 text-shadow-black/50">
          BoardGame
        </h1>
        <div className="w-full flex flex-col justify-center items-center">
          <div
            className="ag-theme-quartz"
            style={{ height: 420, width: "100%" }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              rowModelType="infinite"
              cacheBlockSize={10}
              rowBuffer={0}
              infiniteInitialRowCount={5}
              maxConcurrentDatasourceRequests={1}
              pagination={false}
              onGridReady={onGridReady}
            />
          </div>
        </div>
      </div>
    </>
  );
}
