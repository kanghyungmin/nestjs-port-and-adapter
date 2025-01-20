const { io } = require('socket.io-client');

// Notifications 네임스페이스에 연결
const notificationSocket = io('http://localhost:3000/notifications');

// 연결 확인
notificationSocket.on('connect', () => {
  console.log('Connected to notifications namespace');
});

// 알림 수신
notificationSocket.on('notification', (message) => {
  console.log('New notification:', message);
});

// 그룹 가입 응답 처리
notificationSocket.on('joinedGroup', (data) => {
  console.log(`Joined group: ${data.group}`);
});

// 그룹 탈퇴 응답 처리
notificationSocket.on('leftGroup', (data) => {
  console.log(`Left group: ${data.group}`);
});

// 그룹에 가입
notificationSocket.emit('joinGroup', { group: 'admin' });

// 그룹에 알림 전송
notificationSocket.emit('sendGroupNotification', {
  group: 'admin',
  message: 'Hello, admin group!',
});

// 특정 사용자에게 알림 전송 (예: userId가 '1234'인 사용자에게)
notificationSocket.emit('sendNotification', {
  message: 'Hello, User 1234!',
  userId: '1234',
});

// 전체 사용자에게 알림 브로드캐스트
notificationSocket.emit('sendNotification', {
  message: 'Hello, everyone!',
});

// 그룹에서 탈퇴
notificationSocket.emit('leaveGroup', { group: 'admin' });
