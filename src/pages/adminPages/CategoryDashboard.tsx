import { useQueryClient } from "@tanstack/react-query";
import type {
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import { AgGridReact, type AgGridReactProps } from "ag-grid-react";
import React, { useState } from "react";
import { dashboardService } from "../../services/adminServices/dashboard.service";
import { useConfirmContent } from "../../store/notification/notification";

export default function CategoryDashboardPage() {
  const query = useQueryClient();
  const [columnDefs, setColumnDefs] = useState([
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
      field: "description",
      header: "Description",
      floatingFilter: true,
      filter: true,
      filterParams: {
        filterOptions: ["contains"],
        maxNumConditions: 1,
        debounceMs: 500,
      },
    },
    {
      field: "created_at",
      header: "Created at",
      valueFormatter: (p: any) => {
        return String(p.value).replace("T", " ");
      },
    },
    { field: "updated_at", header: "Updated at" },
    { field: "status", header: "Status" },
    { field: "action", header: "Action", cellRenderer: CustomButtonComponent },
  ]);

  const onGridReady = (param: GridReadyEvent) => {
    const datasource: IDatasource = {
      getRows: async (requestParams: IGetRowsParams) => {
        try {
          const start = requestParams.startRow;
          const end = requestParams.endRow;
          const pageSize = end - start;
          const pageIndex = start / pageSize;
          const sort = requestParams.sortModel[0];
          const nameFilter = requestParams.filterModel.name?.filter;
          const descriptionFilter =
            requestParams.filterModel.description?.filter;
          console.log(
            start,
            end,
            pageSize,
            sort,
            nameFilter,
            descriptionFilter,
          );
          const res = await query.fetchQuery({
            queryKey: [
              "category-get-dashboard",
              pageIndex,
              pageSize,
              sort?.colId,
              sort?.sort,
              nameFilter,
              descriptionFilter,
            ],
            queryFn: async () => {
              return await dashboardService.CategoryTable({
                page: pageIndex,
                pageSize: pageSize,
                sortBy: sort?.colId,
                sortDirection: sort?.sort,
                nameSearch: nameFilter,
                descriptionSearch: descriptionFilter,
              });
            },
            staleTime: 4 * 1000,
            retry: 0,
          });

          if (res?.data?.items) {
            const fetchedItems = res.data.items;
            const lastRow =
              fetchedItems.length < pageSize ? start + fetchedItems.length : -1;
            console.log(fetchedItems, lastRow);
            requestParams.successCallback(fetchedItems, lastRow);
          } else {
            requestParams.successCallback([], 0);
          }
        } catch (error) {
          requestParams.failCallback();
        }
      },
    };
    param.api.setGridOption("datasource", datasource);
  };

  return (
    <div className="h-full">
      <h1 className="text-xl font-bold py-2 px-1 bg-white border-2 border-mist-400/30">
        Category
      </h1>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="ag-theme-quartz" style={{ height: 420, width: "100%" }}>
          <AgGridReact
            rowHeight={80}
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

      {/* edit / create view -> react memo component */}
    </div>
  );
}
const CustomButtonComponent = React.memo(({props,fn}:{props: AgGridReactProps,fn?:()=>void}) => {
  const confirm = useConfirmContent((state) => state.active);
  return (
    <>
      <div className="flex flex-col gap-2 h-full justify-center">
        <button
          className=" navbar-link text-xs hover:bg-(--main-color) hover:text-white duration-200"
          type="button"
          onClick={async () => {
            const isConfirm = await confirm(
              "are you sure want to update this category?",
            );
            if (isConfirm) {
              console.log(props);
            }
          }}
        >
          {" "}
          Change
        </button>
      </div>
    </>
  );
});
