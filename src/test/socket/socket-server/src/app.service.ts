import { Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';

@Injectable()
export class DataService {
  private redisPublisher: RedisClientType;

  constructor() {
    this.redisPublisher = createClient({ url: 'redis://localhost:6379' });
    this.redisPublisher.connect();
  }

  async updateData() {
    // 데이터 업데이트
    await this.redisPublisher.set("key", JSON.stringify({
      value : "value"}));

    // 이벤트 게시
    await this.redisPublisher.publish('data-updates', JSON.stringify({ key : "key", value : "value"}));
    console.log('[DataService] Data updated and published');
  }
}