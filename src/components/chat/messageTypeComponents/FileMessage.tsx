import React from 'react';

const FileMessage = ({ message }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        <span className="ml-2 text-sm text-gray-600">{message.content.name}</span>
      </div>
      <div className="self-end mt-1">
        <span className="text-xs text-gray-500">{message.time}</span>
      </div>
    </div>
  );
};

export default FileMessage;