import backendService from './backendService';

export const register = (email, password, role) =>
  backendService.post('/auth/register', { email, password, role });

export const login = (email, password) =>
  backendService.post('/auth/login', { email, password });

export const getChatToken = (data, token) =>
  backendService.post('/chat/token', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const sendMessage = (data, token) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === 'file') {
      formData.append('file', data[key]);
    } else {
      formData.append(key, data[key]);
    }
  });
  return backendService.post('/chat/message', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getChatHistory = (userId, token) =>
  backendService.get(`/chat/history/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteMessage = (messageId, token) =>
  backendService.delete(`/chat/message/${messageId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const handleCallRequest = (data, token) =>
  backendService.post('/chat/call', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getUsers = (token) =>
  backendService.get('/chat/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
