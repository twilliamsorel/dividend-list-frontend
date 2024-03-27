export interface DataProps {
    ticker: string;
    company: string;
    stock_type: string;
    frequency: number;
    dividend_records: number;
    dividend_volatility: number;
    percentage_yield: number;
    median_percentage_yield: number;
}

export interface SortProps {
    category: number;
    direction: string;
}