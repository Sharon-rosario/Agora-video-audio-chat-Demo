// This file ensures environment variables are properly loaded

// Agora credentials
export const AGORA_APP_ID = process.env.REACT_APP_AGORA_APP_ID;
export const AGORA_TEMP_TOKEN = process.env.REACT_APP_AGORA_TEMP_TOKEN;
export const AGORA_CHANNEL_NAME = process.env.REACT_APP_AGORA_CHANNEL_NAME || 'default-channel';

// For debugging - you can remove these in production
if (!AGORA_APP_ID) {
  console.warn('Warning: Agora App ID is not set in environment variables');
}

if (!AGORA_TEMP_TOKEN) {
  console.warn('Warning: Agora Token is not set in environment variables');
}

console.log('Channel name:', AGORA_CHANNEL_NAME);