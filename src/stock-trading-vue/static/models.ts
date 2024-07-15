export interface Token {
    access_token: string,
    expires_in: number,
    token_type: string,
    scope: string,
    refresh_token: string
}

export interface HttpResponse {
    count: number,
    next?: string,
    previous?: string,
    results: Array<Object>
}

export interface BaseAPIModel {
    id: string,
    created: Date,
    modified: Date
}

export interface Stock extends BaseAPIModel {
    code: string,
    name: string,
    price: number,
}

export interface StockListResponse extends HttpResponse {
    results: Array<Stock>
}

export interface Order extends BaseAPIModel{
    id: string,
    user: number,
    stock: Stock,
    quantity: number,
    price: number,
    amount: number,
}

export interface OrderkListResponse extends HttpResponse {
    results: Array<Order>
}
