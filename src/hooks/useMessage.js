// src/hooks/useMessages.js

import { useState, useEffect, useCallback } from 'react';
import { fetchMessagesForGroup, socketManager } from '../services/messageService';

export const useMessages = (groupId, authToken) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch initial data and set up socket listeners
  useEffect(() => {
    if (!groupId || !authToken) {
      setIsLoading(false);
      return;
    };

    // Reset state when groupId changes
    setIsLoading(true);
    setError(null);

    // I. Fetch historical messages
    fetchMessagesForGroup(groupId, authToken)
      .then(initialMessages => {
        setMessages(initialMessages);
      })
      .catch(err => {
        setError('Could not load chat history.');
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // II. Setup WebSocket connection and listeners
    socketManager.connect(authToken);
    socketManager.joinGroup(groupId);

    const handleNewMessage = (newMessage) => {
      // Only add message if it belongs to the current group
      if (newMessage.group === groupId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };
    
    socketManager.onNewMessage(handleNewMessage);

    // III. Cleanup function
    return () => {
      socketManager.leaveGroup(groupId);
      socketManager.offNewMessage(handleNewMessage);
      // Optional: you might not want to disconnect if user navigates between chats quickly.
      // socketManager.disconnect(); 
    };
  }, [groupId, authToken]); // Re-run whenever the group or user changes

  // Function to send a message, exposed to the component
  const sendMessage = useCallback((messageText, senderId) => {
    if (!messageText.trim()) return;

    const messageData = {
      groupId,
      senderId,
      text: messageText,
    };
    socketManager.sendMessage(messageData);
  }, [groupId]); // Dependency array ensures the function has the correct groupId

  return { messages, isLoading, error, sendMessage };
};