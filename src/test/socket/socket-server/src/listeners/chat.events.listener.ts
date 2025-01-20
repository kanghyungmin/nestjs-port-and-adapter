import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class ChatEventsListener {
  private server: Server;

  constructor() {}

  // 서버 설정 메서드 (AppGateway 또는 ChatGateway에서 호출하여 Server 객체를 설정)
  setServer(server: Server) {
    this.server = server;
  }

  // 메시지 이벤트 처리
  handleChatMessage(socket: Socket, payload: { room: string; message: string }) {
    console.log(`[ChatEventsListener] Message in room "${payload.room}": ${payload.message}`);

    // 메시지를 브로드캐스트 (현재 방의 다른 사용자들에게만 전송)
    // socket.to(payload.room).emit('chat.message', payload.message);

    // Redis 어댑터 사용 시, 서버 전체 사용자에게 메시지 전송 가능
    this.server.to(payload.room).emit('chat.message', payload.message);
  }

  // 방 입장 처리
  handleJoinRoom(socket: Socket, payload: { room: string; user: string }) {
    console.log(`[ChatEventsListener] User "${payload.user}" joined room "${payload.room}"`);

    // 사용자 방에 추가
    socket.join(payload.room);

    // 브로드캐스트: 방에 있는 다른 사용자들에게 알림
    socket.to(payload.room).emit('chat.user.join', { user: payload.user });

    // Redis 어댑터 사용 시, 서버 전체에 전송 가능
    // this.server.to(payload.room).emit('chat.user.join', { user: payload.user });
  }

  // 방 나가기 처리
  handleLeaveRoom(socket: Socket, payload: { room: string; user: string }) {
    console.log(`[ChatEventsListener] User "${payload.user}" left room "${payload.room}"`);

    // 사용자 방에서 제거
    socket.leave(payload.room);

    // 브로드캐스트: 방에 있는 다른 사용자들에게 알림
    socket.to(payload.room).emit('chat.user.leave', { user: payload.user });
  }
}
