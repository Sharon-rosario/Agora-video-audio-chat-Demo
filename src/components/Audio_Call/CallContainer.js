import React, { useState } from 'react';
import AudioPanel from './AudioPanel';
import VideoPanel from './VideoPanel';
import { COLORS } from '../../constants/theme';

const CallContainer = ({ initialMode = 'audio', contactName = 'John Doe', onClose }) => {
  const [callMode, setCallMode] = useState(initialMode); // 'audio' or 'video'
  
  const handleSwitchToVideo = () => {
    setCallMode('video');
  };
  
  const handleSwitchToAudio = () => {
    setCallMode('audio');
  };
  
  return (
    <div className="w-full h-full bg-gray-100">
      {callMode === 'audio' ? (
        <AudioPanel 
          onEndCall={onClose} 
          onSwitchToVideo={handleSwitchToVideo}
          contactName={contactName}
        />
      ) : (
        <VideoPanel 
          onEndCall={onClose} 
          onSwitchToAudio={handleSwitchToAudio}
          contactName={contactName}
        />
      )}
    </div>
  );
};

// Example usage demo component
const CallDemo = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callType, setCallType] = useState('audio');
  const [contactName, setContactName] = useState('Sarah Johnson');
  
  const startCall = (type) => {
    setCallType(type);
    setIsCallActive(true);
  };
  
  const endCall = () => {
    setIsCallActive(false);
  };
  
  if (isCallActive) {
    return (
      <div className="w-screen h-screen">
        <CallContainer 
          initialMode={callType}
          contactName={contactName}
          onClose={endCall}
        />
      </div>
    );
  }
  
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: COLORS.lightGray }}>
      <div className="w-full max-w-md p-6 rounded-lg shadow-md" style={{ backgroundColor: COLORS.light }}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.primary }}>WhatsApp Call Demo</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div className="flex justify-between mt-8">
          <button 
            onClick={() => startCall('audio')}
            className="flex items-center justify-center px-6 py-3 rounded-md"
            style={{ backgroundColor: COLORS.primary, color: COLORS.light }}
          >
            <Phone size={18} className="mr-2" />
            Start Audio Call
          </button>
          
          <button 
            onClick={() => startCall('video')}
            className="flex items-center justify-center px-6 py-3 rounded-md"
            style={{ backgroundColor: COLORS.primary, color: COLORS.light }}
          >
            <Video size={18} className="mr-2" />
            Start Video Call
          </button>
        </div>
      </div>
    </div>
  );
};

// Don't forget to import the icon
import { Phone, Video } from 'lucide-react';

export default CallDemo;