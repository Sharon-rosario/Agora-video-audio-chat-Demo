import React, { useState, useRef, useEffect } from 'react';

const VideoMessage = ({ message }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play();
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col w-64">
      <div className="relative mb-2 overflow-hidden rounded-lg shadow-sm">
        {!isPlaying ? (
          <div
            className="bg-gray-200 h-40 w-full rounded-lg flex items-center justify-center overflow-hidden relative cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            {/* Thumbnail */}
            <img
              src="https://picsum.photos/240/160"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Duration */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-0.5 rounded text-white text-xs font-medium">
              {message.content.duration}
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-40 object-cover rounded-lg"
            controls
            src={message.content.url}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>

      {/* Label */}
      <div className="flex items-center mb-1">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span className="ml-2 text-sm text-gray-700 font-medium truncate">
          {message.content.title || "Video Message"}
        </span>
      </div>

      <div className="self-end mt-1">
        <span className="text-xs text-gray-500">{message.time}</span>
      </div>
    </div>
  );
};

export default VideoMessage;
