export interface OrdersFetcher {
    fetch(
        onFetchFinished: (orders: any[]) => void,
        onNewOrder?: (order: any) => void,
        onOrderUpdated?: (order: any) => void
    ): void;
}