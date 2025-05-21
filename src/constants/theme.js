// /* ============================================================================
//  *  WHATSAPP-STYLE • COLOUR TOKENS & THEMES
//  * ========================================================================== */

// export const COLORS = {
//   primary: '#00a884',
//   secondary: '#111b21',
//   accent: '#53bdeb',
//   danger: '#ef4444',
//   success: '#25d366',
//   light: '#ffffff',
//   lightGray: '#f0f2f5',
//   darkGray: '#8696a0',
//   dark: '#202c33',
//   sent: '#DCF8C6',
//   received: '#ffffff',
//   bubbleBg: '#ECE5DD',
//   chatBg: '#E4DDD1',
//   overlay: 'rgba(11,20,26,0.70)',
// };

// export const CALL_STATES = {
//   CONNECTING: 'connecting',
//   RINGING: 'ringing',
//   CONNECTED: 'connected',
//   ENDED: 'ended',
// };

// export const formatTime = (totalSeconds) => {
//   const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
//   const ss = String(totalSeconds % 60).padStart(2, '0');
//   return `${mm}:${ss}`;
// };

// export const BUTTON_STYLES = {
//   actionButton: 'flex items-center justify-center w-14 h-14 rounded-full shadow-md',
//   primaryAction: `bg-[${COLORS.primary}] text-white`,
//   dangerAction: `bg-[${COLORS.danger}] text-white`,
//   controlButton: 'flex items-center justify-center w-12 h-12 rounded-full mx-2 bg-opacity-80',
// };

// export const ChatTheme = {
//   bubbleMe: COLORS.sent,
//   taggedBorder: '#3B82F6',
//   hoverNeutral: '#E5E7EB',
//   hoverDanger: '#FEE2E2',
//   textPrimary: '#374151',
//   timeStamp: '#6B7280',
//   chatBg: COLORS.bubbleBg,
//   footerBg: '#F0F2F5',
//   audioIconBg: '#DBEAFE',
//   audioIconFg: '#2563EB',
//   playBtnBg: '#2563EB',
//   playBtnHover: '#1D4ED8',
//   waveformBar: '#60A5FA',
//   videoPlayBtnFg: '#2563EB',
//   waveformBarActive: '#3B82F6',
//   progressBg: '#E5E7EB',
//   progressFill: '#60A5FA',
//   bubbleOthers: '#ffffff',
//   fileTypes: {
//     pdf: { bg: '#FEE2E2', text: '#B91C1C' },
//     doc: { bg: '#DBEAFE', text: '#1D4ED8' },
//     xls: { bg: '#D1FAE5', text: '#065F46' },
//     zip: { bg: '#FEF9C3', text: '#B45309' },
//     ppt: { bg: '#FFEDD5', text: '#C2410C' },
//     txt: { bg: '#E5E7EB', text: '#4B5563' },
//     img: { bg: '#F3E8FF', text: '#7C3AED' },
//     default: { bg: '#E5E7EB', text: '#4B5563' },
//   },
// };

// export const CallPopupTheme = {
//   overlay: 'rgba(0,0,0,0.50)',
//   cardBg: COLORS.light,
//   headingColor: '#111827',
//   descriptionColor: '#4B5563',
//   cancelBg: '#D1D5DB',
//   cancelText: '#374151',
//   startBg: '#10B981',
//   startText: COLORS.light,
// };

// export const ConsultationTheme = {
//   pageBg: COLORS.bubbleBg,
//   headerBg: '#075E54',
//   headerText: COLORS.light,
//   headerHover: '#064E45',
//   avatarBg: '#B0BEC5',
//   dividerBg: '#D1D5DB',
//   dividerHoverBg: '#9CA3AF',
// };

