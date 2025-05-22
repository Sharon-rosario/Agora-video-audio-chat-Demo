// In src/components/ChatPanel.jsx
import React, { useState, useEffect, useRef } from 'react';
import MessageWrapper from './chat/MessageWrapper';
import { ChatTheme } from '../constants/theme';
import { dummyMessages } from '../data/conversation';

const ChatPanel = ({ socket, onCallRequestAccepted }) => {
  const [messages, setMessages] = useState(dummyMessages);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted');
          } else {
            console.log('Notification permission denied');
          }
        });
      }
    } else {
      console.log('This browser does not support notifications');
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('live_message', (data) => {
        const { senderId, message, timestamp } = data;
        const newMessage = {
          id: Date.now().toString(),
          sender: senderId,
          type: 'text',
          content: message,
          time: new Date(timestamp).toLocaleTimeString(),
          tagged: false,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if (document.visibilityState !== 'visible' && Notification.permission === 'granted') {
          const notification = new Notification(`New Message from ${senderId}`, {
            body: message,
            icon: '/logo.svg',
            timestamp: new Date(timestamp).getTime(),
          });
          notification.onclick = () => {
            window.focus();
            notification.close();
          };
        }
      });

      socket.on('call_status_update', (data) => {
        const { callId, status, startTime, endTime, callType } = data;
        const messageType = callType === 'audio' ? 'audioCall' : 'videoCall';
        const newMessage = {
          id: Date.now().toString(),
          sender: 'System',
          type: messageType,
          content: { status, startTime, endTime },
          time: new Date().toLocaleTimeString(),
          tagged: false,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if (document.visibilityState !== 'visible' && Notification.permission === 'granted') {
          const notification = new Notification(`Call Update (${callType})`, {
            body: `Call ${callId} status: ${status}`,
            icon: '/logo.svg',
            timestamp: startTime ? new Date(startTime).getTime() : Date.now(),
          });
          notification.onclick = () => {
            window.focus();
            notification.close();
          };
        }
      });

      socket.on('call_request', (data) => {
        const { callerId, callType, callId, timestamp } = data;
        const newMessage = {
          id: Date.now().toString(),
          sender: callerId,
          type: 'callRequest',
          content: { callType, callId, status: 'Pending' },
          time: new Date(timestamp).toLocaleTimeString(),
          tagged: false,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if (document.visibilityState !== 'visible' && Notification.permission === 'granted') {
          const notification = new Notification(`Incoming ${callType} Call Request`, {
            body: `From ${callerId} (Call ID: ${callId})`,
            icon: '/logo.svg',
            timestamp: new Date(timestamp).getTime(),
          });
          notification.onclick = () => {
            window.focus();
            notification.close();
          };
        }
      });

      return () => {
        socket.off('live_message');
        socket.off('call_status_update');
        socket.off('call_request');
      };
    }
  }, [socket]);

  const handleReply = (message) => {
    console.log('Replying to:', message);
    // Implement reply logic here
  };

  const handleDelete = (message) => {
    console.log('Deleting:', message);
    // Implement delete logic here
  };

  const handleAcceptCallRequest = (message) => {
    const { callId, callType } = message.content;
    socket.emit('call_request_response', {
      callId,
      response: 'accepted',
      userId: 'doctor456', // Replace with actual user ID
    });

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === message.id ? { ...msg, content: { ...msg.content, status: 'Accepted' } } : msg
      )
    );

    onCallRequestAccepted({ callId, callType, callerId: message.sender });
  };

  const handleRejectCallRequest = (message) => {
    const { callId } = message.content;
    socket.emit('call_request_response', {
      callId,
      response: 'rejected',
      userId: 'doctor456', // Replace with actual user ID
    });

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === message.id ? { ...msg, content: { ...msg.content, status: 'Rejected' } } : msg
      )
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500"
        style={{ backgroundColor: ChatTheme.panelBg }}
      >
        {messages.map((msg, i) => (
          <MessageWrapper
            key={i}
            message={msg}
            onReply={handleReply}
            onDelete={handleDelete}
            allMessages={messages}
            onAccept={msg.type === 'callRequest' ? handleAcceptCallRequest : undefined}
            onReject={msg.type === 'callRequest' ? handleRejectCallRequest : undefined}
          />
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-3 flex items-center shadow-md" style={{ backgroundColor: ChatTheme.footerBg }}>
        <input
          type="text"
          placeholder="Type a message…"
          className="flex-1 bg-white rounded-full px-4 py-2 text-sm focus:outline-none shadow-sm"
        />
        <button className="p-2 mx-2 text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l6.586-6.586a4 4 0 00-5.656-5.656l-6.586 6.586a6 6 0 008.485 8.485l6.586-6.586"
            />
          </svg>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;