import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Listing from './pages/Listing';
import Consultation from './pages/Consultation';
import io from 'socket.io-client';

// Initialize Socket.IO client
const socket = io('http://192.168.29.140:8000', {
  transports: ['websocket', 'polling'], // Allow fallback to polling
  autoConnect: false, // We'll connect manually in useEffect
  timeout: 15000, // Match admin socket client timeout
  reconnection: false, // Match admin socket client for testing
  forceNew: true, // Match admin socket client
});

function App() {
  useEffect(() => {
    // Connect to the Socket.IO server when the component mounts
    socket.connect();

    // Log connection and register the admin
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      // Register as admin
      socket.emit('register', { userId: 'admin001', role: 'admin' });
    });

    socket.on('connect_error', (error) => {
      console.log('❌ Admin connection error:', error.message);
    });

    // Cleanup: Disconnect when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listing />} />
        {/* Pass the socket to Consultation */}
        <Route path="/consultation" element={<Consultation socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;