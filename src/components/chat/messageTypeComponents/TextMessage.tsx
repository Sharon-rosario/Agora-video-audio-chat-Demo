import React from 'react';

const TextMessage = ({ message }) => {
  return (
    <div className="flex flex-col">
      <p className="text-sm text-gray-800">{message.content}</p>
      <div className="self-end mt-1">
        <span className="text-xs text-gray-500">{message.time}</span>
      </div>
    </div>
  );
};

export default TextMessage;