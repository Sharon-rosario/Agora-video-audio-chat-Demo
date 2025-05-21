import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatPanel from '../components/ChatPanel';
import AudioPanel from '../components/AudioPanel';
import VideoPanel from '../components/VideoPanel';
import CallPopup from '../components/CallPopup';
import CallReceiverPopup from '../components/CallReceiverPopup.tsx';
import { ConsultationTheme } from '../constants/theme';

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

  useEffect(() => {
    if (location.state?.patientName) setPatientName(location.state.patientName);
  }, [location]);

  useEffect(() => {
    if (socket) {
      socket.on('incoming_call', (data) => {
        console.log('Incoming call:', data);
        setIncomingCall(data);
        console.log('incomingCall state set to:', data);
      });

      return () => {
        socket.off('incoming_call');
      };
    }
  }, [socket]);

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
    const callId = `call_${Date.now()}`; // Generate a unique callId
    socket.emit('call_status_update', {
      callId,
      callType,
      status: 'initiated',
      userId: 'doctor456',
      startTime: new Date().toISOString(),
    });
    setCurrentCall({ callId, callType });
    setActivePanel(callType);
    setShowPopup(false);
  };

  const handleAcceptCall = (callData) => {
    socket.emit('call_status_update', {
      callId: callData.callId,
      status: 'accepted',
      userId: 'doctor456',
      startTime: new Date().toISOString(),
    });
    setActivePanel(callData.callType);
    setCurrentCall(callData);
    setIncomingCall(null);
  };

  const handleRejectCall = (callData) => {
    socket.emit('call_status_update', {
      callId: callData.callId,
      status: 'rejected',
      userId: 'doctor456',
    });
    setIncomingCall(null);
  };

  const endCall = () => {
    if (currentCall) {
      socket.emit('call_status_update', {
        callId: currentCall.callId,
        status: 'ended',
        userId: 'doctor456',
        endTime: new Date().toISOString(),
      });
      setCurrentCall(null);
    }
    setActivePanel('chat');
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

          <div
            className="w-10 h-10 rounded-full flex items-center justify-center ml-2"
            style={{ backgroundColor: ConsultationTheme.avatarBg }}
          >
            <span className="font-semibold text-lg" style={{ color: ConsultationTheme.headerText }}>
              {patientName[0]}
            </span>
          </div>

          <h2 className="ml-3 text-lg font-medium">{patientName}</h2>
        </div>

        <div className="flex space-x-4">
          <IconButton>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </IconButton>

          <IconButton>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0
                       002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0
                       002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </IconButton>

          <IconButton onClick={() => handleCallAction('audio')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0
                       01.948.684l1.498 4.493a1 1 0
                       01-.502 1.21l-2.257 1.13a11.042
                       11.042 0 005.516 5.516l1.13-2.257a1
                       1 0 011.21-.502l4.493 1.498a1 1
                       0 01.684.949V19a2 2 0 01-2
                       2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </IconButton>

          <IconButton onClick={() => handleCallAction('video')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0
                       0121 8.618v6.764a1 1 0
                       01-1.447.894L15 14M5 18h8a2 2 0
                       002-2V8a2 2 0 00-2-2H5a2 2 0
                       00-2 2v8a2 2 0 002 2z" />
            </svg>
          </IconButton>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 flex flex-row mt-16 relative overflow-hidden"
      >
        <div className="h-full p-4" style={{ width: activePanel === 'chat' ? '100%' : `${splitPosition}%` }}>
          <ChatPanel socket={socket} />
        </div>

        {(activePanel === 'audio' || activePanel === 'video') && (
          <div
            ref={dividerRef}
            className="w-2 my-4 rounded-xl cursor-col-resize flex items-center justify-center"
            style={{ backgroundColor: ConsultationTheme.dividerBg }}
            onMouseDown={startDrag}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = ConsultationTheme.dividerHoverBg}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ConsultationTheme.dividerBg}
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
            />
          </div>
        )}
        {activePanel === 'video' && (
          <div className="h-full p-4" style={{ width: `calc(100% - ${splitPosition}% - 0.5rem)` }}>
            <VideoPanel onEndCall={endCall} />
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
        console.log('Rendering CallReceiverPopup with data:', incomingCall),
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