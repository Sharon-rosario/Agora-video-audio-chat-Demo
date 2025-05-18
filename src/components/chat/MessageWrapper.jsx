import React, { useState, useRef, useEffect } from 'react';
import TextMessage from './messageTypeComponents/TextMessage.tsx';
import AudioMessage from './messageTypeComponents/AudioMessage.tsx';
import VideoMessage from './messageTypeComponents/VideoMessage.tsx';
import FileMessage from './messageTypeComponents/FileMessage.tsx';
import DocMessage from './messageTypeComponents/DocMessage.tsx';
import ImageMessage from './messageTypeComponents/ImageMessage.tsx';
import AudioCallMessage from './messageTypeComponents/AudioCallMessage.tsx'; // New import
import VideoCallMessage from './messageTypeComponents/VideoCallMessage.tsx'; // New import
import { ChatTheme } from '../../constants/theme.js';

const MessageWrapper = ({ message, onReply, onDelete, allMessages }) => {
  const { sender, type, tagged, time, replyTo } = message;
  const isYou = sender === 'You';

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find the replied-to message
  const repliedMessage = replyTo ? allMessages.find((msg) => msg.id === replyTo) : null;

  // Layout & utility classes stay as Tailwind — colours come from the ChatTheme object
  const baseClass = 'mb-1 p-3 rounded-xl shadow-sm max-w-[70%] relative';
  const alignmentClass = isYou ? 'ml-auto' : '';
  const taggedStyle = tagged ? { borderLeft: `4px solid ${ChatTheme.taggedBorder}` } : {};

  const bubbleStyle = {
    backgroundColor: isYou ? ChatTheme.bubbleMe : ChatTheme.bubbleOthers,
    ...taggedStyle,
  };

  const getAvatar = () => {
    if (isYou) {
      return 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f464.svg';
    } else {
      const avatarMap = {
        'Dr. Smith': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9d1-200d-2695-fe0f.svg',
        'Nurse Johnson': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f469-200d-2695-fe0f.svg',
        'Dr. Williams': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f468-200d-2695-fe0f.svg',
        'Receptionist': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9d1-200d-1f4bc.svg',
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
    case 'image':
      MessageComponent = ImageMessage;
      break;
    case 'audioCall': // Add support for audioCall type
      MessageComponent = AudioCallMessage;
      break;
    case 'videoCall': // Add support for videoCall type
      MessageComponent = VideoCallMessage;
      break;
    default:
      MessageComponent = TextMessage;
  }

  // Generate a preview for the replied-to message
  const getReplyPreview = () => {
    if (!repliedMessage) return null;

    const previewContent = repliedMessage.type === 'text'
      ? repliedMessage.content.length > 20
        ? `${repliedMessage.content.substring(0, 20)}…`
        : repliedMessage.content
      : repliedMessage.type === 'image'
      ? 'Image'
      : repliedMessage.type === 'audioCall'
      ? 'Audio Call'
      : repliedMessage.type === 'videoCall'
      ? 'Video Call'
      : repliedMessage.type.charAt(0).toUpperCase() + repliedMessage.type.slice(1);

    return (
      <div className="mb-2 p-2 rounded-lg border-l-4 border-gray-400 bg-gray-100">
        <p className="text-xs font-medium text-gray-700">{repliedMessage.sender}</p>
        <p className="text-xs text-gray-600">{previewContent}</p>
      </div>
    );
  };

  return (
    <div className={`flex items-end mb-4 ${isYou ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar (left for others) */}
      {!isYou && (
        <div className="flex-shrink-0 mr-2">
          <img
            src={getAvatar()}
            alt={`${sender} avatar`}
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}

      {/* Message bubble */}
      <div className={`${baseClass} ${alignmentClass}`} style={bubbleStyle}>
        {!isYou && (
          <p className="text-xs font-medium text-gray-700 mb-1">{sender}</p>
        )}

        {/* Reply preview */}
        {replyTo && getReplyPreview()}

        <MessageComponent message={message} />

        {/* Timestamp & menu */}
        <div className="flex items-center justify-end mt-3 text-xs" style={{ color: ChatTheme.timeStamp }}>
          <span>{time || '12:45 PM'}</span>

          {/* 3-dot menu */}
          <div className="relative ml-1" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[15px] hover:text-gray-800 focus:outline-none"
            >
              ⋮
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border p-2 rounded-xl shadow-lg z-50 text-sm">
                <button
                  onClick={() => {
                    onReply?.(message);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 my-[1px] rounded hover:bg-gray-300"
                  style={{ '--tw-bg-opacity': 1, backgroundColor: ChatTheme.hoverNeutral }}
                >
                  Reply
                </button>

                <button
                  onClick={() => {
                    onDelete?.(message);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded text-red-600 hover:bg-gray-200"
                  style={{ '--tw-bg-opacity': 1, backgroundColor: ChatTheme.hoverDanger }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Avatar (right for you) */}
      {isYou && (
        <div className="flex-shrink-0 ml-2">
          <img src={getAvatar()} alt="Your avatar" className="w-8 h-8 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default MessageWrapper;