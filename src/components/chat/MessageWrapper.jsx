import React, { useState, useRef, useEffect } from 'react';
import TextMessage from './messageTypeComponents/TextMessage.tsx';
import AudioMessage from './messageTypeComponents/AudioMessage.tsx';
import VideoMessage from './messageTypeComponents/VideoMessage.tsx';
import FileMessage from './messageTypeComponents/FileMessage.tsx';
import DocMessage from './messageTypeComponents/DocMessage.tsx';
import ImageMessage from './messageTypeComponents/ImageMessage.tsx';
import CallRequestMessage from './messageTypeComponents/CallRequestMessage.tsx';
import { CallRequestStyles, ChatTheme } from '../../constants/theme.js';

const MessageWrapper = ({ message, onReply, onDelete, allMessages, onAccept, onReject }) => {
  const { sender, type, tagged, timestamp, replyTo, callStatus } = message;
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

  const repliedMessage = replyTo ? allMessages.find((msg) => msg.id === replyTo) : null;
  const isYou = sender === message.currentUserAgoraUid; // Assuming currentUserAgoraUid is passed or derived

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
        'doctor': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9d1-200d-2695-fe0f.svg',
        'patient': 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f464.svg',
      };
      return avatarMap[message.senderRole] || 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f464.svg';
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
    case 'callRequest':
      MessageComponent = CallRequestMessage;
      break;
    default:
      MessageComponent = TextMessage;
  }

  const getReplyPreview = () => {
    if (!repliedMessage) return null;

    const previewContent = repliedMessage.type === 'text'
      ? repliedMessage.content.length > 20
        ? `${repliedMessage.content.substring(0, 20)}…`
        : repliedMessage.content
      : repliedMessage.type === 'image'
      ? 'Image'
      : repliedMessage.type === 'callRequest'
      ? `${repliedMessage.content.callType?.charAt(0).toUpperCase() + repliedMessage.content.callType?.slice(1)} Call Request`
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
      {!isYou && (
        <div className="flex-shrink-0 mr-2">
          <img
            src={getAvatar()}
            alt={`${sender} avatar`}
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}

      <div className={`${baseClass} ${alignmentClass}`} style={bubbleStyle}>
        {!isYou && (
          <p className="text-xs font-medium text-gray-700 mb-1">{sender}</p>
        )}

        {replyTo && getReplyPreview()}

        <MessageComponent
          message={{ ...message, callStatus }}
          {...(type === 'callRequest' ? { onAccept, onReject } : {})}
        />

        <div className="flex items-center justify-end mt-3 text-xs" style={{ color: CallRequestStyles.timestamp.color }}>
          <span>{timestamp}</span>

          <div className="relative ml-1" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[15px] focus:outline-none"
              style={{ color: CallRequestStyles.menuButton.hoverColor }}
            >
              ⋮
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-28 p-2 rounded-xl shadow-lg z-50 text-sm"
                style={{
                  backgroundColor: CallRequestStyles.menu.backgroundColor,
                  border: `1px solid ${CallRequestStyles.menu.borderColor}`,
                }}
              >
                <button
                  onClick={() => {
                    onReply?.(message);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 my-[1px] rounded transition-colors duration-200"
                  style={{
                    color: CallRequestStyles.menuItem.reply.color,
                    backgroundColor: CallRequestStyles.menuItem.reply.hoverBackground,
                  }}
                >
                  Reply
                </button>

                <button
                  onClick={() => {
                    onDelete?.(message);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded transition-colors duration-200"
                  style={{
                    color: CallRequestStyles.menuItem.delete.color,
                    backgroundColor: CallRequestStyles.menuItem.delete.hoverBackground,
                  }}
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