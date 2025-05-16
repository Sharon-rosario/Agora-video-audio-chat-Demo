// src/call/CallPopup.jsx
import React from 'react';
import { CallPopupTheme } from '../constants/theme';

const cp = CallPopupTheme;

const CallPopup = ({ callType = 'audio', onStartCall, onCancel }) => (
  <div
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{ backgroundColor: cp.overlay }}
  >
    <div
      className="p-6 rounded-lg shadow-lg w-80"
      style={{ backgroundColor: cp.cardBg }}
    >
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: cp.headingColor }}
      >
        {callType === 'audio' ? 'Start Audio Call' : 'Start Video Call'}
      </h3>

      <p className="mb-4" style={{ color: cp.descriptionColor }}>
        Are you sure you want to start a&nbsp;{callType}&nbsp;call?
      </p>

      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-full"
          style={{ backgroundColor: cp.cancelBg, color: cp.cancelText }}
        >
          Cancel
        </button>

        <button
          onClick={onStartCall}
          className="px-4 py-2 rounded-full"
          style={{ backgroundColor: cp.startBg, color: cp.startText }}
        >
          Start Call
        </button>
      </div>
    </div>
  </div>
);

export default CallPopup;
