import React, { useState, useEffect } from 'react';
import { Phone, Video, VideoOff, Mic, MicOff, RotateCcw } from 'lucide-react';
import { COLORS, CALL_STATES, formatTime } from '../constants/theme';

const VideoPanel = ({ onEndCall, onSwitchToAudio, contactName = "John Doe" }) => {
  const [callState, setCallState] = useState(CALL_STATES.RINGING);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [ringCount, setRingCount] = useState(0);

  // Simulate call ringing then connecting
  useEffect(() => {
    if (callState === CALL_STATES.RINGING) {
      const ringInterval = setInterval(() => {
        setRingCount(prev => {
          if (prev >= 3) {
            clearInterval(ringInterval);
            setCallState(CALL_STATES.CONNECTING);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      
      return () => clearInterval(ringInterval);
    }
  }, [callState]);

  // Simulate call connecting
  useEffect(() => {
    if (callState === CALL_STATES.CONNECTING) {
      const connectingTimeout = setTimeout(() => {
        setCallState(CALL_STATES.CONNECTED);
      }, 2000);

      return () => clearTimeout(connectingTimeout);
    }
  }, [callState]);

  // Call timer
  useEffect(() => {
    let timer;
    if (callState === CALL_STATES.CONNECTED) {
      timer = setInterval(() => {
        setCallDuration(prevDuration => prevDuration + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  const handleEndCall = () => {
    setCallState(CALL_STATES.ENDED);
    setTimeout(() => {
      if (onEndCall) onEndCall();
    }, 1500);
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);
  const switchCamera = () => setIsFrontCamera(!isFrontCamera);

  const handleSwitchToAudio = () => {
    if (onSwitchToAudio) onSwitchToAudio();
  };

  return (
    <div className="relative flex flex-col h-full overflow-hidden" style={{ backgroundColor: COLORS.dark }}>
      {/* Video layers */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Remote user's video (full screen) */}
        {!isVideoOff && callState === CALL_STATES.CONNECTED ? (
          <div className="absolute inset-0 bg-black">
            <img 
              src="/person2.jpg" 
              alt="Remote video" 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: COLORS.dark }}>
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
              <img 
                src="/person2.jpg" 
                alt={contactName} 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Self video (picture in picture) */}
        <div className="absolute top-8 right-4 w-28 h-40 rounded-lg overflow-hidden border-2 border-white shadow-lg z-10">
          <img 
            src="/person1.jpg" 
            alt="Self video" 
            className="w-full h-full object-cover"
          />
          {isMuted && (
            <div className="absolute bottom-2 right-2 bg-red-500 rounded-full p-1">
              <MicOff size={14} color="white" />
            </div>
          )}
        </div>
      </div>

      {/* Call information overlay - at top */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center">
          <h3 className="text-white font-semibold">{contactName}</h3>
          <span className="text-gray-300 ml-2 text-sm">
            {callState === CALL_STATES.RINGING && "Ringing..."}
            {callState === CALL_STATES.CONNECTING && "Connecting..."}
            {callState === CALL_STATES.CONNECTED && formatTime(callDuration)}
            {callState === CALL_STATES.ENDED && "Call ended"}
          </span>
        </div>
      </div>

      {/* Call controls - at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
        {/* Primary controls */}
        <div className="flex justify-center items-center mb-4">
          <button
            onClick={toggleMute}
            className="flex items-center justify-center w-12 h-12 rounded-full mx-2"
            style={{ 
              backgroundColor: isMuted ? COLORS.primary : 'rgba(255, 255, 255, 0.2)' 
            }}
          >
            {isMuted ? <MicOff size={24} color="white" /> : <Mic size={24} color="white" />}
          </button>
          
          <button
            onClick={handleEndCall}
            className="flex items-center justify-center w-16 h-16 rounded-full mx-4"
            style={{ backgroundColor: COLORS.danger }}
            disabled={callState === CALL_STATES.RINGING || callState === CALL_STATES.CONNECTING}
          >
            <Phone size={28} color="white" style={{ transform: 'rotate(135deg)' }} />
          </button>
          
          <button
            onClick={toggleVideo}
            className="flex items-center justify-center w-12 h-12 rounded-full mx-2"
            style={{ 
              backgroundColor: isVideoOff ? COLORS.primary : 'rgba(255, 255, 255, 0.2)' 
            }}
          >
            {isVideoOff ? <VideoOff size={24} color="white" /> : <Video size={24} color="white" />}
          </button>
        </div>

        {/* Secondary controls */}
        <div className="flex justify-center">
          <button
            onClick={switchCamera}
            className="flex items-center justify-center w-10 h-10 rounded-full mx-2 bg-gray-800 bg-opacity-50"
          >
            <RotateCcw size={20} color="white" />
          </button>
          
          <button
            onClick={handleSwitchToAudio}
            className="flex items-center justify-center w-10 h-10 rounded-full mx-2 bg-gray-800 bg-opacity-50 text-white text-xs px-3"
          >
            Audio
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;