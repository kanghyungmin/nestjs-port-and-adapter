import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class GlobalListener {
  private server: Server;

  constructor() {}

  // 서버 설정 메서드 (AppGateway 또는 다른 Gateway에서 호출하여 Server 객체를 설정)
  setServer(server: Server) {
    this.server = server;
  }

  // 글로벌 에러 이벤트 처리
  handleGlobalError(payload: { message: string; code: number }) {
    console.error(`[GlobalListener] Error: ${payload.message} (Code: ${payload.code})`);

    // Redis 어댑터를 사용하여 전체 사용자에게 에러 전송
    this.server.emit('global.error', payload);
  }

  // 글로벌 알림 이벤트 처리
  handleGlobalNotification(payload: { message: string }) {
    console.log(`[GlobalListener] Notification: ${payload.message}`);

    // Redis 어댑터를 사용하여 전체 사용자에게 알림 전송
    this.server.emit('global.notification', payload.message);
  }
}
