import { useQueryClient } from "@tanstack/react-query";
import {
  useConfirmContent,
  useToastNotification,
} from "../../store/notification/notification";
import { useCreateContainer } from "../../features/adminFeatures/dasboard-edit-create/stores/createContainer";
import React, { useCallback, useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";
import type {
  AgGridEvent,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { dashboardService } from "../../services/adminServices/dashboard.service";
import { useUpdateContainer } from "../../features/adminFeatures/dasboard-edit-create/stores/updateContainer";
import { PlusCircle } from "lucide-react";
import { enumStorePublisherStatusConvertToString, enumStorePublisherTypeConvertToString } from "../../types/enumStore";
import type { PublisherDTO } from "../../features/adminFeatures/dasboard-edit-create/stores/serivcesType";
import UpdateForm from "../../features/adminFeatures/dasboard-edit-create/components/Publisher/updateForm";
import CreateForm from "../../features/adminFeatures/dasboard-edit-create/components/Publisher/createForm";

export default function PublisherDashboardPage() {
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
        header: "Sequence Id",
        floatingFilter: true,
        filter: true,
        filterParams: {
          filterOptions: ["contains"],
          maxNumConditions: 1,
          debounceMs: 500,
        },
      },
      {
        field: "name",
        header: "Name",
        floatingFilter: true,
        filter: true,
        filterParams: {
          filterOptions: ["contains"],
          maxNumConditions: 1,
          debounceMs: 500,
        },
      },
      {
        field: "bio",
        header: "Bio",
        floatingFilter: true,
        filter: true,
        filterParams: {
          filterOptions: ["contains"],
          maxNumConditions: 1,
          debounceMs: 500,
        },
      },
      {
        field: "type",
        header: "Type",
        valueFormatter: (p:any)=>{
          return enumStorePublisherTypeConvertToString(Number.isNaN(Number(p.value))?-1:Number(p.value))?.name ?? "NaN";
        }
      },
      {
        field: "created_at",
        header: "Created at",
        valueFormatter: (p: any) => {
          return String(p.value).replace("T", " ");
        },
      },
      {
        field: "updated_at",
        header: "Updated at",
        valueFormatter: (p: any) => {
          return String(p.value).replace("T", " ");
        },
      },
      {
        field: "status",
        header: "Status",
        valueFormatter: (p:any)=>{
          return enumStorePublisherStatusConvertToString(Number.isNaN(Number(p.value))?-1:Number(p.value))?.name ?? "NaN";
        }
      },
      {
        field: "action",
        header: "Action",
        cellRenderer: CustomButtonComponent,
        cellRendererParams: {
          fn: refreshGrid,
        },
      },
    ];
  }, [refreshGrid]);
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
          const bioFilter = requestParams.filterModel.bio?.filter;
          const res = await query.fetchQuery({
            queryKey: [
              "creator-get-dashboard",
              pageIndex,
              pageSize,
              sort?.colId,
              sort?.sort,
              nameFilter,
              idFilter,
              bioFilter,
            ],
            queryFn: async () => {
              return await dashboardService.CreatorTable({
                page: pageIndex,
                pageSize: pageSize,
                sortBy: sort?.colId,
                sortDirection: sort?.sort,
                nameSearch: nameFilter,
                idSearch: idFilter,
                bioSearch: bioFilter,
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

    const handleAddNew = async()=>{
        const result = await confirm("Are you want to add new publisher?")
        if(result){
          // console.log("open");

          const data:PublisherDTO = {
            id: crypto.randomUUID(),
            name:"",
            bio:"",
            type:0,
            status:0,
          }
  
         active(<CreateForm data={data} gridApi={refreshGrid} ></CreateForm>)
        }
        else{
          // console.log("close");
        }
    }

  return (
    <div className="h-full w-full flex flex-col justify-start">
      <h1 className="text-2xl font-bold py-2 px-1 rounded bg-white/30 border-2 border-mist-400/30 text-(--main-color) text-shadow-lg/30 text-shadow-black/50">
        Publisher
      </h1>
      <div>
        <button onClick={handleAddNew} >
          <h1 className="p-2 space-x-2 bg-white border-2 border-mist-400/30 navbar-link mb-2 mt-0.5 text-md hover:bg-(--main-color) hover:text-white active:text-white active:bg-(--main-color)">
            <PlusCircle size={20}></PlusCircle>
            Add
          </h1>
        </button>
      </div>
      <div className="w-full flex flex-col justify-center">
        <div className="ag-theme-quartz h-140" style={{ width: "100%" }}>
          <AgGridReact
            rowHeight={80}
            columnDefs={columnDefs}
            rowModelType="infinite"
            cacheBlockSize={10}
            rowBuffer={0}
            infiniteInitialRowCount={1}
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
              "Are you sure want to update this publisher?",
            );
            if (isConfirm) {
              // console.log(data);
              const dataDTO:PublisherDTO = data;
              if(dataDTO != null){
                active(<UpdateForm data={dataDTO} gridApi={fn} ></UpdateForm>)
              }
              //   if (data as CategoryDTO) {
              //     const value: CategoryDTO = {
              //       ...data,
              //       status: enumStoreCategoryStatusConvertToNumber(data.status),
              //     };
              //     active(<UpdateForm data={value} gridApi={fn}></UpdateForm>);
              //   }
            }
          }}
        >
          {" "}
          Update
        </button>
        <button
          className=" navbar-link max-h-10 text-xs hover:bg-(--main-color) hover:text-white duration-200"
          type="button"
          onClick={async () => {
            notification({ text: "Coming Soon!", type: "information" });
          }}
        >
          {" "}
          Soft Delete
        </button>
      </div>
    </>
  );
});
