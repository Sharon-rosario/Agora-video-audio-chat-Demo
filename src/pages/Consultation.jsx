import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatPanel from '../components/ChatPanel';
import AudioPanel from '../components/AudioPanel';
import VideoPanel from '../components/VideoPanel';
import CallPopup from '../components/CallPopup';

const Consultation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [patientName, setPatientName] = useState('Unknown');
  const [activePanel, setActivePanel] = useState('chat');
  const [showPopup, setShowPopup] = useState(false);
  const [callType, setCallType] = useState(null);
  const [splitPosition, setSplitPosition] = useState(50); // Default split 50%
  const dividerRef = useRef(null);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const state = location.state;
    if (state?.patientName) {
      setPatientName(state.patientName);
    }
  }, [location]);

  useEffect(() => {
    // Set up event listeners for dragging
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      
      const container = containerRef.current;
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      // Limit the drag range (10% to 90%)
      const limitedPosition = Math.min(Math.max(newPosition, 10), 90);
      setSplitPosition(limitedPosition);
    };
    
    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
    
    if (activePanel === 'audio' || activePanel === 'video') {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activePanel]);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; // Prevent text selection while dragging
    e.preventDefault();
  };

  const handleCallAction = (type) => {
    setCallType(type);
    setShowPopup(true);
  };

  const startCall = () => {
    setActivePanel(callType);
    setShowPopup(false);
  };

  const endCall = () => {
    setActivePanel('chat');
  };

  return (
    <div className="h-screen bg-[#ECE5DD] flex flex-col">
      {/* Header */}
      <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center">
          <button className="mr-4" onClick={() => navigate(-1)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-10 h-10 bg-[#B0BEC5] rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">{patientName[0]}</span>
          </div>
          <h2 className="ml-3 text-lg font-medium text-white">{patientName}</h2>
        </div>
        <div className="flex space-x-4">
          <button className="p-2 hover:bg-[#064e45] rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[#064e45] rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[#064e45] rounded-full" onClick={() => handleCallAction('audio')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[#064e45] rounded-full" onClick={() => handleCallAction('video')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Consultation Body */}
      <div 
        ref={containerRef}
        className="flex-1 flex flex-row mt-16 relative overflow-hidden"
      >
        {/* Chat Panel - full width by default, or dynamic width when in call */}
        <div 
          className="h-full p-4"
          style={{
            width: activePanel === 'chat' 
              ? '100%' 
              : `${splitPosition}%`
          }}
        >
          <ChatPanel />
        </div>

        {/* Divider when in split mode */}
        {(activePanel === 'audio' || activePanel === 'video') && (
          <div 
            ref={dividerRef}
            className="w-2 my-4 bg-gray-300 rounded-xl hover:bg-gray-400 cursor-col-resize flex items-center justify-center"
            onMouseDown={handleMouseDown}
          >
            <div className="h-8 w-1 bg-gray-500 rounded"></div>
          </div>
        )}

        {/* Media Panel - only shown when in call */}
        {activePanel === 'audio' && (
          <div 
            className="h-full p-4"
            style={{ width: `calc(100% - ${splitPosition}% - 0.5rem)` }}
          >
            <AudioPanel onEndCall={endCall} />
          </div>
        )}
        
        {activePanel === 'video' && (
          <div 
            className="h-full p-4"
            style={{ width: `calc(100% - ${splitPosition}% - 0.5rem)` }}
          >
            <VideoPanel onEndCall={endCall} />
          </div>
        )}
      </div>

      {/* Call Popup */}
      {showPopup && (
        <CallPopup
          callType={callType}
          onStartCall={startCall}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Consultation;