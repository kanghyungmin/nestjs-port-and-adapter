import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GlobalListener } from './listeners/global.listener';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private globalListener: GlobalListener) {}

  afterInit() {
    console.log('[AppGateway] Global Gateway initialized');
    // GlobalListener에 Server 객체 설정
    this.globalListener.setServer(this.server);
  }

  handleConnection(socket: any) {
    console.log(`[AppGateway] Client connected: ${socket.id}`);
  }

  handleDisconnect(socket: any) {
    console.log(`[AppGateway] Client disconnected: ${socket.id}`);
  }

  // 글로벌 에러 이벤트를 발행하는 메서드 (예제)
  emitGlobalError() {
    this.globalListener.handleGlobalError({
      message: 'Something went wrong!',
      code: 500,
    });
  }

  // 글로벌 알림 이벤트를 발행하는 메서드 (예제)
  emitGlobalNotification() {
    this.globalListener.handleGlobalNotification({
      message: 'Server is restarting soon!',
    });
  }
}
