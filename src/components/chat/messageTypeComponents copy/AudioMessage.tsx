import React from 'react';

const AudioMessage = ({ message }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="ml-2 w-32 bg-gray-200 h-2 rounded-full">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
        </div>
        <span className="ml-2 text-sm text-gray-600">{message.content.duration}</span>
      </div>
      <div className="self-end mt-1">
        <span className="text-xs text-gray-500">{message.time}</span>
      </div>
    </div>
  );
};

export default AudioMessage;