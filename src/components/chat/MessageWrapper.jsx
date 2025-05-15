import React from 'react';
import TextMessage from './messageTypeComponents/TextMessage.tsx';
import AudioMessage from './messageTypeComponents/AudioMessage.tsx';
import VideoMessage from './messageTypeComponents/VideoMessage.tsx';
import FileMessage from './messageTypeComponents/FileMessage.tsx';
import DocMessage from './messageTypeComponents/DocMessage.tsx';

const MessageWrapper = ({ message }) => {
  const { sender, type, tagged } = message;
  const isYou = sender === 'You';
  
  // Base styling
  const baseClass = 'mb-4 p-3 rounded-xl shadow-sm max-w-[70%]';
  const senderClass = isYou ? 'bg-[#DCF8C6]' : 'bg-white';
  const taggedClass = tagged ? 'border-l-4 border-blue-500' : '';
  const alignmentClass = isYou ? 'ml-auto' : '';
  
  // Get avatar based on sender
  const getAvatar = () => {
    if (isYou) {
      return "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f464.svg"; // Placeholder for user avatar
    } else {
      // Different avatars for different senders
      const avatarMap = {
        'Dr. Smith': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9d1-200d-2695-fe0f.svg',
        'Nurse Johnson': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f469-200d-2695-fe0f.svg',
        'Dr. Williams': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f468-200d-2695-fe0f.svg',
        'Receptionist': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9d1-200d-1f4bc.svg'
      };
      
      return avatarMap[sender] || 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f464.svg'; // Default avatar
    }
  };

  let MessageComponent;
  switch (type) {
    case 'text':
      MessageComponent = TextMessage;
      break;
    case 'audio':
      MessageComponent = AudioMessage;
      break;
    case 'video':
      MessageComponent = VideoMessage;
      break;
    case 'file':
      MessageComponent = FileMessage;
      break;
    case 'doc':
      MessageComponent = DocMessage;
      break;
    default:
      MessageComponent = TextMessage;
  }

  return (
    <div className={`flex items-end mb-4 ${isYou ? 'justify-end' : 'justify-start'}`}>
      {!isYou && (
        <div className="flex-shrink-0 mr-2">
          <img src={getAvatar()} alt={`${sender} avatar`} className="w-8 h-8 rounded-full" />
        </div>
      )}
      
      <div className={`${baseClass} ${senderClass} ${taggedClass} ${alignmentClass}`}>
        {!isYou && (
          <p className="text-xs font-medium text-gray-600 mb-1">{sender}</p>
        )}
        <MessageComponent message={message} />
      </div>
      
      {isYou && (
        <div className="flex-shrink-0 ml-2">
          <img src={getAvatar()} alt="Your avatar" className="w-8 h-8 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default MessageWrapper;