// export const CallRequestStyles = {
//   container: {
//     backgroundColor: ChatTheme.chatBg, // Using chatBg since panelBg isn't defined
//     borderColor: ConsultationTheme.dividerBg,
//     borderTopColor: ChatTheme.videoPlayBtnFg, // Will be dynamic in component
//   },
//   icon: {
//     color: ChatTheme.videoPlayBtnFg, // Will be dynamic in component
//   },
//   title: {
//     color: ChatTheme.textPrimary,
//   },
//   info: {
//     color: ChatTheme.textSecondary,
//   },
//   acceptButton: {
//     backgroundColor: ChatTheme.success,
//     color: ChatTheme.light,
//     hoverBackground: '#2BAF4A',
//   },
//   rejectButton: {
//     backgroundColor: ChatTheme.danger,
//     color: ChatTheme.light,
//     hoverBackground: '#E02E24',
//   },
//   timestamp: {
//     color: ChatTheme.timeStamp,
//   },
//   menuButton: {
//     color: ChatTheme.textSecondary,
//     hoverColor: '#333333',
//   },
//   menu: {
//     backgroundColor: '#FFFFFF',
//     borderColor: ConsultationTheme.dividerBg,
//   },
//   menuItem: {
//     reply: {
//       color: ChatTheme.textPrimary,
//       hoverBackground: ChatTheme.hoverNeutral,
//     },
//     delete: {
//       color: ChatTheme.danger,
//       hoverBackground: ChatTheme.hoverDanger,
//     },
//   },
// };


