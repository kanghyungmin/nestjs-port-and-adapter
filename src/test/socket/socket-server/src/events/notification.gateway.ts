import { WebSocketGateway, WebSocketServer, OnGatewayInit, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/notifications',
})
export class NotificationsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('[NotificationsGateway] Notifications Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`[NotificationsGateway] Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`[NotificationsGateway] Client disconnected: ${client.id}`);
  }

  // 알림 전송 이벤트 처리 (서버 -> 클라이언트)
  @SubscribeMessage('sendNotification')
  handleSendNotification(client: Socket, payload: { message: string; userId?: string }) {
    console.log(`[NotificationsGateway] New notification: ${payload.message}`);

    if (payload.userId) {
      // 특정 사용자에게만 알림 전송
      client.to(payload.userId).emit('notification', payload.message);
    } else {
      // 전체 사용자에게 알림 브로드캐스트
      this.server.emit('notification', payload.message);
    }
  }

  // 특정 사용자 그룹에 알림 전송
  @SubscribeMessage('sendGroupNotification')
  handleSendGroupNotification(client: Socket, payload: { group: string; message: string }) {
    console.log(`[NotificationsGateway] New group notification to group "${payload.group}": ${payload.message}`);

    // 특정 그룹(방)에 알림 브로드캐스트
    this.server.to(payload.group).emit('notification', payload.message);
  }

  // 클라이언트가 특정 그룹에 가입
  @SubscribeMessage('joinGroup')
  handleJoinGroup(client: Socket, payload: { group: string }) {
    console.log(`[NotificationsGateway] Client ${client.id} joined group "${payload.group}"`);

    // 클라이언트를 해당 그룹(방)에 추가
    client.join(payload.group);
    client.emit('joinedGroup', { group: payload.group });
  }

  // 클라이언트가 특정 그룹에서 탈퇴
  @SubscribeMessage('leaveGroup')
  handleLeaveGroup(client: Socket, payload: { group: string }) {
    console.log(`[NotificationsGateway] Client ${client.id} left group "${payload.group}"`);

    // 클라이언트를 해당 그룹(방)에서 제거
    client.leave(payload.group);
    client.emit('leftGroup', { group: payload.group });
  }
}
