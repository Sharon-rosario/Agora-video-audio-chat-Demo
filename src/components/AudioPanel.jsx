import React, { useState, useEffect } from 'react';
import { Phone, Video, Mic, MicOff, Volume2, VolumeX, MoreVertical, MessageSquare } from 'lucide-react';
import { COLORS, CALL_STATES, formatTime } from '../constants/theme';

const AudioPanel = ({ onEndCall, onSwitchToVideo, contactName = "John Doe" }) => {
  const [callState, setCallState] = useState(CALL_STATES.RINGING);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
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
  const toggleSpeaker = () => setIsSpeakerOn(!isSpeakerOn);

  const handleSwitchToVideo = () => {
    if (onSwitchToVideo) onSwitchToVideo();
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: COLORS.secondary }}>
      {/* Contact information */}
      <div className="flex flex-col items-center justify-start pt-16 pb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 overflow-hidden">
          <img 
            src="/person2.jpg" 
            alt={contactName} 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">{contactName}</h2>
        <p className="text-gray-400">
          {callState === CALL_STATES.RINGING && "Ringing..."}
          {callState === CALL_STATES.CONNECTING && "Connecting..."}
          {callState === CALL_STATES.CONNECTED && formatTime(callDuration)}
          {callState === CALL_STATES.ENDED && "Call ended"}
        </p>
      </div>

      {/* Spacer to push controls to bottom */}
      <div className="flex-grow"></div>

      {/* Call controls */}
      <div className="flex flex-col items-center pb-16">
        {/* Action buttons */}
        <div className="flex justify-center items-center mb-8 relative">
          {/* Primary controls */}
          <button
            onClick={toggleSpeaker}
            className="flex items-center justify-center w-12 h-12 rounded-full mx-2 bg-gray-800"
            style={{ 
              backgroundColor: isSpeakerOn ? COLORS.primary : COLORS.dark
            }}
          >
            {isSpeakerOn ? <Volume2 size={24} color="white" /> : <VolumeX size={24} color="white" />}
          </button>

          <button
            onClick={toggleMute}
            className="flex items-center justify-center w-12 h-12 rounded-full mx-2 bg-gray-800"
            style={{ 
              backgroundColor: isMuted ? COLORS.primary : COLORS.dark
            }}
          >
            {isMuted ? <MicOff size={24} color="white" /> : <Mic size={24} color="white" />}
          </button>
          
          <button
            onClick={handleSwitchToVideo}
            className="flex items-center justify-center w-12 h-12 rounded-full mx-2"
            style={{ backgroundColor: COLORS.dark }}
          >
            <Video size={24} color="white" />
          </button>
        </div>

        {/* End call button */}
        <button
          className="flex items-center justify-center w-16 h-16 rounded-full"
          style={{ backgroundColor: COLORS.danger }}
          onClick={handleEndCall}
          disabled={callState === CALL_STATES.RINGING || callState === CALL_STATES.CONNECTING}
        >
          <Phone size={28} color="white" style={{ transform: 'rotate(135deg)' }} />
        </button>
      </div>
    </div>
  );
};

export default AudioPanel;