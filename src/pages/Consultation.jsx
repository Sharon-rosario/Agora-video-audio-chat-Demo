import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatPanel from '../components/ChatPanel';
import AudioPanel from '../components/AudioPanel';
import VideoPanel from '../components/VideoPanel';
import CallPopup from '../components/CallPopup';
import CallReceiverPopup from '../components/CallReceiverPopup.tsx';
import { ConsultationTheme } from '../constants/theme';
import { v4 as uuidv4 } from 'uuid';


const IconButton = ({ onClick, children }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="p-2 rounded-full"
      style={{ backgroundColor: hover ? ConsultationTheme.headerHover : 'transparent' }}
    >
      {children}
    </button>
  );
};

const Consultation = ({ socket }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [patientName, setPatientName] = useState('Unknown');
  const [activePanel, setActivePanel] = useState('chat');
  const [showPopup, setShowPopup] = useState(false);
  const [callType, setCallType] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [currentCall, setCurrentCall] = useState(null);
  const [splitPosition, setSplitPosition] = useState(40);

  const dividerRef = useRef(null);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Static doctor image
  const doctorImage = 'https://genima-recipes.s3.ap-south-1.amazonaws.com/1737259777590_37676934681e4644b95fdfca35931954.jpg';

  useEffect(() => {
    if (location.state?.patientName) setPatientName(location.state.patientName);
  }, [location]);

  useEffect(() => {
    if (!socket) return;

    socket.on('incoming_call', (data) => {
      console.log('📞 Incoming call:', JSON.stringify(data, null, 2));
      setIncomingCall(data);
    });

    socket.on('call_status_update', (data) => {
      console.log('📞 Call status update:', JSON.stringify(data, null, 2));
      if (data.callId === currentCall?.callId) {
        if (data.status === 'accepted') {
          setActivePanel(data.callType);
          setCurrentCall((prev) => ({ ...prev, status: 'accepted' }));
        } else if (data.status === 'rejected' || data.status === 'ended') {
          setCurrentCall(null);
          setActivePanel('chat');
          setIncomingCall(null); // Ensure incoming call is cleared
        }
      }
    });

    socket.on('message', (data) => {
      console.log('💬 Received message:', JSON.stringify(data, null, 2));
      // Ensure ChatPanel handles incoming messages appropriately
    });

    return () => {
      socket.off('incoming_call');
      socket.off('call_status_update');
      socket.off('message');
    };
  }, [socket, currentCall?.callId]);

  useEffect(() => {
    const move = (e) => {
      if (!isDraggingRef.current) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const percent = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPosition(Math.min(Math.max(percent, 10), 90));
    };

    const stop = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (activePanel === 'audio' || activePanel === 'video') {
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', stop);
    }

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stop);
    };
  }, [activePanel]);

  const startDrag = (e) => {
    isDraggingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  };

  const handleCallAction = (type) => {
    setCallType(type);
    setShowPopup(true);
  };

  const startCall = () => {
    const callId = `call_${uuidv4()}`; // Use UUID for unique call ID
    const callData = {
      uuid: uuidv4(), // Unique call UUID
      doctorName: 'Dr. John Smith',
      doctorImage,
      callType,
      channelName: `consultation_channel_${uuidv4()}`, // Unique channel name
      token: `token_${uuidv4()}`, // Unique token
      callId,
      callerId: 'doctor456',
      receiverId: 'patient123',
      status: 'initiated',
      userId: 'doctor456',
      startTime: new Date().toISOString(),
    };

    socket.emit('incoming_call', callData);
    console.log('📞 Doctor initiated call:', JSON.stringify(callData, null, 2));

    socket.emit('call_status_update', {
      callId,
      callType,
      status: 'initiated',
      userId: 'doctor456',
      startTime: new Date().toISOString(),
    });

    setCurrentCall({ callId, callType, status: 'initiated', ...callData });
    setActivePanel(callType); // Set panel immediately to ensure UI updates
    setShowPopup(false);
  };

  const handleAcceptCall = (callData) => {
    if (!callData?.callId) return;

    socket.emit('call_status_update', {
      callId: callData.callId,
      status: 'accepted',
      userId: 'doctor456',
      startTime: new Date().toISOString(),
    });

    setActivePanel(callData.callType);
    setCurrentCall({ ...callData, status: 'accepted' });
    setIncomingCall(null);
  };

  const handleRejectCall = (callData) => {
    if (!callData?.callId) return;

    socket.emit('call_status_update', {
      callId: callData.callId,
      status: 'rejected',
      userId: 'doctor456',
    });

    setIncomingCall(null);
    setActivePanel('chat');
  };

  const endCall = () => {
    if (!currentCall?.callId) return;

    socket.emit('call_status_update', {
      callId: currentCall.callId,
      status: 'ended',
      userId: 'doctor456',
      endTime: new Date().toISOString(),
    });

    setCurrentCall(null);
    setActivePanel('chat');
    setIncomingCall(null); // Clear any lingering incoming call
  };

  // const endCall = () => {
  //   if (currentCall) {
  //     socket.emit('call_status_update', {
  //       callId: currentCall.callId,
  //       status: 'ended',
  //       userId: 'admin001',
  //       endTime: new Date().toISOString(),
  //     });
  //     setCurrentCall(null);
  //   }
  //   setActivePanel('chat');
  // };

  const sendMessage = (content) => {
    const messageData = {
      messageId: uuidv4(),
      senderId: 'doctor456',
      receiverId: 'patient123',
      content,
      timestamp: new Date().toISOString(),
    };
    socket.emit('message', messageData);
    console.log('💬 Sent message:', JSON.stringify(messageData, null, 2));
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: ConsultationTheme.pageBg, position: 'relative' }}
    >
      <div
        className="fixed top-0 left-0 right-0 z-10 p-4 flex items-center justify-between shadow-md"
        style={{ backgroundColor: ConsultationTheme.headerBg, color: ConsultationTheme.headerText }}
      >
        <div className="flex items-center">
          <IconButton onClick={() => navigate(-1)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </IconButton>

          <img
            src={doctorImage}
            alt="Dr. John Smith"
            className="w-10 h-10 rounded-full ml-2 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/40'; // Fallback image
            }}
          />

          <h2 className="ml-3 text-lg font-medium">Dr. John Smith - {patientName}</h2>
        </div>

        <div className="flex space-x-4">
          <IconButton>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </IconButton>

          <IconButton>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </IconButton>

          <IconButton onClick={() => handleCallAction('audio')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </IconButton>

          <IconButton onClick={() => handleCallAction('video')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </IconButton>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 flex flex-row mt-16 relative overflow-hidden"
      >
        <div className="h-full p-4" style={{ width: activePanel === 'chat' ? '100%' : `${splitPosition}%` }}>
          <ChatPanel socket={socket} onSendMessage={sendMessage} />
        </div>

        {(activePanel === 'audio' || activePanel === 'video') && (
          <div
            ref={dividerRef}
            className="w-2 my-4 rounded-xl cursor-col-resize flex items-center justify-center"
            style={{ backgroundColor: ConsultationTheme.dividerBg }}
            onMouseDown={startDrag}
            nMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ConsultationTheme.dividerHoverBg)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ConsultationTheme.dividerBg)}
          >
            <div className="h-8 w-1 bg-gray-500 rounded" />
          </div>
        )}

        {activePanel === 'audio' && (
          <div className="h-full p-4" style={{ width: `calc(100% - ${splitPosition}% - 0.5rem)` }}>
            <AudioPanel
              onEndCall={endCall}
              onSwitchToVideo={() => setActivePanel('video')}
              contactName={patientName}
              callId={currentCall?.callId}
              // callData={currentCall} // Pass full callData for AudioPanel
            />
          </div>
        )}
        {activePanel === 'video' && (
          <div className="h-full p-4" style={{ width: `calc(100% - ${splitPosition}% - 0.5rem)` }}>
            <VideoPanel
              onEndCall={endCall}
              // callId={currentCall?.callId}
              // callData={currentCall} // Pass full callData for VideoPanel
            />
          </div>
        )}
      </div>

      {showPopup && (
        <CallPopup
          callType={callType}
          onStartCall={startCall}
          onCancel={() => setShowPopup(false)}
        />
      )}
      {incomingCall && (
        <CallReceiverPopup
          callData={incomingCall}
          onAccept={() => handleAcceptCall(incomingCall)}
          onReject={() => handleRejectCall(incomingCall)}
        />
      )}
    </div>
  );
};

export default Consultation;