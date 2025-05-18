import React from 'react';
import { ChatTheme } from '../../../constants/theme';

const VideoCallMessage = ({ message }) => {
  const { status, startTime, endTime } = message.content;

  return (
    <div className="flex flex-col w-64">
      <div className="flex items-center mb-1">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: ChatTheme.videoCallIconFg || ChatTheme.textPrimary }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span
          className="ml-2 text-sm font-medium"
          style={{ color: ChatTheme.textPrimary }}
        >
          Video Call
        </span>
      </div>
      <div className="text-sm">
        <span
          className={`font-medium ${
            status === 'Rejected' ? 'text-red-500' : status === 'Ended' ? 'text-gray-500' : 'text-gray-700'
          }`}
        >
          {status === 'Accepted' ? 'Call Accepted' : status === 'Ended' ? 'Call Ended' : status}
        </span>
        {status === 'Accepted' && startTime && (
          <div className="mt-1 text-xs text-gray-600">
            <span>Start: {startTime}</span>
          </div>
        )}
        {status === 'Ended' && endTime && (
          <div className="mt-1 text-xs text-gray-600">
            <span>End: {endTime}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCallMessage;