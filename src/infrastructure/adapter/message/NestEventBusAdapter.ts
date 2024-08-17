import { EventBusPort } from '@core/common/message/port/EventBusPort';
import { Injectable } from '@nestjs/common';
import { EventBus, IEvent } from '@nestjs/cqrs';


@Injectable() 
export class NestEventBusAdapter implements EventBusPort {
    constructor(private readonly eventBus : EventBus) {}

    public async sendEvent<TEvent extends IEvent>(event : TEvent): Promise<void> {
        return this.eventBus.publish(event)
    }
}