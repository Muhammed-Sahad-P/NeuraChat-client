"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import {
  Search as SearchIcon,
  Call as CallIcon,
  VideoCall as VideoIcon,
  MoreVert as MoreIcon,
  AttachFile as AttachIcon,
  Send as SendIcon,
  Mic as MicIcon,
} from "@mui/icons-material";
import { Chat, Message } from "@/types/chat";
import MessageBubble from "@/components/chat/MessageBubble";

interface ChatMainProps {
  chat: Chat;
  messages: Message[];
}

export default function ChatMain({
  chat,
  messages: initialMessages,
}: ChatMainProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        text: "I got your message! This is an automated response.",
        sender: "contact",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-4 py-2 bg-gray-50 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center">
          <Avatar src={chat.avatar} alt={chat.name} className="mr-3" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">{chat.name}</h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <IconButton size="small">
            <SearchIcon />
          </IconButton>
          <IconButton size="small">
            <CallIcon />
          </IconButton>
          <IconButton size="small">
            <VideoIcon />
          </IconButton>
          <IconButton size="small">
            <MoreIcon />
          </IconButton>
        </div>
      </div>

      <div
        className="flex-1 p-4 overflow-y-auto bg-gray-100"
        style={{
          backgroundImage: "url('/api/placeholder/400/400')",
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="space-y-3">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messageEndRef} />
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center">
          <IconButton size="small" className="text-gray-600">
            <AttachIcon />
          </IconButton>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 bg-white rounded-full py-2 px-4 mx-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <IconButton size="small" color="primary" onClick={handleSendMessage}>
            {message.trim() ? <SendIcon /> : <MicIcon />}
          </IconButton>
        </div>
      </div>
    </div>
  );
}
