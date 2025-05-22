import React, { createContext, useState, useEffect } from 'react';
import { Chat } from 'agora-chat';
import { getChatToken, getChatHistory } from '../utils/api';

export const ChatContext = createContext();

export const ChatProvider = ({ children, user, token }) => {
  const [agoraClient, setAgoraClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState('');

  useEffect(() => {
    if (user && token) {
      const client = new Chat();
      setAgoraClient(client);

      client
        .init({ appkey: `${process.env.REACT_APP_AGORA_ORG_NAME}/${process.env.REACT_APP_AGORA_APP_NAME}` })
        .then(() => getChatToken({ channelName: 'default' }, token))
        .then(({ data }) => {
          return client.login(user.agoraUid, data.token);
        })
        .catch((err) => console.error('Agora login failed:', err));

      client.on('message', (msg) => {
        setMessages((prev) => [...prev, {
          id: msg.id,
          sender: msg.from,
          receiver: msg.to,
          type: msg.type,
          content: msg.body,
          timestamp: new Date(msg.time).toLocaleTimeString(),
          channel: msg.chatId,
        }]);
      });

      return () => {
        client.logout();
      };
    }
  }, [user, token]);

  const selectChat = async (targetUser) => {
    setSelectedUser(targetUser);
    const channelName = [user.agoraUid, targetUser.agoraUid].sort().join('_');
    setChannel(channelName);

    try {
      const { data } = await getChatHistory(targetUser._id, token);
      setMessages(data.map((msg) => ({
        id: msg._id,
        sender: msg.sender.agoraUid,
        receiver: msg.receiver.agoraUid,
        type: msg.type,
        content: msg.content,
        replyTo: msg.replyTo?._id,
        tagged: msg.tagged,
        callStatus: msg.callStatus,
        timestamp: new Date(msg.timestamp).toLocaleTimeString(),
        channel: msg.channel,
      })));
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  };

  return (
    <ChatContext.Provider value={{ agoraClient, selectedUser, selectChat, messages, setMessages, channel }}>
      {children}
    </ChatContext.Provider>
  );
};