import React, { useState, useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Phone, Video, VideoOff, Mic, MicOff, RotateCcw } from 'lucide-react';
import { COLORS, CALL_STATES, formatTime } from '../constants/theme';
// import { AGORA_APP_ID, AGORA_CHANNEL_NAME, AGORA_TEMP_TOKEN } from '../utils/config';
// Hardcoded Agora credentials
const AGORA_APP_ID = 'a77f0a34caba451f8194ea8d59745dc8';
const AGORA_CHANNEL_NAME = 'Agora-test';
const AGORA_TEMP_TOKEN = '007eJxTYNjw4lNK/LGauxJBN+MrVblM5wsJ1IdvW3RZNWrrtoo5RiIKDInm5mkGicYmyYlJiSamhmkWhpYmqYkWKaaW5iamKckWCmIGGQ2BjAxfuz4wMjJAIIjPxeCYnl+UqFuSWlzCwAAA698g8g==';

const VideoPanel = ({ onEndCall, onSwitchToAudio, contactName = "John Doe" }) => {
  const [callState, setCallState] = useState(CALL_STATES.RINGING);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [client, setClient] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [error, setError] = useState(null);
  const isJoinedRef = useRef(false);
  const localTrackRefs = useRef({
    audio: null,
    video: null
  });
  const [endButtonPressed, setEndButtonPressed] = useState(false);
  // New state for video swap feature
  const [isVideoSwapped, setIsVideoSwapped] = useState(false);
  
  // Local video container reference
  const localVideoRef = useRef(null);
  // Remote video container reference
  const remoteVideoRef = useRef(null);

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

        // Create and publish audio track
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        
        // Create and publish video track
        const videoTrack = await AgoraRTC.createCameraVideoTrack();
        
        // Publish both tracks
        await rtcClient.publish([audioTrack, videoTrack]);
        
        if (!isMounted) return;
        
        setLocalAudioTrack(audioTrack);
        setLocalVideoTrack(videoTrack);
        localTrackRefs.current.audio = audioTrack;
        localTrackRefs.current.video = videoTrack;
        
        // Play local video track
        if (localVideoRef.current) {
          videoTrack.play(localVideoRef.current);
        }

        console.log('Published local audio and video tracks');
        
        // Wait a bit and then set to connected if we have remote users
        setTimeout(() => {
          if (isMounted && remoteUsers.length > 0) {
            setCallState(CALL_STATES.CONNECTED);
          } else if (isMounted) {
            console.log('No remote users yet, waiting in connecting state');
          }
        }, 2000);
        
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
        console.log('Subscribed to remote user:', user.uid, 'Media:', mediaType);

        if (mediaType === 'audio') {
          user.audioTrack.play();
        } else if (mediaType === 'video') {
          // Play remote video in container
          if (remoteVideoRef.current) {
            user.videoTrack.play(remoteVideoRef.current);
          }
        }
        
        setRemoteUsers(prevUsers => {
          // Check if we already have this user
          if (prevUsers.some(u => u.uid === user.uid)) {
            // Update the user's tracks
            return prevUsers.map(u => {
              if (u.uid === user.uid) {
                return {
                  ...u,
                  hasAudio: mediaType === 'audio' ? true : u.hasAudio,
                  hasVideo: mediaType === 'video' ? true : u.hasVideo,
                };
              }
              return u;
            });
          } else {
            // Add the new user
            const newUser = {
              ...user,
              hasAudio: mediaType === 'audio',
              hasVideo: mediaType === 'video',
            };
            const newUsers = [...prevUsers, newUser];
            
            console.log('Remote users count:', newUsers.length, 'UIDs:', newUsers.map(u => u.uid));

            // Validate: Only one remote user allowed (total 2 users: local + 1 remote)
            if (newUsers.length > 1) {
              console.warn('More than one remote user detected:', newUsers.map(u => u.uid));
              setError('Call supports only one-to-one communication.');
              return prevUsers;
            }

            // Transition to CONNECTED when the first remote user joins with video
            if (newUsers.length === 1 && callState !== CALL_STATES.ENDED) {
              setCallState(CALL_STATES.CONNECTED);
            }

            return newUsers;
          }
        });
      } catch (err) {
        console.error('Error subscribing to user:', user.uid, err);
        setError(`Failed to subscribe to remote user: ${err.message}`);
      }
    });

    rtcClient.on('user-unpublished', (user, mediaType) => {
      console.log('User unpublished:', user.uid, 'Media:', mediaType);
      if (!isMounted) return;
      
      // Update the user's media state
      setRemoteUsers(prevUsers => {
        return prevUsers.map(u => {
          if (u.uid === user.uid) {
            return {
              ...u,
              hasAudio: mediaType === 'audio' ? false : u.hasAudio,
              hasVideo: mediaType === 'video' ? false : u.hasVideo,
            };
          }
          return u;
        });
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
      
      // Close local tracks
      if (localTrackRefs.current.audio) {
        localTrackRefs.current.audio.close();
      }
      if (localTrackRefs.current.video) {
        localTrackRefs.current.video.close();
      }
      
      // Leave channel
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

  // Effect to handle playing tracks after video swap
  useEffect(() => {
    // Replay videos when swap state changes
    if (callState === CALL_STATES.CONNECTED && remoteUsers.length > 0) {
      const remoteUser = remoteUsers[0];
      
      // Replay local video if available
      if (localTrackRefs.current.video && !isVideoOff) {
        // Determine where to play local video based on swap state
        const container = isVideoSwapped ? remoteVideoRef.current : localVideoRef.current;
        if (container) {
          localTrackRefs.current.video.stop();
          localTrackRefs.current.video.play(container);
        }
      }
      
      // Replay remote video if available
      if (remoteUser && remoteUser.hasVideo && remoteUser.videoTrack) {
        // Determine where to play remote video based on swap state
        const container = isVideoSwapped ? localVideoRef.current : remoteVideoRef.current;
        if (container) {
          remoteUser.videoTrack.stop();
          remoteUser.videoTrack.play(container);
        }
      }
    }
  }, [isVideoSwapped, callState, remoteUsers, isVideoOff]);

  // Toggle mute
  const toggleMute = async () => {
    if (!client || !localTrackRefs.current.audio) return;

    try {
      if (isMuted) {
        // Unmute by creating a new audio track
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await client.publish([audioTrack]);
        if (localTrackRefs.current.audio) {
          localTrackRefs.current.audio.close();
        }
        setLocalAudioTrack(audioTrack);
        localTrackRefs.current.audio = audioTrack;
        setIsMuted(false);
      } else {
        // Mute by unpublishing and closing the track
        if (localTrackRefs.current.audio) {
          await client.unpublish([localTrackRefs.current.audio]);
          localTrackRefs.current.audio.close();
          setLocalAudioTrack(null);
        }
        setIsMuted(true);
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
      setError(`Failed to toggle mute: ${error.message}`);
    }
  };

  // Toggle video
  const toggleVideo = async () => {
    if (!client) return;
    
    try {
      if (isVideoOff) {
        // Turn video on by creating a new video track
        const videoTrack = await AgoraRTC.createCameraVideoTrack();
        await client.publish([videoTrack]);
        if (localTrackRefs.current.video) {
          localTrackRefs.current.video.close();
        }
        setLocalVideoTrack(videoTrack);
        localTrackRefs.current.video = videoTrack;
        
        // Play local video track in appropriate container based on swap state
        const container = isVideoSwapped ? remoteVideoRef.current : localVideoRef.current;
        if (container) {
          videoTrack.play(container);
        }
        
        setIsVideoOff(false);
      } else {
        // Turn video off by unpublishing and closing the track
        if (localTrackRefs.current.video) {
          await client.unpublish([localTrackRefs.current.video]);
          localTrackRefs.current.video.close();
          setLocalVideoTrack(null);
          localTrackRefs.current.video = null;
        }
        setIsVideoOff(true);
      }
    } catch (error) {
      console.error('Error toggling video:', error);
      setError(`Failed to toggle video: ${error.message}`);
    }
  };

  // New function to swap videos
  const handleVideoSwap = () => {
    setIsVideoSwapped(prev => !prev);
  };

  // End call with animation
  const handleEndCall = async () => {
    if (callState === CALL_STATES.ENDED) return;
    
    // Button press animation
    setEndButtonPressed(true);
    
    setCallState(CALL_STATES.ENDED);
    
    // Clean up local tracks
    if (localTrackRefs.current.audio) {
      localTrackRefs.current.audio.close();
      localTrackRefs.current.audio = null;
    }
    
    if (localTrackRefs.current.video) {
      localTrackRefs.current.video.close();
      localTrackRefs.current.video = null;
    }
    
    // Leave the channel
    if (client) {
      await client.leave().catch(console.error);
    }
    
    // Add delay before calling onEndCall to show animation
    setTimeout(() => {
      setEndButtonPressed(false);
      if (onEndCall) onEndCall();
    }, 1000);
  };

  // Determine if we have a remote video to display
  const hasRemoteVideo = remoteUsers.length > 0 && remoteUsers[0].hasVideo;

  // Decide which user is shown in main view and which in PIP based on swap state
  const mainIsLocal = isVideoSwapped;
  const mainVideoActive = mainIsLocal ? !isVideoOff : hasRemoteVideo;
  const pipVideoActive = mainIsLocal ? hasRemoteVideo : !isVideoOff;
  const mainUserInitial = mainIsLocal ? "You" : contactName[0];
  const pipUserLabel = mainIsLocal ? contactName[0] : "You";

  return (
    <div className="relative flex flex-col h-full overflow-hidden" style={{ backgroundColor: COLORS.dark }}>
      {/* Video layers */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main video (full screen) */}
        <div 
          ref={mainIsLocal ? localVideoRef : remoteVideoRef}
          className="absolute inset-0 bg-black flex items-center justify-center"
          onDoubleClick={handleVideoSwap}
        >
          {!mainVideoActive && callState === CALL_STATES.CONNECTED && (
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-white text-3xl">{mainUserInitial}</span>
            </div>
          )}
        </div>

        {/* PIP video */}
        <div 
          className={`absolute top-8 right-4 w-28 h-40 rounded-lg overflow-hidden border-2 border-white shadow-lg z-10 ${!pipVideoActive ? 'bg-gray-800' : ''}`}
          onDoubleClick={handleVideoSwap}
        >
          {!pipVideoActive ? (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white text-xl">{pipUserLabel}</span>
            </div>
          ) : (
            <div 
              ref={mainIsLocal ? remoteVideoRef : localVideoRef} 
              className="w-full h-full bg-gray-800"
            ></div>
          )}
          
          {!mainIsLocal && isMuted && (
            <div className="absolute bottom-2 right-2 bg-red-500 rounded-full p-1">
              <MicOff size={14} color="white" />
            </div>
          )}
        </div>
      </div>

      {/* Call information overlay - at top */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center">
          <h3 className="text-white font-semibold">{contactName}</h3>
          <span className="text-gray-300 ml-2 text-sm">
            {callState === CALL_STATES.RINGING && "Ringing..."}
            {callState === CALL_STATES.CONNECTING && "Connecting..."}
            {callState === CALL_STATES.CONNECTED && formatTime(callDuration)}
            {callState === CALL_STATES.ENDED && "Call ended"}
          </span>
        </div>
      </div>
      
      {error && (
        <div className="absolute top-12 left-0 right-0 flex justify-center">
          <div className="bg-red-500 bg-opacity-80 text-white px-4 py-2 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Call controls - at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
        {/* Primary controls */}
        <div className="flex justify-center items-center mb-4">
          <button
            onClick={toggleMute}
            className="flex items-center justify-center w-12 h-12 rounded-full mx-2"
            style={{ 
              backgroundColor: isMuted ? COLORS.primary : 'rgba(255, 255, 255, 0.2)' 
            }}
          >
            {isMuted ? <MicOff size={24} color="white" /> : <Mic size={24} color="white" />}
          </button>
          
          <button
            onClick={handleEndCall}
            className="flex items-center justify-center w-16 h-16 rounded-full mx-4 transition-transform duration-200"
            style={{ 
              backgroundColor: COLORS.danger,
              transform: endButtonPressed ? 'scale(0.9)' : 'scale(1)'
            }}
          >
            <Phone size={28} color="white" style={{ transform: 'rotate(135deg)' }} />
          </button>
          
          <button
            onClick={toggleVideo}
            className="flex items-center justify-center w-12 h-12 rounded-full mx-2"
            style={{ 
              backgroundColor: isVideoOff ? COLORS.primary : 'rgba(255, 255, 255, 0.2)' 
            }}
          >
            {isVideoOff ? <VideoOff size={24} color="white" /> : <Video size={24} color="white" />}
          </button>
        </div>

        {/* Instruction for video swap */}
        <div className="flex justify-center">
          <p className="text-white text-xs opacity-60">Double-click on any video to swap views</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;