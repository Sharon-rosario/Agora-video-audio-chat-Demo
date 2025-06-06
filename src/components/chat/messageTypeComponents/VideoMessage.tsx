import React, { useState, useRef, useEffect } from 'react';
import { ChatTheme } from '../../../constants/theme';

const VideoMessage = ({ message }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (playing && videoRef.current) videoRef.current.play();
  }, [playing]);

  return (
    <div className="flex flex-col w-64">
      <div className="relative mb-2 overflow-hidden rounded-lg shadow-sm">
        {!playing ? (
          <div
            className="h-40 w-full flex items-center justify-center cursor-pointer relative"
            onClick={() => setPlaying(true)}
          >
            {/* Thumbnail */}
            <img
              src="https://picsum.photos/240/160"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: '#FFFFFF', opacity: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: ChatTheme.videoPlayBtnFg }}
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Duration */}
            <div
              className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-medium"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#FFFFFF' }}
            >
              {message.content.duration}
            </div>

            {/* Download button */}
            <a
              href={message.content.url}
              download={message.content.title || 'video.mp4'}
              className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-opacity"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: ChatTheme.docDownloadBtnFg }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </div>
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full h-40 object-cover rounded-lg"
              controls
              src={message.content.url}
              onEnded={() => setPlaying(false)}
            />
            {/* Download button (visible during playback) */}
            <a
              href={message.content.url}
              download={message.content.title || 'video.mp4'}
              className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-opacity"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: ChatTheme.docDownloadBtnFg }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="flex items-center mb-1">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: ChatTheme.videoPlayBtnFg }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span
          className="ml-2 text-sm font-medium truncate"
          style={{ color: ChatTheme.textPrimary }}
        >
          {message.content.title || 'Video Message'}
        </span>
      </div>
    </div>
  );
};

export default VideoMessage;