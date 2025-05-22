import React, { useState, useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { sendMessage } from '../utils/api';
import { ChatTheme } from '../constants/theme';

const ChatInput = ({ onReply }) => {
  const { agoraClient, selectedUser, channel, setMessages } = useContext(ChatContext);
  const { user, token } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('text');
  const [tagged, setTagged] = useState(false);

  const handleSend = async () => {
    if (!content && !file) return;

    try {
      const messageData = {
        receiverId: selectedUser._id,
        type,
        content: file ? '' : content,
        channel,
        replyTo: onReply?.id || null,
        tagged,
        ...(file && { file }),
      };

      const { data } = await sendMessage(messageData, token);
      setMessages((prev) => [...prev, {
        id: data._id,
        sender: user.agoraUid,
        receiver: selectedUser.agoraUid,
        type: data.type,
        content: data.content,
        replyTo: data.replyTo,
        tagged: data.tagged,
        callStatus: data.callStatus,
        timestamp: new Date(data.timestamp).toLocaleTimeString(),
        channel: data.channel,
      }]);

      if (agoraClient && type !== 'callRequest') {
        agoraClient.sendMessage({
          to: selectedUser.agoraUid,
          chatType: 'singleChat',
          type,
          body: file ? data.content : content,
          chatId: channel,
        });
      }

      setContent('');
      setFile(null);
      setType('text');
      setTagged(false);
      onReply?.clear();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type.split('/')[0];
      setType(
        fileType === 'image' ? 'image' :
        fileType === 'audio' ? 'audio' :
        fileType === 'video' ? 'video' :
        selectedFile.name.endsWith('.pdf') ? 'doc' : 'file'
      );
      setFile(selectedFile);
    }
  };

  return (
    <div className="p-4 bg-gray-100 border-t">
      <div className="flex items-center">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
          disabled={file}
        />
        <input
          type="file"
          accept="image/*,audio/*,video/*,.pdf,.doc,.docx"
          onChange={handleFileChange}
          className="ml-2"
        />
        <button
          onClick={() => setTagged(!tagged)}
          className={`ml-2 p-2 ${tagged ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Tag
        </button>
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
          style={{ backgroundColor: ChatTheme.bubbleMe }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;