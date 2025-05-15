import React from 'react';

const dummyMessages = [
  { sender: 'Sharon', message: 'Hey, how are you?', time: '10:30 AM' },
  { sender: 'You', message: 'I am good, thanks!', time: '10:31 AM' },
  { sender: 'Sharon', message: 'Can we reschedule our appointment?', time: '10:32 AM' },
  { sender: 'You', message: 'Sure, when would you like to reschedule it to?', time: '10:33 AM' },
];

const ChatPanel = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Chat</h3>
      {dummyMessages.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 p-3 rounded-lg ${
            msg.sender === 'You' ? 'bg-[#DCF8C6] ml-auto' : 'bg-white'
          }`}
          style={{ maxWidth: '70%' }}
        >
          <p className="text-sm">{msg.message}</p>
          <span className="text-xs text-gray-500">{msg.time}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatPanel;