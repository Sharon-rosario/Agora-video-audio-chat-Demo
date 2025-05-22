import React, { useState, useEffect } from 'react';

const AudioMessage = ({ message }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Parse duration string like "02:30" → total seconds
  const parseDurationToSeconds = (durationStr) => {
    const [min, sec] = durationStr.split(':').map(Number);
    return min * 60 + sec;
  };

  const totalDurationInSeconds = parseDurationToSeconds(message.content.duration);

  // Format seconds as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Handle play/pause toggle
  const togglePlay = () => {
    if (!isPlaying) {
      setCurrentTime(0); // reset on new play
    }
    setIsPlaying(!isPlaying);
  };

  // Simulate playback
  useEffect(() => {
    let animationFrameId : any = null;
    let startTime : any = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = Math.floor((timestamp - startTime) / 1000);

      if (elapsed < totalDurationInSeconds && isPlaying) {
        setCurrentTime(elapsed);
        animationFrameId = requestAnimationFrame(animate);
      } else if (elapsed >= totalDurationInSeconds && isPlaying) {
        setCurrentTime(totalDurationInSeconds);
        setIsPlaying(false); // Auto-pause at end
      }
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, totalDurationInSeconds]);

  return (
    <div className="flex flex-col w-64">
      {/* Header */}
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
        <button
          className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2 hover:bg-blue-600 transition-colors"
          onClick={togglePlay}
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d={isPlaying ? "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" : "M8 5v14l11-7z"} />
          </svg>
        </button>

        {/* Waveform visualization */}
        <div className="flex-1 h-8 flex items-center space-x-0.5">
          {Array.from({ length: 24 }).map((_, i) => {
            const baseHeight = Math.sin(i * 0.5) * 16 + 20;
            const animatedHeight = isPlaying
              ? Math.sin(i * 2 + Date.now() / 200) * 4 + baseHeight
              : baseHeight;

            return (
              <div
                key={i}
                className="w-1 bg-blue-400 rounded-full"
                style={{ height: `${animatedHeight}px` }}
              />
            );
          })}
        </div>

        {/* Timer */}
        <span className="ml-2 text-xs font-medium text-gray-600">
          {isPlaying ? formatTime(currentTime) : message.content.duration}
        </span>
      </div>
    </div>
  );
};

export default AudioMessage;
