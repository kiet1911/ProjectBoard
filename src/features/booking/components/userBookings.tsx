import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";

import { useShallow } from "zustand/shallow";
import React, { useCallback, useMemo, useState } from "react";
import type {
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import {
  useConfirmContent,
  useToastNotification,
} from "../../../store/notification/notification";
import { useCreateContainer } from "../../adminFeatures/dasboard-edit-create/stores/createContainer";
import { Client_Booking_Service } from "../services/client.booking.service";
import { TableColumnsSplit } from "lucide-react";
import { enumStoreBookingStatusConvertToString } from "../../../types/enumStore";
import { useUpdateContainer } from "../../adminFeatures/dasboard-edit-create/stores/updateContainer";
import UserDetailBooking from "./useDetailBooking";
import { LoadingBox } from "../../../components/LoadingBox";

export default function ClientBooking({ publicId }: { publicId: string }) {
  const query = useQueryClient();
  const confirm = useConfirmContent(useShallow((state) => state.active));
  const active = useCreateContainer(useShallow((state) => state.active));
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
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
  const columnDefs = useMemo(() => {
    return [
      {
        field: "id",
        header: "Id",
        // filter: true,
        // floatingFilter:true,
        // filterParams: {
        //   filterOptions: ["contains"],
        //   maxNumConditions: 1,
        //   debounceMs: 500,
        // },
      },
      {
        field: "name",
        header: "Name",
        // filter: true,
        // floatingFilter:true,
        // filterParams: {
        //   filterOptions: ["contains"],
        //   maxNumConditions: 1,
        //   debounceMs: 500,
        // },
      },
      {
        field: "phoneNumber",
        header: "PhoneNumber",
      },
      //   {
      //     field: "email",
      //     header: "Email",
      //   },
      //   {
      //     field: "minPlayers",
      //     header: "Min Players",
      //   },
      //   {
      //     field: "maxsPlayers",
      //     header: "Max Players",
      //   },
      //   {
      //     field: "minPlayers",
      //     header: "MinPlayers",
      //   },
      {
        field: "bookingTime",
        header: "Booking Time",
        valueFormatter: (p: any) => {
          return String(p.value).replace("T", " ");
        },
      },
      {
        field: "status",
        header: "Status",
        cellStyle: (p: any) => {
          const data = enumStoreBookingStatusConvertToString(p.value);
          if (data && data.color) {
            return { color: data.color, fontWeight: "bold" };
          } else {
            return { color: "black", fontWeight: "bold" };
          }
        },
        valueFormatter: (p: any) => {
          return enumStoreBookingStatusConvertToString(p.value)?.name ?? "NaN";
        },
      },
      {
        sortable: false,
        field: "action",
        header: "Action",
        cellRenderer: CustomButtonComponent,
        cellRendererParams: {
          fn: refreshGrid,
          publicID: publicId.toString(),
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

          //fetch API
          const res = await query.fetchQuery({
            queryKey: [
              "client_bookings",
              pageIndex,
              pageSize,
              sort?.colId,
              sort?.sort,
              publicId ?? "NaN",
            ],
            queryFn: async () => {
              return await Client_Booking_Service.UserBookings({
                publicId: publicId,
                page: pageIndex,
                pageSize: pageSize,
                sortBy: sort?.colId,
                sortDirection: sort?.sort,
              });
            },
            staleTime: 4 * 1000,
            retry: 0,
          });

          //get response and apply to data to row
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
        Reservation
      </h1>
      <div>
        <button onClick={refreshGridColumn}>
          <h1 className="p-2 space-x-2 bg-white border-2 border-mist-400/30 navbar-link mb-2 mt-0.5 text-md hover:bg-(--main-color) hover:text-white active:text-white active:bg-(--main-color)">
            <TableColumnsSplit size={20}></TableColumnsSplit>
            Fit column
          </h1>
        </button>
      </div>
      <div className="w-full flex flex-col justify-center">
        <div className="ag-theme-quartz h-100" style={{ width: "100%" }}>
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
  publicID: string;
}
const CustomButtonComponent = React.memo(
  ({ data, fn, publicID }: ActionCellProps) => {
    const confirm = useConfirmContent((state) => state.active);
    const active = useUpdateContainer(useShallow((state) => state.active));

    // const active = useUpdateContainer(useShallow((state) => state.active));
    const notification = useToastNotification(useShallow((state) => state.add));
    const cancelBookingMutation = useMutation({
      mutationFn: async () => {
        if (data && data.id) {
          const res = await Client_Booking_Service.UserBookingCancel({
            publicId: publicID,
            bookingId: data.id,
          });
          return res;
        } else {
          return Promise.reject("Id booking not found.");
        }
      },
      onSuccess: (config) => {
        notification({ text: "Cancel success", type: "success" });
        fn();
      },
      onError: (error) => {
        notification({ text: "Cancel error", type: "error" });
      },
    });
    const loadingCancel = cancelBookingMutation.isPending;
    return (
      <>
        <div className="flex flex-row gap-1 h-full justify-center items-center flex-wrap">
          <button
            className=" navbar-link max-h-10 text-xs hover:bg-(--main-color) hover:text-white duration-200"
            type="button"
            onClick={async () => {
              const isConfirm = await confirm("Request detail booking?");
              if (isConfirm) {
                active(
                  <>
                    <UserDetailBooking
                      bookingId={data.id ?? undefined}
                    ></UserDetailBooking>
                  </>,
                );
              }
            }}
          >
            Detail
          </button>

          { data &&  data.status != undefined && data.status != 0 ? (
            <></>
          ) : (
            <button
              className="navbar-link max-h-10 text-xs hover:bg-(--main-color) hover:text-white duration-200"
              type="button"
              disabled={loadingCancel}
              onClick={async () => {
                const isConfirm = await confirm("Request cancel the booking?");
                if (isConfirm) {
                  cancelBookingMutation.mutate();
                }
              }}
            >
              {!loadingCancel ? (
                <span>Cancel</span>
              ) : (
                <div className="relative p-2">
                  <LoadingBox></LoadingBox>
                </div>
              )}
            </button>
          )}
        </div>
      </>
    );
  },
);
