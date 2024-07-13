export interface Token {
    access_token: string,
    expires_in: number,
    token_type: string,
    scope: string,
    refresh_token: string
}

export interface Stock {
    id: string,
    code: string,
    name: string,
    price: number,
    created: Date,
    modified: Date
}

export interface StockListResponse {
    count: number,
    next?: string,
    previous?: string,
    results: Array<Stock>
}
