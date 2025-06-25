// src/components/chat/GroupChat.jsx
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useMessages } from '../../hooks/useMessage'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Loader2 } from 'lucide-react'; // Added Loader2 for loading state

export function GroupChat({ groupId, currentUser, authToken }) {
  // All complex logic is now in the custom hook
  const { messages, isLoading, error, sendMessage } = useMessages(groupId, authToken);
  
  // State for the controlled input component remains here
  const [newMessageText, setNewMessageText] = useState('');
  const messagesEndRef = useRef(null);

  // Effect to automatically scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Call the function provided by the hook
    sendMessage(newMessageText, currentUser._id);
    setNewMessageText(''); // Clear the input field
  };

  // Render a loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <p className="ml-2">Loading Chat...</p>
      </div>
    );
  }

  // Render an error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg p-4 border">
      {/* Messages Display Area */}
      <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg._id} 
            className={`flex items-start gap-3 ${msg.sender._id === currentUser._id ? 'justify-end' : ''}`}
          >
            {msg.sender._id !== currentUser._id && (
              <Avatar className="h-9 w-9">
                <AvatarImage src={msg.sender?.profileImage} alt={msg.sender?.name} />
                <AvatarFallback>{msg.sender?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            )}
            <div className={`flex flex-col ${msg.sender._id === currentUser._id ? 'items-end' : 'items-start'}`}>
              <p className="font-semibold text-sm text-gray-700 px-1">{msg.sender.name}</p>
              <div 
                className={`p-3 rounded-lg max-w-sm break-words text-sm
                  ${msg.sender._id === currentUser._id 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-800'}`
                }
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="flex gap-2 border-t pt-4">
        <Input
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="Type your message..."
          autoComplete="off"
        />
        <Button type="submit" size="icon" className="bg-green-600 hover:bg-green-700">
          <Send className="h-5 w-5"/>
        </Button>
      </form>
    </div>
  );
}