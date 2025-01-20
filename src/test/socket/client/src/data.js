
const { io } = require('socket.io-client');

const socket = io('http://localhost:3000/data');

// 데이터 업데이트 이벤트 수신
socket.on('dataUpdate', (data) => {
  console.log('Data update received:', data);

  // 데이터 처리 로직
});