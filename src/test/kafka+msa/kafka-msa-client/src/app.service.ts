import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_CLIENT')
    private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {
    // Kafka 요청 주제를 subscribe
    this.kafkaClient.subscribeToResponseOf('get_data');
    this.kafkaClient.subscribeToResponseOf('sum');
    await this.kafkaClient.connect();
  }

  sendMessage() {
    // 요청을 보냄
    
    // return this.kafkaClient.send('get_data', { id: '123', content: 'Hello Kafka' });
    const pattern = 'sum';
    const payload = [1, 2, 3, 4, 5];
    console.log('Before sending message');
    console.log(new Date());
    const result = this.kafkaClient.send<number>(pattern, payload);
    console.log('After sending message');
    console.log(new Date());
    console.log('Result:', result.subscribe(data => console.log(data)));

    return result
  }

  emitEvent() {
    // 이벤트를 발송
    this.kafkaClient.emit('new_event', { event: 'user_registered', timestamp: new Date() });
  }
}