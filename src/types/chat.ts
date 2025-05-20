export interface Message {
    id: string;
    sender: string;
    type: 'text' | 'audio' | 'video' | 'file' | 'doc' | 'image' | 'audioCall' | 'videoCall' | 'callRequest';
    content:
      | string // For text messages
      | { url: string; duration?: string; name?: string } // For audio, video, file, doc, image
      | { callType: 'audio' | 'video'; callId: string; status: string } // For callRequest
      | { status: string; startTime?: string; endTime?: string }; // For audioCall, videoCall
    time: string;
    tagged: boolean;
    replyTo?: string;
  }