export interface QueryBusPort {
    // eslint-disable-next-line @typescript-eslint/ban-types
    sendQuery<TQuery extends object, TQueryResponse>(query: TQuery): Promise<TQueryResponse>;
  }
  