// src/services/messageService.js

import io from 'socket.io-client';

const API_BASE_URL = "http://localhost:5050";
const SOCKET_SERVER_URL = "http://localhost:5050";

let socket;

/**
 * Manages the Socket.IO connection as a singleton.
 */
export const socketManager = {
  connect: (authToken) => {
    // Avoid creating multiple connections
    if (socket && socket.connected) {
      return;
    }
    
    // Establish a new connection with authentication
    socket = io(SOCKET_SERVER_URL, {
      auth: {
        token: `Bearer ${authToken}`,
      },
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
    }
  },

  joinGroup: (groupId) => {
    if (socket) {
      socket.emit('joinGroup', groupId);
    }
  },

  leaveGroup: (groupId) => {
    if (socket) {
      socket.emit('leaveGroup', groupId);
    }
  },

  sendMessage: (messageData) => {
    if (socket) {
      socket.emit('sendMessage', messageData);
    }
  },

  onNewMessage: (callback) => {
    if (socket) {
      // The server emits 'newMessage', so we listen for that
      socket.on('newMessage', callback);
    }
  },

  offNewMessage: (callback) => {
    if (socket) {
      socket.off('newMessage', callback);
    }
  }
};

/**
 * Fetches the historical messages for a specific group.
 * @param {string} groupId - The ID of the group.
 * @param {string} authToken - The user's JWT for authorization.
 * @returns {Promise<Array>} - A promise that resolves to the array of messages.
 */
export const fetchMessagesForGroup = async (groupId, authToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/messages/${groupId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("API Error in fetchMessagesForGroup:", error);
    // Re-throw the error to be caught by the hook
    throw error;
  }
};