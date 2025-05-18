import React from 'react';
import { ChatTheme } from '../../../constants/theme';

const AudioCallMessage = ({ message }) => {
  const { status, startTime, endTime } = message.content;

  return (
    <div className="flex flex-col w-64">
      <div className="flex items-center mb-1">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: ChatTheme.audioCallIconFg || ChatTheme.textPrimary }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span
          className="ml-2 text-sm font-medium"
          style={{ color: ChatTheme.textPrimary }}
        >
          Audio Call
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

export default AudioCallMessage;