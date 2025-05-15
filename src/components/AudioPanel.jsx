import React from 'react';

const AudioPanel = ({ onEndCall }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold mb-4">Audio Call</h3>
      <p className="text-gray-600">Audio call in progress...</p>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full"
        onClick={onEndCall}
      >
        End Call
      </button>
    </div>
  );
};

export default AudioPanel;