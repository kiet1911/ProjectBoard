import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "../../services/adminServices/dashboard.service"

export const useBoardgamesDashboardHook = (QueryKey: string, page: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
    nameSearch: string,
    statusSearch: string) => {
    const query =  useQuery({
        queryKey: ["board-game-get-dashboard",{page,pageSize}],
        queryFn: async () => { 
            const res =  await dashboardService.BoardgamesTable({ page: page, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection, nameSearch: nameSearch, statusSearch: statusSearch })
            return res
        },
        refetchOnWindowFocus: false,
        retry: 2,
        staleTime: 4 * 1000,
    })

    return query;
}