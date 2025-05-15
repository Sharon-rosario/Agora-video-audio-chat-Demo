import React from 'react';

const AudioMessage = ({ message }) => {
  return (
    <div className="flex flex-col w-64">
      <div className="flex items-center mb-2">
        <div className="bg-blue-100 p-2 rounded-full">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <span className="ml-2 text-sm font-medium text-gray-700">Voice Message</span>
      </div>
      
      {/* Audio Player UI */}
      <div className="bg-gray-100 rounded-lg p-2 flex items-center">
        <button className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2 hover:bg-blue-600 transition-colors">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        
        {/* Waveform visualization */}
        <div className="flex-1 h-8 flex items-center space-x-0.5">
          {Array.from({ length: 24 }).map((_, i) => {
            const height = Math.sin(i * 0.5) * 16 + 5;
            return (
              <div 
                key={i} 
                className="w-1 bg-blue-400 rounded-full"
                style={{ height: `${height}px` }}
              ></div>
            );
          })}
        </div>
        
        <span className="ml-2 text-xs font-medium text-gray-600">{message.content.duration}</span>
      </div>
      
      {/* <div className="self-end mt-1">
        <span className="text-xs text-gray-500">{message.time}</span>
      </div> */}
    </div>
  );
};

export default AudioMessage;