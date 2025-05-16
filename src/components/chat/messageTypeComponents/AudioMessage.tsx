import React from 'react';
import {ChatTheme} from '../../../constants/theme';

const AudioMessage = ({ message }) => {
  return (
    <div className="flex flex-col w-64">
      {/* Header */}
      <div className="flex items-center mb-2">
        <div className="p-2 rounded-full" style={{ backgroundColor: ChatTheme.audioBubbleBg }}>
          <svg className="w-6 h-6" fill="none" stroke={ChatTheme.audioPrimary} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <span className="ml-2 text-sm font-medium" style={{ color: ChatTheme.textPrimary }}>
          Voice Message
        </span>
      </div>

      {/* Player */}
      <div className="rounded-lg p-2 flex items-center" style={{ backgroundColor: ChatTheme.bubbleOthers }}>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center mr-2 transition-colors"
          style={{ backgroundColor: ChatTheme.audioPrimary }}
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        {/* Fake waveform */}
        <div className="flex-1 h-8 flex items-center space-x-0.5">
          {Array.from({ length: 24 }).map((_, i) => {
            const height = Math.sin(i * 0.5) * 16 + 5;
            return (
              <div
                key={i}
                className="w-1 rounded-full"
                style={{ height: `${height}px`, backgroundColor: ChatTheme.audioSecondary }}
              />
            );
          })}
        </div>

        <span className="ml-2 text-xs font-medium" style={{ color: ChatTheme.timeStamp }}>
          {message.content.duration}
        </span>
      </div>
    </div>
  );
};

export default AudioMessage;
