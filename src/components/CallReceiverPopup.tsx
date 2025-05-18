import React from 'react';



const WhatsAppCallTheme = {
  popupBg: '#f0f2f5', // Light gray background, similar to WhatsApp chat background
  popupText: '#111b21', // Dark text for contrast
  popupShadow: 'rgba(0, 0, 0, 0.2)', // Subtle shadow
  acceptButtonBg: '#00a884', // WhatsApp green for accept
  acceptButtonHoverBg: '#008c6e', // Darker green on hover
  rejectButtonBg: '#ff3b30', // Red for reject
  rejectButtonHoverBg: '#e32d23', // Darker red on hover
  buttonText: '#ffffff', // White text for buttons
  buttonShadow: 'rgba(0, 0, 0, 0.3)', // Shadow for buttons
  borderColor: '#d1d7db', // Light border color
};


const CallReceiverPopup = ({ callData, onAccept, onReject }) => {
  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] 
                 backdrop-blur-sm rounded-lg p-6 w-80 
                 animate-fadeIn flex flex-col items-center"
      style={{
        backgroundColor: WhatsAppCallTheme.popupBg,
        boxShadow: `0 8px 16px ${WhatsAppCallTheme.popupShadow}`,
        border: `1px solid ${WhatsAppCallTheme.borderColor}`,
      }}
    >
      {/* Caller Information */}
      <h3
        className="text-lg font-semibold mb-4 text-center"
        style={{ color: WhatsAppCallTheme.popupText }}
      >
        Incoming {callData.callType} Call from {callData.callerId}
      </h3>

      {/* Buttons */}
      <div className="flex justify-around w-full">
        {/* Accept Button */}
        <button
          onClick={onAccept}
          className="w-16 h-16 rounded-full flex items-center justify-center 
                     transition-colors duration-200 transform hover:scale-105"
          style={{
            backgroundColor: WhatsAppCallTheme.acceptButtonBg,
            boxShadow: `0 4px 8px ${WhatsAppCallTheme.buttonShadow}`,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              WhatsAppCallTheme.acceptButtonHoverBg)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              WhatsAppCallTheme.acceptButtonBg)
          }
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke={WhatsAppCallTheme.buttonText}
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>

        {/* Reject Button */}
        <button
          onClick={onReject}
          className="w-16 h-16 rounded-full flex items-center justify-center 
                     transition-colors duration-200 transform hover:scale-105"
          style={{
            backgroundColor: WhatsAppCallTheme.rejectButtonBg,
            boxShadow: `0 4px 8px ${WhatsAppCallTheme.buttonShadow}`,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              WhatsAppCallTheme.rejectButtonHoverBg)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              WhatsAppCallTheme.rejectButtonBg)
          }
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke={WhatsAppCallTheme.buttonText}
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CallReceiverPopup;