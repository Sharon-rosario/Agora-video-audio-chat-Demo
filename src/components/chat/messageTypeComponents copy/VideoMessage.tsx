import React from 'react';

const videoThumbnail = 'https://via.placeholder.com/100x60?text=Video';

const VideoMessage = ({ message }) => {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <img src={videoThumbnail} alt="video thumbnail" className="w-32 h-20 rounded" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="self-end mt-1">
        <span className="text-xs text-gray-500">{message.time}</span>
      </div>
    </div>
  );
};

export default VideoMessage;