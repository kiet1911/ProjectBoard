import { useQueryClient } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { useConfirmContent, useToastNotification } from "../../store/notification/notification";
import { useCreateContainer } from "../../features/adminFeatures/dasboard-edit-create/stores/createContainer";
import { useShallow } from "zustand/shallow";
import React, { useCallback, useMemo, useState } from "react";
import type { GridApi, GridReadyEvent, ICellRendererParams, IDatasource, IGetRowsParams } from "ag-grid-community";
import { dashboardService } from "../../services/adminServices/dashboard.service";
import { useUpdateContainer } from "../../features/adminFeatures/dasboard-edit-create/stores/updateContainer";
import UpdateForm from "../../features/adminFeatures/dasboard-edit-create/components/ImageBoardGame/updateForm";

export default function ImageBoardgamesDashboardPage() {
   const query = useQueryClient();
  const confirm = useConfirmContent((state) => state.active);
  const active = useCreateContainer(useShallow((state) => state.active));
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const refreshGrid = useCallback(() => {
    if (gridApi) {
      gridApi.refreshInfiniteCache();
    }
  }, [gridApi]);
  const columnDefs = useMemo(() => {
    return [
      {
        field: "id",
        header: "Id",
        filter: true,
        floatingFilter:true,
        filterParams: {
          filterOptions: ["contains"],
          maxNumConditions: 1,
          debounceMs: 500,
        },
      },
      {
        field: "name",
        header: "Name",
        filter: true,
        floatingFilter:true,
        filterParams: {
          filterOptions: ["contains"],
          maxNumConditions: 1,
          debounceMs: 500,
        },
      },
      {
        field: "count",
        header: "Count"
      },
      {
        field: "action",
        header: "Action",
        cellRenderer: CustomButtonComponent,
        cellRendererParams: {
          fn: refreshGrid,
        },
      }
    ]
  },[refreshGrid])
const onGridReady = (param: GridReadyEvent) => {
    setGridApi(param.api);
    const datasource: IDatasource = {
      getRows: async (requestParams: IGetRowsParams) => {
        try {
          const start = requestParams.startRow;
          const end = requestParams.endRow;
          const pageSize = end - start;
          const pageIndex = start / pageSize;
          const sort = requestParams.sortModel[0];
          const idFilter = requestParams.filterModel.id?.filter;
          const nameFilter = requestParams.filterModel.name?.filter;
          const res = await query.fetchQuery({
            queryKey: [
              "image-boardgames-get-dashboard",
              pageIndex,
              pageSize,
              sort?.colId,
              sort?.sort,
              nameFilter,
              idFilter,
            ],
            queryFn: async () => {
              return await dashboardService.ImageBoardgames({
                page: pageIndex,
                pageSize: pageSize,
                sortBy: sort?.colId,
                sortDirection: sort?.sort,
                nameGameSearch: nameFilter,
                idSearch: idFilter,
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
    param.api.sizeColumnsToFit();
    param.api.setGridOption("datasource", datasource);
  };


  return (
    <div className="h-full w-full flex flex-col justify-start">
      <h1 className="text-2xl font-bold py-2 px-1 rounded bg-white/30 border-2 border-mist-400/30 text-(--main-color) text-shadow-lg/30 text-shadow-black/50">
        Image Boardgames
      </h1>
      <div className="w-full flex flex-col justify-center">
        <div className="ag-theme-quartz h-140" style={{ width: "100%" }}>
          <AgGridReact
            rowHeight={80}
            columnDefs={columnDefs}
            rowModelType="infinite"
            cacheBlockSize={10}
            rowBuffer={0}
            infiniteInitialRowCount={5}
            maxConcurrentDatasourceRequests={1}
            pagination={true}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  );
}

interface ActionCellProps extends ICellRendererParams {
  fn: () => void;
}
const CustomButtonComponent = React.memo(({ data, fn }: ActionCellProps) => {
  const confirm = useConfirmContent((state) => state.active);
  const active = useUpdateContainer(useShallow((state) => state.active));
  const notification = useToastNotification(useShallow((state) => state.add));
  return (
    <>
      <div className="flex flex-row gap-1 h-full justify-center items-center flex-wrap">
        <button
          className=" navbar-link max-h-10 text-xs hover:bg-(--main-color) hover:text-white duration-200"
          type="button"
          onClick={async () => {
            const isConfirm = await confirm(
              "Are you sure want to update this image boardgames?",
            );
            if (isConfirm) {
                if(data && data.id && data.name){
                  active(<UpdateForm params={{id:data.id,name:data.name}} gridApi={fn} ></UpdateForm>)
                }
                else{
                notification({text:"Error",type:"error"});
                }

            }

          }}
        >
          {" "}
          Update
        </button>
      </div>
    </>
  );
});