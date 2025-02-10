import axios from 'axios';

const DEPLOYED_BASE_URL = 'https://mongo-backend-4prm.onrender.com/api';

// User Authentication APIs
export const registerUser = async (username: string, email: string, password: string, role: string) => {
  return axios.post(`${DEPLOYED_BASE_URL}/register`, { username, email, password, role });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post(`${DEPLOYED_BASE_URL}/login`, { email, password });
};

// Chat APIs
export const fetchConversations = async (userId: string) => {
  return axios.get(`${DEPLOYED_BASE_URL}/conversations/${userId}`);
};


export const createConversation = async (senderUsername: string, receiverUsername: string) => {
  try {
    const response = await axios.post(`${DEPLOYED_BASE_URL}/conversations`, { senderUsername, receiverUsername });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating conversation:", error.response?.data || error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    return null;
  }
};


export const fetchMessages = async (user1: string, user2: string) => {
  return axios.get(`${DEPLOYED_BASE_URL}/messages/${user1}/${user2}`);
};

export const sendMessage = async (senderEmail: string, receiverEmail: string, text: string) => {
  return axios.post(`${DEPLOYED_BASE_URL}/messages/send`, { senderEmail, receiverEmail, text });
};


