import { WebSocketGateway, WebSocketServer, OnGatewayInit, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatEventsListener } from '../listeners/chat.events.listener';

@WebSocketGateway({
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private chatEventsListener: ChatEventsListener) {}

  afterInit() {
    console.log('[ChatGateway] Chat Gateway initialized');
    // ChatEventsListener에 Server 객체 설정
    this.chatEventsListener.setServer(this.server);
  }

  handleConnection(socket: Socket) {
    console.log(`[ChatGateway] Client connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`[ChatGateway] Client disconnected: ${socket.id}`);
  }

  // 메시지 이벤트
  @SubscribeMessage('message')
  handleMessage(socket: Socket, payload: { room: string; message: string }) {
    console.log(`[ChatGateway] Message from ${socket.id}:`, payload);

    // ChatEventsListener를 통해 메시지 처리
    this.chatEventsListener.handleChatMessage(socket, payload);
  }

  // 방 입장 이벤트
  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, payload: { room: string; user: string }) {
    console.log(`[ChatGateway] Join room from ${socket.id}:`, payload);

    // ChatEventsListener를 통해 방 입장 처리
    this.chatEventsListener.handleJoinRoom(socket, payload);
  }

  // 방 나가기 이벤트
  handleLeaveRoom(socket: Socket, payload: { room: string; user: string }) {
    console.log(`[ChatGateway] Leave room from ${socket.id}:`, payload);

    // ChatEventsListener를 통해 방 나가기 처리
    this.chatEventsListener.handleLeaveRoom(socket, payload);
  }
}
