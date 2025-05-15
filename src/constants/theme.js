// constants.js - WhatsApp inspired theme colors and common styles
export const COLORS = {
    primary: '#00a884', // WhatsApp primary green
    secondary: '#111b21', // Dark background/text
    accent: '#53bdeb', // Light blue accent
    danger: '#ef4444', // Red for end call, etc.
    light: '#ffffff',
    dark: '#202c33',
    lightGray: '#f0f2f5',
    darkGray: '#8696a0',
    success: '#25d366', // WhatsApp success green
    overlay: 'rgba(11, 20, 26, 0.7)', // Background overlay
  };
  
  export const CALL_STATES = {
    CONNECTED: 'connected',
    CONNECTING: 'connecting',
    ENDED: 'ended',
  };
  
  // Common button styles to be used in both components
  export const BUTTON_STYLES = {
    actionButton: "flex items-center justify-center w-14 h-14 rounded-full shadow-md",
    primaryAction: `bg-${COLORS.primary} text-white`,
    dangerAction: `bg-${COLORS.danger} text-white`,
    controlButton: "flex items-center justify-center w-12 h-12 rounded-full mx-2 bg-opacity-80"
  };
  
  // Call timer formats
  export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };