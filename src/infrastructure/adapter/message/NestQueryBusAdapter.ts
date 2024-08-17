import {QueryBusPort } from '@core/common/message/port/QueryBusPort';
import { Injectable } from '@nestjs/common';
import {QueryBus, IQuery } from '@nestjs/cqrs';


@Injectable()
export class NestQueryBusAdapter implements QueryBusPort {
    constructor(private readonly queryBus: QueryBus) {}

    public async sendQuery<TQuery extends IQuery, TQueryResponse>(query: TQuery): Promise<TQueryResponse> {
        return this.queryBus.execute(query)
    }
}