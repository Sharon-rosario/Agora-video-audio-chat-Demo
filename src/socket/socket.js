console.log('Testing admin socket connection...');
const io = require('socket.io-client');

const socket = io('http://192.168.1.8:8000', {
  transports: ['websocket', 'polling'],
  timeout: 15000,
  reconnection: false,
  forceNew: true,
});

socket.on('connect', () => {
  console.log('✅ Admin connected to remote server successfully');
  console.log('Socket ID:', socket.id);
  console.log('Transport:', socket.io.engine.transport.name);

  // Register admin
  socket.emit('register', { userId: 'admin001', role: 'admin' });
  console.log('📝 Admin registration sent');

  // Simulate call initiation to doctor
  setTimeout(() => {
    const callData = {
      uuid: 'call_uuid_123456',
      doctorName: 'Dr. John Smith',
      callType: 'video', // Can be 'audio' or 'video'
      channelName: 'consultation_channel_001',
      token: 'dummy_token_789xyz',
      callerId: 'admin001',
      receiverId: 'doctor456',
      callId: 'call_002',
    };
    socket.emit('incoming_call', callData);
    console.log('📞 Admin call simulation sent:', callData);
  }, 2000);

  // Disconnect after 10 seconds
  setTimeout(() => {
    socket.disconnect();
  }, 10000);
});

socket.on('connect_error', (error) => {
  console.log('❌ Admin connection error:', error.message);
  console.log('Error type:', error.type);
  console.log('Error description:', error.description);
  process.exit(1);
});

socket.on('disconnect', (reason) => {
  console.log('🔌 Admin disconnected from remote server. Reason:', reason);
  process.exit(0);
});

socket.on('call_status_update', (data) => {
  console.log('📞 Admin received call status update:', data);
});

// Connection timeout
setTimeout(() => {
  if (!socket.connected) {
    console.log('⏰ Admin connection timeout - server may not be reachable');
    process.exit(1);
  }
}, 20000);