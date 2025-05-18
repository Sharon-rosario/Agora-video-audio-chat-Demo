import React, { useEffect, useRef } from 'react';
import MessageWrapper from './chat/MessageWrapper';
import { ChatTheme } from '../constants/theme';
import { dummyMessages } from '../data/conversation';

const ChatPanel = () => {
  const chatEndRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, []);

  const handleReply = (message) => {
    console.log('Replying to:', message);
    // Implement reply logic here (e.g., set state to compose a reply)
  };

  const handleDelete = (message) => {
    console.log('Deleting:', message);
    // Implement delete logic here (e.g., filter out the message)
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat area */}
      <div
        className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500"
        style={{ backgroundColor: ChatTheme.panelBg }}
      >
        {dummyMessages.map((msg, i) => (
          <MessageWrapper
            key={i}
            message={msg}
            onReply={handleReply}
            onDelete={handleDelete}
            allMessages={dummyMessages} // Pass all messages to look up replyTo
          />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Composer */}
      <div className="p-3 flex items-center shadow-md" style={{ backgroundColor: ChatTheme.footerBg }}>
        <input
          type="text"
          placeholder="Type a message…"
          className="flex-1 bg-white rounded-full px-4 py-2 text-sm focus:outline-none shadow-sm"
        />
        {/* Actions */}
        <button className="p-2 mx-2 text-gray-500 hover:text-gray-700">
          {/* Attachment icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l6.586-6.586a4 4 0 00-5.656-5.656l-6.586 6.586a6 6 0 008.485 8.485l6.586-6.586" />
          </svg>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          {/* Mic icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          {/* Send icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;