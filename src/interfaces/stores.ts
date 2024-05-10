import { create } from "zustand"
import { DataProps } from "./stocks"

export interface TableState {
    searchQuery: string,
    page: number,
    sort: number,
    sortDirection: 'asc' | 'desc',
    data: DataProps[] | []
    setSearchQuery: (query: string) => void,
    setPage: (pageNumber: number) => void,
    setSort: (sortIndex: number) => void,
    setSortDirection: (direction: 'asc' | 'desc') => void,
    setData: (data: DataProps[]) => void,
}

export const useTableStore = create<TableState>((set) => ({
    searchQuery: '',
    page: 0,
    sort: 0,
    sortDirection: 'asc',
    data: [],
    setSearchQuery: (query) => set(() => ({ searchQuery: query })),
    setPage: (pageNumber) => set(() => ({ page: pageNumber })),
    setSort: (sortIndex) => set(() => ({ sort: sortIndex })),
    setSortDirection: (direction) => set(() => ({ sortDirection: direction })),
    setData: (data) => set(() => ({ data: data }))
}))