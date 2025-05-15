import React from 'react';
import TextMessage from './messageTypeComponents/TextMessage.tsx';
import AudioMessage from './messageTypeComponents/AudioMessage.tsx';
import VideoMessage from './messageTypeComponents/VideoMessage.tsx';
import FileMessage from './messageTypeComponents/FileMessage.tsx';
import DocMessage from './messageTypeComponents/DocMessage.tsx';

const MessageWrapper = ({ message }) => {
  const { sender, type, tagged } = message;
  const baseClass = 'mb-4 p-3 rounded-xl shadow-sm';
  const senderClass = sender === 'You' ? 'bg-[#DCF8C6] ml-auto' : 'bg-white';
  const taggedClass = tagged ? 'border-l-4 border-blue-500' : '';
  const className = `${baseClass} ${senderClass} ${taggedClass}`;

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
    <div className={className} style={{ maxWidth: '70%' }}>
      <MessageComponent message={message} />
    </div>
  );
};

export default MessageWrapper;