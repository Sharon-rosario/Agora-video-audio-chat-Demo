import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const state = location.state;
    if (state?.patientName) {
      setPatientName(state.patientName);
    }
  }, [location]);

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
      <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md">
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
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <ChatPanel />
        {activePanel === 'audio' && <AudioPanel onEndCall={endCall} />}
        {activePanel === 'video' && <VideoPanel onEndCall={endCall} />}
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