// 클라이언트 코드 (chat.js)
const { io } = require('socket.io-client');

// Chat 네임스페이스에 연결
const chatSocket = io('http://localhost:3000/chat');

// 방에 입장
chatSocket.emit('joinRoom', { room: 'room1', user: 'John' });

// 메시지 보내기
chatSocket.emit('message', { room: 'room1', message: 'Hello everyone!' });

// 메시지 수신
chatSocket.on('chat.message', (message) => {
  console.log('New message:', message);
});

// 사용자 입장 알림
chatSocket.on('chat.user.join', (data) => {
  console.log(`${data.user} joined the room`);
});

// 사용자 퇴장 알림
chatSocket.on('chat.user.leave', (data) => {
  console.log(`${data.user} left the room`);
});
