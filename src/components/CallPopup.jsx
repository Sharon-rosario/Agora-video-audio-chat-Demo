import React from 'react';

const CallPopup = ({ callType, onStartCall, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">
          {callType === 'audio' ? 'Start Audio Call' : 'Start Video Call'}
        </h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to start a {callType} call?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full"
            onClick={onStartCall}
          >
            Start Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallPopup;