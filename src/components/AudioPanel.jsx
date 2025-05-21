import React, { useState, useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Phone, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { COLORS, CALL_STATES, formatTime } from '../constants/theme';

// Hardcoded Agora credentials
const AGORA_APP_ID = 'a77f0a34caba451f8194ea8d59745dc8';
const AGORA_CHANNEL_NAME = 'Agora-test';
const AGORA_TEMP_TOKEN = '007eJxTYGDQ/52xtvwt/79PzMv5kpNM5or/7F9ZbPhR89adzaX/nSMUGBLNzdMMEo1NkhOTEk1MDdMsDC1NUhMtUkwtzU1MU5ItXtTqZDQEMjLstxdjYmSAQBCfi8ExPb8oUbcktbiEgQEAVFYiQA==';

const AudioPanel = ({ onEndCall, contactName = "John Doe" }) => {
  const [callState, setCallState] = useState(CALL_STATES.RINGING);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [client, setClient] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const audioTrackRef = useRef(null);
  const [error, setError] = useState(null);
  const isJoinedRef = useRef(false);
  const [endButtonPressed, setEndButtonPressed] = useState(false);

  // Initialize AgoraRTC client and join the channel
  useEffect(() => {
    let isMounted = true;

    if (!AGORA_APP_ID || !AGORA_TEMP_TOKEN || !AGORA_CHANNEL_NAME) {
      console.error('Missing Agora configuration:', {
        AGORA_APP_ID,
        AGORA_TEMP_TOKEN,
        AGORA_CHANNEL_NAME,
      });
      setError('Missing Agora configuration. Please check credentials.');
      setCallState(CALL_STATES.ENDED);
      return;
    }

    const rtcClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    setClient(rtcClient);

    const init = async () => {
      try {
        setCallState(CALL_STATES.CONNECTING);
        setRemoteUsers([]); // Reset remote users on join
        console.log('Joining with:', {
          appId: AGORA_APP_ID,
          channel: AGORA_CHANNEL_NAME,
          token: AGORA_TEMP_TOKEN,
        });
        const uid = await rtcClient.join(
          AGORA_APP_ID,
          AGORA_CHANNEL_NAME,
          AGORA_TEMP_TOKEN || null
        );
        if (!isMounted) return;
        isJoinedRef.current = true;
        console.log('Joined channel:', AGORA_CHANNEL_NAME, 'with UID:', uid);

        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await rtcClient.publish([audioTrack]);
        if (!isMounted) return;
        setLocalAudioTrack(audioTrack);
        audioTrackRef.current = audioTrack;

        console.log('Published local audio track');
      } catch (err) {
        console.error('Error joining channel:', err);
        if (isMounted) {
          setError(`Failed to join call: ${err.message || 'Unknown error'}`);
          setCallState(CALL_STATES.ENDED);
        }
      }
    };

    init();

    // Event listeners for remote users
    rtcClient.on('user-published', async (user, mediaType) => {
      if (!isMounted || !isJoinedRef.current) return;
      console.log('User published:', user.uid, 'Media:', mediaType);

      try {
        await rtcClient.subscribe(user, mediaType);
        console.log('Subscribed to remote user:', user.uid);

        if (mediaType === 'audio') {
          user.audioTrack.play();
          setRemoteUsers(prevUsers => {
            if (prevUsers.some(u => u.uid === user.uid)) {
              console.log('Duplicate user ignored:', user.uid);
              return prevUsers;
            }
            const newUsers = [...prevUsers, user];
            console.log('Remote users count:', newUsers.length, 'UIDs:', newUsers.map(u => u.uid));

            // Validate: Only one remote user allowed (total 2 users: local + 1 remote)
            if (newUsers.length > 1) {
              console.warn('More than one remote user detected:', newUsers.map(u => u.uid));
              setError('Call supports only one-to-one communication.');
              setCallState(CALL_STATES.ENDED);
              handleEndCall();
              return prevUsers;
            }

            // Transition to CONNECTED when the first remote user joins
            if (newUsers.length === 1 && callState !== CALL_STATES.ENDED) {
              setCallState(CALL_STATES.CONNECTED);
            }

            return newUsers;
          });
        }
      } catch (err) {
        console.error('Error subscribing to user:', user.uid, err);
        setError(`Failed to subscribe to remote user: ${err.message}`);
      }
    });

    rtcClient.on('user-unpublished', (user) => {
      console.log('User unpublished:', user.uid);
      if (!isMounted) return;
      setRemoteUsers(prevUsers => {
        const newUsers = prevUsers.filter(u => u.uid !== user.uid);
        console.log('Remote users count after unpublish:', newUsers.length);
        // End call if no remote users remain
        if (newUsers.length === 0 && callState !== CALL_STATES.ENDED) {
          setError('Other user has left the call.');
          setCallState(CALL_STATES.ENDED);
          handleEndCall();
        }
        return newUsers;
      });
    });

    rtcClient.on('user-left', (user) => {
      console.log('User left:', user.uid);
      if (!isMounted) return;
      setRemoteUsers(prevUsers => {
        const newUsers = prevUsers.filter(u => u.uid !== user.uid);
        console.log('Remote users count after leave:', newUsers.length);
        // End call if no remote users remain
        if (newUsers.length === 0 && callState !== CALL_STATES.ENDED) {
          setError('Other user has left the call.');
          setCallState(CALL_STATES.ENDED);
          handleEndCall();
        }
        return newUsers;
      });
    });

    // Clean up on unmount
    return () => {
      isMounted = false;
      isJoinedRef.current = false;
      if (audioTrackRef.current) {
        audioTrackRef.current.close();
      }
      if (rtcClient) {
        rtcClient.removeAllListeners();
        if (callState !== CALL_STATES.ENDED) {
          rtcClient.leave().catch(console.error);
        }
      }
    };
  }, []);

  // Call timer
  useEffect(() => {
    let timer;
    if (callState === CALL_STATES.CONNECTED) {
      timer = setInterval(() => {
        setCallDuration(prevDuration => prevDuration + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  // Toggle mute
  const toggleMute = async () => {
    if (!client) return;

    try {
      if (isMuted) {
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await client.publish([audioTrack]);
        setLocalAudioTrack(audioTrack);
        audioTrackRef.current = audioTrack;
        setIsMuted(false);
      } else {
        if (localAudioTrack) {
          await client.unpublish([localAudioTrack]);
          localAudioTrack.close();
          setLocalAudioTrack(null);
          audioTrackRef.current = null;
        }
        setIsMuted(true);
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
      setError(`Failed to toggle mute: ${error.message}`);
    }
  };

  // Toggle speaker (placeholder)
  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    console.log('Speaker toggled:', !isSpeakerOn);
  };

  // End call with animation
  const handleEndCall = async () => {
    if (callState === CALL_STATES.ENDED) return;
    
    // Button press animation
    setEndButtonPressed(true);
    
    setCallState(CALL_STATES.ENDED);
    if (client) {
      if (audioTrackRef.current) {
        audioTrackRef.current.close();
        audioTrackRef.current = null;
      }
      await client.leave().catch(console.error);
    }
    
    // Add delay before calling onEndCall to show animation
    setTimeout(() => {
      setEndButtonPressed(false);
      if (onEndCall) onEndCall();
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: COLORS.secondary }}>
      {/* Contact information */}
      <div className="flex flex-col items-center justify-start pt-16 pb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 overflow-hidden">
          <img 
            src="/person2.jpg" 
            alt={contactName} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/96?text=' + contactName[0];
            }}
          />
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">{contactName}</h2>
        <p className="text-gray-400">
          {callState === CALL_STATES.RINGING && "Ringing..."}
          {callState === CALL_STATES.CONNECTING && "Connecting..."}
          {callState === CALL_STATES.CONNECTED && formatTime(callDuration)}
          {callState === CALL_STATES.ENDED && "Call ended"}
        </p>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </div>

      {/* Spacer to push controls to bottom */}
      <div className="flex-grow"></div>

      {/* Call controls */}
      <div className="flex flex-col items-center pb-16">
        {/* Action buttons */}
        <div className="flex justify-center items-center mb-8">
          <button
            onClick={toggleSpeaker}
            className="flex items-center justify-center w-12 h-12 rounded-full mx-2"
            style={{ 
              backgroundColor: isSpeakerOn ? COLORS.primary : COLORS.dark
            }}
          >
            {isSpeakerOn ? <Volume2 size={24} color="white" /> : <VolumeX size={24} color="white" />}
          </button>
 {/* End call button */}
 <button
          className="flex items-center justify-center w-16 h-16 mx-3 rounded-full transition-transform duration-200"
          style={{ 
            backgroundColor: COLORS.danger,
            transform: endButtonPressed ? 'scale(0.9)' : 'scale(1)'
          }}
          onClick={handleEndCall}
          // disabled={callState === CALL_STATES.CONNECTING}
        >
          <Phone size={28} color="white" style={{ transform: 'rotate(135deg)' }} />
        </button>
          <button
            onClick={toggleMute}
            className="flex items-center justify-center w-12 h-12 rounded-full mx-2"
            style={{ 
              backgroundColor: isMuted ? COLORS.primary : COLORS.dark
            }}
          >
            {isMuted ? <MicOff size={24} color="white" /> : <Mic size={24} color="white" />}
          </button>
        </div>

       
      </div>
    </div>
  );
};

export default AudioPanel;