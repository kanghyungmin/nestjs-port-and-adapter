import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisClientType, createClient } from 'redis';

@WebSocketGateway({
  namespace: '/data',
})
export class DataGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private redisSubscriber: RedisClientType;

  async afterInit() {
    console.log('[DataGateway] WebSocket initialized');

    // Redis Subscriber 설정
    this.redisSubscriber = createClient({ url: 'redis://localhost:6379' });
    await this.redisSubscriber.connect();

    // Redis 채널 구독
    this.redisSubscriber.subscribe('data-updates', (message) => {
      console.log('[DataGateway] Redis message received:', message);

      // WebSocket을 통해 클라이언트에 메시지 전송
      this.server.emit('dataUpdate', JSON.parse(message));
    });
    console.log('-----------------------')
  }

  handleConnection(client: Socket) {
    console.log('[DataGateway] Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('[DataGateway] Client disconnected:', client.id);
  }
}