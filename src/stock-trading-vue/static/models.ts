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

export enum TransactionType {
    BUY = 0,
    SELL = 1
}

export enum TransactionStatus {
    PENDING = 0,
    CLEARED = 1
}

export interface Transaction extends BaseAPIModel {
    id: string,
    type: TransactionType,
    status: TransactionStatus,
    user: number,
    stock: Stock,
    quantity: number,
    price: number,
    amount: number,
}

export interface Order extends Transaction {
}

export interface OrderkListResponse extends HttpResponse {
    results: Array<Order>
}
