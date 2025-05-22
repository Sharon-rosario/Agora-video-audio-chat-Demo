import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { ChatContext } from '../context/ChatContext.js';
import ChatPanel from '../components/ChatPanel';
import CallReceiverPopup from '../components/CallReceiverPopup.tsx';
import { getUsers, sendMessage } from '../utils/api';
import { ConsultationTheme } from '../constants/theme';

const IconButton = ({ onClick, children }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="p-2 rounded-full"
      style={{ backgroundColor: hover ? ConsultationTheme.headerHover : 'transparent' }}
    >
      {children}
    </button>
  );
};

const Consultation = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user, token } = useContext(AuthContext);
  const { selectChat, selectedUser, agoraClient, channel } = useContext(ChatContext);
  const [patientName, setPatientName] = useState('Unknown');
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUsers(token);
        const targetUser = data.find((u) => u._id === userId);
        if (targetUser) {
          setPatientName(targetUser.email);
          selectChat(targetUser);
        } else {
          navigate('/listing');
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
        navigate('/listing');
      }
    };
    if (user && token) {
      fetchUser();
    }
  }, [userId, user, token, selectChat, navigate]);

  useEffect(() => {
    if (agoraClient) {
      agoraClient.on('message', (msg) => {
        if (msg.type === 'callRequest' && msg.to === user.agoraUid) {
          setIncomingCall({
            callId: msg.id,
            callType: msg.body.callType,
            sender: msg.from,
            timestamp: new Date(msg.time).toLocaleTimeString(),
          });
        }
      });
    }
  }, [agoraClient, user]);

  const handleCallRequest = async (callType) => {
    try {
      const messageData = {
        receiverId: selectedUser._id,
        type: 'callRequest',
        content: JSON.stringify({ callType }),
        channel,
        tagged: false,
      };
      const { data } = await sendMessage(messageData, token);
      agoraClient.sendMessage({
        to: selectedUser.agoraUid,
        chatType: 'singleChat',
        type: 'callRequest',
        body: JSON.stringify({ callType }),
        chatId: channel,
      });
      return data;
    } catch (err) {
      console.error('Failed to send call request:', err);
    }
  };

  const handleAcceptCall = async (callData) => {
    try {
      const messageData = {
        messageId: callData.callId,
        action: 'accept',
      };
      await sendMessage({
        receiverId: selectedUser._id,
        type: 'callRequest',
        content: JSON.stringify({ callType: callData.callType, status: 'accepted' }),
        channel,
        replyTo: callData.callId,
      }, token);
      setIncomingCall(null);
    } catch (err) {
      console.error('Failed to accept call:', err);
    }
  };

  const handleRejectCall = async (callData) => {
    try {
      const messageData = {
        messageId: callData.callId,
        action: 'reject',
      };
      await sendMessage({
        receiverId: selectedUser._id,
        type: 'callRequest',
        content: JSON.stringify({ callType: callData.callType, status: 'rejected' }),
        channel,
        replyTo: callData.callId,
      }, token);
      setIncomingCall(null);
    } catch (err) {
      console.error('Failed to reject call:', err);
    }
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: ConsultationTheme.pageBg }}
    >
      <div
        className="fixed top-0 left-0 right-0 z-10 p-4 flex items-center justify-between shadow-md"
        style={{ backgroundColor: ConsultationTheme.headerBg, color: ConsultationTheme.headerText }}
      >
        <div className="flex items-center">
          <IconButton onClick={() => navigate('/listing')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </IconButton>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center ml-2"
            style={{ backgroundColor: ConsultationTheme.avatarBg }}
          >
            <span className="font-semibold text-lg" style={{ color: ConsultationTheme.headerText }}>
              {patientName[0]}
            </span>
          </div>
          <h2 className="ml-3 text-lg font-medium">{patientName}</h2>
        </div>
        <div className="flex space-x-4">
          <IconButton onClick={() => handleCallRequest('audio')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </IconButton>
          <IconButton onClick={() => handleCallRequest('video')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </IconButton>
        </div>
      </div>
      <div className="flex-1 mt-16">
        <ChatPanel />
      </div>
      {incomingCall && (
        <CallReceiverPopup
          callData={incomingCall}
          onAccept={() => handleAcceptCall(incomingCall)}
          onReject={() => handleRejectCall(incomingCall)}
        />
      )}
    </div>
  );
};

export default Consultation;