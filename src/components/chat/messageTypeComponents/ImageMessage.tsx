import React, { useState } from 'react';
import { ChatTheme } from '../../../constants/theme';

const ImageMessage = ({ message }) => {
  const [viewing, setViewing] = useState(false);

  return (
    <div className="flex flex-col w-64">
      <div className="relative mb-2 rounded-lg shadow-sm">
        {!viewing ? (
          <div
            className="h-40 w-full flex items-center justify-center cursor-pointer relative"
            onClick={() => setViewing(true)}
          >
            {/* Placeholder/Thumbnail */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image Preview</span>
            </div>

            {/* View button (similar to play button in VideoMessage) */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: '#FFFFFF', opacity: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: ChatTheme.videoPlayBtnFg }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>

            {/* Download button */}
            <a
              href={message.content.url}
              download={message.content.name || 'image'}
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
            <img
              src={message.content.url}
              alt={message.content.name || 'Image'}
              className="w-full h-auto object-cover rounded-lg"
            />
            {/* Download button (visible after viewing) */}
            <a
              href={message.content.url}
              download={message.content.name || 'image'}
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
          style={{ color: ChatTheme.imageIconFg || ChatTheme.textPrimary }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span
          className="ml-2 text-sm font-medium truncate"
          style={{ color: ChatTheme.textPrimary }}
        >
          {message.content.name || 'Image'}
        </span>
      </div>
    </div>
  );
};

export default ImageMessage;