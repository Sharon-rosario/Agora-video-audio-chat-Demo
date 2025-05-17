/* ============================================================================
 *  WHATSAPP-STYLE  •  COLOUR TOKENS & THEMES
 *  – One file, one import.  No components should hard-code colours.
 *  – If you only ever need ONE palette in the app, just keep this file.
 *    Otherwise also create theme-linkedin.js (see below) and switch imports.
 * ========================================================================== */

/* --------  1 •  BASE PALETTE  -------------------------------------------- */
export const COLORS = {
    /* brand */
    primary:   '#00a884',          // WhatsApp green
    secondary: '#111b21',
  
    /* semantic */
    accent:    '#53bdeb',
    danger:    '#ef4444',
    success:   '#25d366',
  
    /* greys */
    light:        '#ffffff',
    lightGray:    '#f0f2f5',
    darkGray:     '#8696a0',
    dark:         '#202c33',
  
    /* chat surfaces */
    sent:      '#DCF8C6',
    received:  '#ffffff',
    bubbleBg:  '#ECE5DD',
    chatBg:    '#E4DDD1',
  
    /* misc */
    overlay:   'rgba(11,20,26,0.70)',
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
    /* circular fab (e.g. answer / end call) */
    actionButton:  'flex items-center justify-center w-14 h-14 rounded-full shadow-md',
  
    /* convenience Tailwind utilities for positive & danger buttons */
    primaryAction: `bg-[${COLORS.primary}] text-white`,
    dangerAction:  `bg-[${COLORS.danger}] text-white`,
  
    /* small control icon (mute, speaker…) */
    controlButton: 'flex items-center justify-center w-12 h-12 rounded-full mx-2 bg-opacity-80',
  };
  
  /* --------  4 •  CHAT-MODULE THEME  -------------------------------------- */
  export const ChatTheme = {
    /* bubbles */
    bubbleMe:       COLORS.sent,
    // bubbleOthers:   COLORS.received,
  
    /* accents */
    taggedBorder:   '#3B82F6',
    hoverNeutral:   '#E5E7EB',
    hoverDanger:    '#FEE2E2',
  
    /* text & surfaces */
    textPrimary:    '#374151',
    timeStamp:      '#6B7280',
    chatBg:         COLORS.bubbleBg,
    footerBg:       '#F0F2F5',
  
    /* audio/video */
    audioIconBg:    '#DBEAFE',
    audioIconFg:    '#2563EB',
    playBtnBg:      '#2563EB',
    playBtnHover:   '#1D4ED8',
    waveformBar:    '#60A5FA',
    videoPlayBtnFg: '#2563EB',
  waveformBarActive: '#3B82F6',
  progressBg:        '#E5E7EB', // Background of the progress bar
  progressFill:      '#60A5FA', // Filled portion of the progress bar

  bubbleOthers:      '#ffffff',


    /* file-type pills */
    fileTypes: {
      pdf:     { bg: '#FEE2E2', text: '#B91C1C' },
      doc:     { bg: '#DBEAFE', text: '#1D4ED8' },
      xls:     { bg: '#D1FAE5', text: '#065F46' },
      zip:     { bg: '#FEF9C3', text: '#B45309' },
      ppt:     { bg: '#FFEDD5', text: '#C2410C' },
      txt:     { bg: '#E5E7EB', text: '#4B5563' },
      img:     { bg: '#F3E8FF', text: '#7C3AED' },
      default: { bg: '#E5E7EB', text: '#4B5563' },
    },
  };
  
  /* --------  5 •  CALL POP-UP THEME  -------------------------------------- */
  export const CallPopupTheme = {
    overlay:           'rgba(0,0,0,0.50)',
    cardBg:            COLORS.light,
  
    headingColor:      '#111827',
    descriptionColor:  '#4B5563',
  
    cancelBg:          '#D1D5DB',
    cancelText:        '#374151',
  
    startBg:           '#10B981',
    startText:         COLORS.light,
  };
  
  /* --------  6 •  CONSULTATION LAYOUT THEME  ------------------------------ */
  export const ConsultationTheme = {
    pageBg:           COLORS.bubbleBg,
  
    headerBg:         '#075E54',
    headerText:       COLORS.light,
    headerHover:      '#064E45',
  
    avatarBg:         '#B0BEC5',
  
    dividerBg:        '#D1D5DB',
    dividerHoverBg:   '#9CA3AF',
  };
  


  /* ============================================================================
 *  LINKEDIN/MEDICAL-STYLE  •  COLOUR TOKENS & THEMES
 *  – For a clinical, professional feel suitable for medical communication apps
 * ========================================================================== */


