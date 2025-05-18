import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Listing from './pages/Listing';
import Consultation from './pages/Consultation';
import io from 'socket.io-client';

// Initialize Socket.IO client
const socket = io('http://localhost:8000', {
  transports: ['websocket'],
  autoConnect: false, // We'll connect manually in useEffect
});

function App() {
  useEffect(() => {
    // Connect to the Socket.IO server when the component mounts
    socket.connect();

    // Log connection and register the doctor
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      // Hardcoding doctor's ID for now; replace with actual auth logic later
      socket.emit('register', { userId: 'doctor456', role: 'doctor' });
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