import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useState } from "react";
import { dashboardService } from "../../services/adminServices/dashboard.service";
import type {
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import { enumStoreBookingStatusConvertToString } from "../../types/enumStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useConfirmContent,
  useToastNotification,
} from "../../store/notification/notification";
import { useUpdateContainer } from "../../features/adminFeatures/dasboard-edit-create/stores/updateContainer";
import { useShallow } from "zustand/shallow";
import { TableColumnsSplit } from "lucide-react";
import { AxiosError } from "axios";
import { useCreateContainer } from "../../features/adminFeatures/dasboard-edit-create/stores/createContainer";
import { order_service_dashboard } from "../../features/adminFeatures/dasboard-edit-create/services/order.service";
import UpdateForm from "../../features/adminFeatures/dasboard-edit-create/components/Booking/updateForm";

export default function BookingDashboardPage() {
  const query = useQueryClient();
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const confirm = useConfirmContent((state) => state.active);
  const active = useCreateContainer(useShallow((state) => state.active));
  const refreshGrid = useCallback(() => {
    if (gridApi) {
      gridApi.refreshInfiniteCache();
    }
  }, [gridApi]);

  const refreshGridColumn = useCallback(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  }, [gridApi]);

  const columnDefs = useMemo(
    () => [
      {
        field: "id",
        header: "Id",
        floatingFilter: true,
        filter: true,
        filterParams: {
          filterOptions: ["contains"],
          maxNumConditions: 1,
          debounceMs: 500,
        },
      },
      {
        field: "public_id",
        header: "Public id",
        // floatingFilter: true,
        // filter: true,
        // filterParams: {
        //   filterOptions: ["contains"],
        //   maxNumConditions: 1,
        //   debounceMs: 500,
        // },
      },
      { field: "name", header: "Name" },
      { field: "phoneNumber", header: "Phone number" },
      {
        field: "bookingTime",
        header: "Booking Time",
        valueFormatter: (p: any) => {
          return String(p.value).replace("T"," ");
        },
      },
      {
        field: "status",
        header: "Status",
        cellStyle: (param: any) => {
          const data = enumStoreBookingStatusConvertToString(param.value);
          if (data && data.color) {
            return { color: data.color, fontWeight: "bold" };
          } else {
            return { color: "black", fontWeight: "bold" };
          }
        },
        valueFormatter: (p: any) => {
          return enumStoreBookingStatusConvertToString(p.value)?.name || "NaN";
        },
      },
      { field: "minPlayers" },
      { field: "maxsPlayers" },
      {
        field: "action",
        minWidth: 200,
        cellRenderer: CustomButtonComponent,
        cellRendererParams: {
          fn: refreshGrid,
        },
      },
    ],
    [refreshGrid],
  );

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    const datasource: IDatasource = {
      getRows: async (requestParams: IGetRowsParams) => {
        try {
          const start = requestParams.startRow;
          const end = requestParams.endRow;
          const pageSize = end - start;
          const pageIndex = start / pageSize;
          const sort = requestParams.sortModel[0];

          //   filter contain
          const idFilter = requestParams.filterModel.id?.filter;
          const nameFilter = requestParams.filterModel.nameSearch?.filter;
          const phoneFilter = requestParams.filterModel.phoneSearch?.filter;
          const statusFilter = requestParams.filterModel.status?.filter;

          const res = await query.fetchQuery({
            queryKey: [
              "booking-get-dashboard",
              pageIndex,
              pageSize,
              sort?.colId,
              sort?.sort,
              idFilter,
              nameFilter,
              statusFilter,
              phoneFilter,
            ],
            queryFn: async () => {
              return await dashboardService.BookingTable({
                page: pageIndex,
                pageSize: pageSize,
                sortBy: sort?.colId,
                sortDirection: sort?.sort,
                idSearch: idFilter,
                nameSearch: nameFilter,
                phoneSearch: phoneFilter,
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
    params.api.sizeColumnsToFit();
    params.api.setGridOption("datasource", datasource);
  };

  return (
    <>
      <div className="h-full">
        <h1 className="text-2xl font-bold py-2 px-1 rounded bg-white/30 border-2 border-mist-400/30 text-(--main-color) text-shadow-lg/30 text-shadow-black/50">
          Booking
        </h1>
        <div>
          <button onClick={refreshGridColumn}>
            <h1 className="p-2 space-x-2 bg-white border-2 border-mist-400/30 navbar-link mb-2 mt-0.5 text-md hover:bg-(--main-color) hover:text-white active:text-white active:bg-(--main-color)">
              <TableColumnsSplit size={20}></TableColumnsSplit>
              Fit column
            </h1>
          </button>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <div
            className="ag-theme-quartz"
            style={{ height: 520, width: "100%" }}
          >
            <AgGridReact
              rowHeight={90}
              columnDefs={columnDefs}
              rowModelType="infinite"
              cacheBlockSize={10}
              rowBuffer={0}
              infiniteInitialRowCount={5}
              maxConcurrentDatasourceRequests={1}
              pagination={true}
              onGridReady={onGridReady}
              paginationPageSize={20}
            />
          </div>
        </div>
      </div>
    </>
  );
}

interface ActionCellProps extends ICellRendererParams {
  fn: () => void;
}

const CustomButtonComponent = React.memo(({ data, fn }: ActionCellProps) => {
  const confirm = useConfirmContent((state) => state.active);
  const active = useUpdateContainer(useShallow((state) => state.active));
  const notification = useToastNotification(useShallow((state) => state.add));
  // const mutation = useMutation({
  //   mutationFn: async () => {
  //     const res = await order_service_dashboard.GetOrderById(data.id);
  //     return res.data;
  //   },
  //   onSuccess: (config) => {
  //     //   notification({ text: config.message, type: "success" });
  //     //   fn();
  //     // console.log(config);
  //   },
  //   onError: (error) => {
  //     if (error instanceof AxiosError) {
  //       notification({
  //         text: error.response?.data.message || "Error",
  //         type: "error",
  //       });
  //     } else {
  //       notification({
  //         text: "Error input",
  //         type: "error",
  //       });
  //     }
  //   },
  // });
  return (
    <>
      <div className="flex flex-row gap-1 h-full justify-center items-center flex-wrap">
        <button
          className=" navbar-link max-h-10 text-xs hover:bg-(--main-color) hover:text-white duration-200"
          type="button"
          onClick={async () => {
            const isConfirm = await confirm(
              "Are you sure want to update this booking.",
            );
            if (isConfirm) {
              if (data && data.id) {
                active(
                  <UpdateForm
                    params={{ id: data.id }}
                    gridApi={fn}
                  ></UpdateForm>,
                );
              } else {
                notification({ text: "Error", type: "error" });
              }
            }
          }}
        >
          Update
        </button>
      </div>
    </>
  );
});