// export const callRequestMessageTheme = {
//   primary: '#25D366',    // WhatsApp green
//   primaryDark: '#128C7E',
//   secondary: '#ef4444',  // Reject red
//   secondaryDark: '#be123c',
//   background: '#FFFFFF',
//   textPrimary: '#111B21', // Dark text
//   textSecondary: '#667781',
//   border: '#DBE2EA',
//   borderRadius: '0.75rem', // 12px
//   fontFamily: `'Arial', sans-serif`,
// };


  /* ============================================================================
 *  LINKEDIN/MEDICAL-STYLE  •  COLOUR TOKENS & THEMES
 *  – For a clinical, professional feel suitable for medical communication apps
 * ========================================================================== */

  export const COLORS = {
    /* brand */
    primary: '#0077B5',          // LinkedIn blue
    secondary: '#004471',
  
    /* semantic */
    accent: '#00B8D9',           // Medical teal accent
    danger: '#D32F2F',
    success: '#2E7D32',
  
    /* greys */
    light: '#ffffff',
    lightGray: '#F3F4F6',
    darkGray: '#6B7280',
    dark: '#1F2937',
  
    /* chat surfaces */
    sent: '#E0F7FA',            // Light cyan (sent)
    received: '#D0E2FF',        // Slightly darker than #FFFFFF for received messages
    bubbleBg: '#F3F4F6',        // Light grayish background for the container
    chatBg: '#F9FAFB',          // Almost-white background
  
    /* misc */
    overlay: 'rgba(0,0,0,0.6)',
  };
  
  /* --------  2 •  ENUMS / UTILITIES  -------------------------------------- */
  export const CALL_STATES = {
    CONNECTING: 'connecting',
    RINGING:    'ringing',
    CONNECTED:  'connected',
    ENDED:      'ended',
  };
  
  export const formatTime = (totalSeconds) => {
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const ss = String(totalSeconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };
  
  /* --------  3 •  REUSABLE CLASS STRINGS ---------------------------------- */
  export const BUTTON_STYLES = {
    actionButton:  'flex items-center justify-center w-14 h-14 rounded-full shadow-md',
    primaryAction: `bg-[${COLORS.primary}] text-white`,
    dangerAction:  `bg-[${COLORS.danger}] text-white`,
    controlButton: 'flex items-center justify-center w-12 h-12 rounded-full mx-2 bg-opacity-90',
  };
  
  /* --------  4 •  CHAT-MODULE THEME  -------------------------------------- */
  export const ChatTheme = {
    bubbleMe: COLORS.sent,
    bubbleOthers: COLORS.received,
  
    taggedBorder: '#0284C7',
    hoverNeutral: '#E0E7FF',
    hoverDanger: '#FFE4E6',
  
    textPrimary: '#1E293B',
    timeStamp: '#64748B',
    chatBg: '#E0F2FE', // Use bubbleBg for container background
  
    audioIconBg: '#E0F2FE',
    audioIconFg: '#0369A1',
    playBtnBg: '#0369A1',
    playBtnHover: '#075985',
    waveformBar: '#60A5FA',
    videoPlayBtnFg: '#0369A1',
  
    fileTypes: {
      pdf: { bg: '#FDEDED', text: '#C62828' },
      doc: { bg: '#E3F2FD', text: '#1565C0' },
      xls: { bg: '#E8F5E9', text: '#2E7D32' },
      zip: { bg: '#FFF8E1', text: '#EF6C00' },
      ppt: { bg: '#FFF3E0', text: '#D84315' },
      txt: { bg: '#ECEFF1', text: '#37474F' },
      img: { bg: '#EDE7F6', text: '#6A1B9A' },
      default: { bg: '#F3F4F6', text: '#4B5563' },
    },
  };
  
  /* --------  5 •  CALL POP-UP THEME  -------------------------------------- */
  export const CallPopupTheme = {
    overlay:           'rgba(0,0,0,0.60)',
    cardBg:            COLORS.light,
  
    headingColor:      '#0F172A',
    descriptionColor:  '#4B5563',
  
    cancelBg:          '#E5E7EB',
    cancelText:        '#1F2937',
  
    startBg:           COLORS.primary,
    startText:         COLORS.light,
  };
  
  /* --------  6 •  CONSULTATION LAYOUT THEME  ------------------------------ */
  export const ConsultationTheme = {
    pageBg:           COLORS.chatBg,
  
    headerBg:         COLORS.primary,
    headerText:       COLORS.light,
    headerHover:      '#005983',
  
    avatarBg:         '#B3E5FC',
  
    dividerBg:        '#CBD5E1',
    dividerHoverBg:   '#94A3B8',
  };
  
export const callRequestMessageTheme = {
  primary: '#0077B5',       // LinkedIn blue - primary action color
  primaryDark: '#005F8D',   // Darker LinkedIn blue for hover states
  secondary: '#D92E62',     // LinkedIn red or accent - used for reject buttons
  secondaryDark: '#B0244F', // Darker red for hover
  background: '#F8F9FC',    // Light grayish-blue background (LinkedIn-style)
  textPrimary: '#0A0A0A',   // Strong dark text
  textSecondary: '#5F7D8C', // Subtle gray-blue text (like timestamps, labels)
  border: '#DBE4EA',        // Soft border matching LinkedIn UI
  borderRadius: '0.5rem',   // Slightly rounded corners (8px)
  fontFamily: `'Helvetica Neue', Arial, sans-serif`, // Clean modern font
};


export const CallRequestStyles = {
  container: {
    backgroundColor: ChatTheme.chatBg, // Light grayish background (#F3F4F6)
    borderColor: ConsultationTheme.dividerBg,
    borderTopColor: ChatTheme.videoPlayBtnFg, // Will be dynamic in component
  },
  icon: {
    color: ChatTheme.videoPlayBtnFg, // Will be dynamic in component
  },
  title: {
    color: ChatTheme.textPrimary,
  },
  info: {
    color: ChatTheme.textSecondary,
  },
  acceptButton: {
    backgroundColor: ChatTheme.success,
    color: ChatTheme.light,
    hoverBackground: '#2BAF4A',
  },
  rejectButton: {
    backgroundColor: ChatTheme.danger,
    color: ChatTheme.light,
    hoverBackground: '#E02E24',
  },
  timestamp: {
    color: ChatTheme.timeStamp,
  },
  menuButton: {
    color: ChatTheme.textSecondary,
    hoverColor: '#333333',
  },
  menu: {
    backgroundColor: '#FFFFFF',
    borderColor: ConsultationTheme.dividerBg,
  },
  menuItem: {
    reply: {
      color: ChatTheme.textPrimary,
      hoverBackground: ChatTheme.hoverNeutral,
    },
    delete: {
      color: ChatTheme.danger,
      hoverBackground: ChatTheme.hoverDanger,
    },
  },
};