// export const COLORS = {
//     /* brand */
//     primary:   '#0077B5',          // LinkedIn blue
//     secondary: '#004471',
  
//     /* semantic */
//     accent:    '#00B8D9',          // Medical teal accent
//     danger:    '#D32F2F',
//     success:   '#2E7D32',
  
//     /* greys */
//     light:        '#ffffff',
//     lightGray:    '#F3F4F6',
//     darkGray:     '#6B7280',
//     dark:         '#1F2937',
  
//     /* chat surfaces */
//     sent:      '#E0F7FA',          // Light cyan (sent)
//     received:  '#ffffff',          // Clean white (received)
//     bubbleBg:  '#E3F2FD',          // Light LinkedIn blue tone
//     chatBg:    '#F9FAFB',          // Almost-white background
  
//     /* misc */
//     overlay:   'rgba(0,0,0,0.6)',
//   };
  
//   /* --------  2 •  ENUMS / UTILITIES  -------------------------------------- */
//   export const CALL_STATES = {
//     CONNECTING: 'connecting',
//     RINGING:    'ringing',
//     CONNECTED:  'connected',
//     ENDED:      'ended',
//   };
  
//   export const formatTime = (totalSeconds) => {
//     const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
//     const ss = String(totalSeconds % 60).padStart(2, '0');
//     return `${mm}:${ss}`;
//   };
  
//   /* --------  3 •  REUSABLE CLASS STRINGS ---------------------------------- */
//   export const BUTTON_STYLES = {
//     actionButton:  'flex items-center justify-center w-14 h-14 rounded-full shadow-md',
//     primaryAction: `bg-[${COLORS.primary}] text-white`,
//     dangerAction:  `bg-[${COLORS.danger}] text-white`,
//     controlButton: 'flex items-center justify-center w-12 h-12 rounded-full mx-2 bg-opacity-90',
//   };
  
//   /* --------  4 •  CHAT-MODULE THEME  -------------------------------------- */
//   export const ChatTheme = {
//     bubbleMe:       COLORS.sent,
//     bubbleOthers:   COLORS.received,
  
//     taggedBorder:   '#0284C7',
//     hoverNeutral:   '#E0E7FF',
//     hoverDanger:    '#FFE4E6',
  
//     textPrimary:    '#1E293B',
//     timeStamp:      '#64748B',
//     chatBg:         COLORS.bubbleBg,
//     footerBg:       '#F1F5F9',
  
//     audioIconBg:    '#E0F2FE',
//     audioIconFg:    '#0369A1',
//     playBtnBg:      '#0369A1',
//     playBtnHover:   '#075985',
//     waveformBar:    '#60A5FA',
//     videoPlayBtnFg: '#0369A1',
  
//     fileTypes: {
//       pdf:     { bg: '#FDEDED', text: '#C62828' },
//       doc:     { bg: '#E3F2FD', text: '#1565C0' },
//       xls:     { bg: '#E8F5E9', text: '#2E7D32' },
//       zip:     { bg: '#FFF8E1', text: '#EF6C00' },
//       ppt:     { bg: '#FFF3E0', text: '#D84315' },
//       txt:     { bg: '#ECEFF1', text: '#37474F' },
//       img:     { bg: '#EDE7F6', text: '#6A1B9A' },
//       default: { bg: '#F3F4F6', text: '#4B5563' },
//     },
//   };
  
//   /* --------  5 •  CALL POP-UP THEME  -------------------------------------- */
//   export const CallPopupTheme = {
//     overlay:           'rgba(0,0,0,0.60)',
//     cardBg:            COLORS.light,
  
//     headingColor:      '#0F172A',
//     descriptionColor:  '#4B5563',
  
//     cancelBg:          '#E5E7EB',
//     cancelText:        '#1F2937',
  
//     startBg:           COLORS.primary,
//     startText:         COLORS.light,
//   };
  
//   /* --------  6 •  CONSULTATION LAYOUT THEME  ------------------------------ */
//   export const ConsultationTheme = {
//     pageBg:           COLORS.chatBg,
  
//     headerBg:         COLORS.primary,
//     headerText:       COLORS.light,
//     headerHover:      '#005983',
  
//     avatarBg:         '#B3E5FC',
  
//     dividerBg:        '#CBD5E1',
//     dividerHoverBg:   '#94A3B8',
//   };
  