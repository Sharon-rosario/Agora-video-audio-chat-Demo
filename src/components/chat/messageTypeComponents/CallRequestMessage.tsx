import React from 'react';
import { Message } from '../../../types/chat';
import { callRequestMessageTheme } from '../../../constants/theme'; // Adjust path accordingly

interface CallRequestMessageProps {
  message: Message;
  onAccept?: (message: Message) => void;
  onReject?: (message: Message) => void;
}

//@ts-ignore
const CallRequestMessage: React.FC<CallRequestMessageProps> = ({ message, onAccept, onReject }) => {
  const { callType, status, callId } = message.content as {
    callType: 'audio' | 'video';
    callId: string;
    status: string;
  };
  const isYou = message.sender === 'You';

  return (
    <div
      className="flex flex-col w-full max-w-md mx-auto py-2 px-12 bg-white rounded-lg shadow-sm"
      style={{ fontFamily: callRequestMessageTheme.fontFamily }}
    >
      {/* Header: Icon, Title, and Call ID */}
      <div className="flex items-center mb-3">
        {callType === 'audio' ? (
          <svg
            className="w-8 h-8 mr-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
            style={{ color: callRequestMessageTheme.primary }}
          >
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        ) : (
          <svg
            className="w-8 h-8 mr-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
            style={{ color: callRequestMessageTheme.primary }}
          >
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
        <div className="flex flex-col truncate">
          <span className="text-lg font-semibold" style={{ color: callRequestMessageTheme.textPrimary }}>
            {callType === 'audio' ? 'Audio Call Request' : 'Video Call Request'}
          </span>
          <span className="text-xs truncate" style={{ color: callRequestMessageTheme.textSecondary }}>
            ID: {callId}
          </span>
        </div>
      </div>

      {/* Divider */}
      <hr
        className="my-2"
        style={{ borderColor: callRequestMessageTheme.border }}
      />

      {/* Sender and Status */}
      <div className="text-sm mb-4" style={{ color: callRequestMessageTheme.textSecondary }}>
        From: <span className="font-medium" style={{ color: callRequestMessageTheme.textPrimary }}>{message.sender}</span> |
        &nbsp;Status: <span className="font-medium" style={{ color: callRequestMessageTheme.textPrimary }}>{status}</span>
      </div>

      {/* Buttons: Show for doctor when status is Pending and sender is not You */}
      {status === 'Pending' && !isYou && (
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => onAccept?.(message)}
            className="flex-1 py-2 px-4 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#128C7E] transition-colors duration-200 rounded-lg shadow-md focus:outline-none"
          >
            Accept
          </button>
          <button
            onClick={() => onReject?.(message)}
            className="flex-1 py-2 px-4 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-lg shadow-md focus:outline-none"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default CallRequestMessage;