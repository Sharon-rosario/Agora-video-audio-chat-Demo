import React, { useState, useRef, useEffect } from 'react';
import TextMessage from './messageTypeComponents/TextMessage.tsx';
import AudioMessage from './messageTypeComponents/AudioMessage.tsx';
import VideoMessage from './messageTypeComponents/VideoMessage.tsx';
import FileMessage from './messageTypeComponents/FileMessage.tsx';
import DocMessage from './messageTypeComponents/DocMessage.tsx';

const MessageWrapper = ({ message, onReply, onDelete }) => {
  const { sender, type, tagged, timestamp } = message;
  const isYou = sender === 'You';

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseClass = 'mb-1 p-3 rounded-xl shadow-sm max-w-[70%] relative';
  const senderClass = isYou ? 'bg-[#DCF8C6]' : 'bg-white';
  const taggedClass = tagged ? 'border-l-4 border-blue-500' : '';
  const alignmentClass = isYou ? 'ml-auto' : '';

  const getAvatar = () => {
    if (isYou) {
      return "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f464.svg";
    } else {
      const avatarMap = {
        'Dr. Smith': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9d1-200d-2695-fe0f.svg',
        'Nurse Johnson': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f469-200d-2695-fe0f.svg',
        'Dr. Williams': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f468-200d-2695-fe0f.svg',
        'Receptionist': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9d1-200d-1f4bc.svg'
      };
      return avatarMap[sender] || 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f464.svg';
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
          <p className="text-xs font-medium text-gray-700 mb-1">{sender}</p>
        )}

        <MessageComponent message={message} />

        {/* Timestamp and 3-dot menu */}
        <div className="flex items-center justify-end mt-3 text-xs text-gray-600">
          <span>{timestamp || '12:45 PM'}</span>

          <div className="relative ml-1" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 text-[15px] hover:text-gray-800 focus:outline-none"
            >
              &#8942;
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border p-2 rounded-xl shadow-lg z-50 text-sm">
                <button
                  onClick={() => {
                    onReply?.(message);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 my-[1px] rounded hover:bg-gray-300"
                >
                  Reply
                </button>
      

                <button
                  onClick={() => {
                    onDelete?.(message);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded text-red-600 hover:bg-gray-200"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
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
