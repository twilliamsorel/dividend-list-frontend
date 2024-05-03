import { getRequest, Throttle } from "../utils"

type SortDirections = 'asc' | 'desc'

interface DataProps {
    ticker: string;
    company: string;
    stock_type: string;
    frequency: number;
    dividend_records: number;
    dividend_volatility: number;
    percentage_yield: number;
    median_percentage_yield: number;
}

export class TableInterface {
    page: number
    sort: number
    sortDirection: SortDirections
    searchQuery: string | undefined
    data: DataProps | undefined

    constructor() {
        this.page = 0
        this.sort = 0
        this.sortDirection = 'asc'
        this.searchQuery = undefined
        this.data = undefined
    }

    public paginate() {
        this.page++
    }

    private setPagination(page: number) {
        this.page = page
    }

    public setSort(sort: number) {
        this.sort = sort
    }

    public setSortDirection(direction: SortDirections) {
        this.sortDirection = direction
    }

    public setSearchQuery(query: string) {
        this.searchQuery = query
    }

    public getSearchQuery() {
        return this.searchQuery
    }

    private async setData(query: string) {
        const res = await getRequest(query)
        this.data = JSON.parse(res)
    }

    public getData() {
        return this.data
    }

    public update() {
        const throttle = new Throttle()
        if (this.searchQuery && this.searchQuery.length > 0) {
            throttle.run(async () => {
                if (!this.searchQuery || this.searchQuery.length < 1) return
                this.setPagination(0)
                this.setData(`${import.meta.env.VITE_SERVER_URL}/stocks/search/${this.searchQuery}`)
            }, 400)
        } else {
            (async function (this: TableInterface) {
                this.setData(`${import.meta.env.VITE_SERVER_URL}/stocks/paginate/${this.page}?sort_by=${this.sort}&direction=${this.sortDirection}`)
            })
        }
    }
}