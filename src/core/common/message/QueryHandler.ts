export interface QueryHandler<TQuery, TQueryResponse> {
    handle(query: TQuery): Promise<TQueryResponse>;
}