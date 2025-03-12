"use client";

import React, { useState } from "react";
import Head from "next/head";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatMain from "@/components/chat/ChatSection";
import ChatWelcome from "@/components/chat/ChatWelcome";
import type { Chat, Message } from "@/types/chat";

export default function Chat() {
  const [activeChat, setActiveChat] = useState<number | null>(null);

  const initialChats: Chat[] = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/api/placeholder/40/40",
      lastMessage: "It's a chat app called NeuraChat",
      timestamp: new Date(Date.now() - 1200000).toISOString(),
      unread: 0,
    },
    {
      id: 2,
      name: "Tech Team",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Meeting at 3 PM today",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      unread: 3,
    },
    {
      id: 3,
      name: "Sarah Williams",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Did you see the latest update?",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      unread: 0,
    },
    {
      id: 4,
      name: "Project Neura",
      avatar: "/api/placeholder/40/40",
      lastMessage: "The deadline has been extended",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      unread: 0,
    },
    {
      id: 5,
      name: "David Chen",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Thanks for your help!",
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      unread: 0,
    },
  ];

  const chatMessages: Record<number, Message[]> = {
    1: [
      {
        id: 1,
        text: "Hey there! How's it going?",
        sender: "contact",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: 2,
        text: "I'm doing well, thanks for asking! How about you?",
        sender: "user",
        timestamp: new Date(Date.now() - 3000000),
      },
      {
        id: 3,
        text: "Great! I'm working on a new project using Next.js and TypeScript.",
        sender: "contact",
        timestamp: new Date(Date.now() - 2400000),
      },
      {
        id: 4,
        text: "That sounds interesting! Tell me more about it.",
        sender: "user",
        timestamp: new Date(Date.now() - 1800000),
      },
      {
        id: 5,
        text: "It's a chat application called NeuraChat. The UI is similar to WhatsApp but with some AI features.",
        sender: "contact",
        timestamp: new Date(Date.now() - 1200000),
      },
    ],
    2: [
      {
        id: 1,
        text: "Team meeting today at 3 PM",
        sender: "contact",
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: 2,
        text: "Will there be a video call link?",
        sender: "user",
        timestamp: new Date(Date.now() - 7000000),
      },
      {
        id: 3,
        text: "Yes, I'll share it before the meeting",
        sender: "contact",
        timestamp: new Date(Date.now() - 6800000),
      },
    ],
  };

  const handleChatSelect = (chatId: number) => {
    setActiveChat(chatId);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Head>
        <title>NeuraChat</title>
        <meta name="description" content="A modern chat application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col md:flex-row h-full">
        <ChatSidebar
          chats={initialChats}
          activeChat={activeChat}
          onChatSelect={handleChatSelect}
        />

        {activeChat ? (
          <ChatMain
            chat={initialChats.find((c) => c.id === activeChat)!}
            messages={chatMessages[activeChat] || []}
          />
        ) : (
          <ChatWelcome />
        )}
      </div>
    </div>
  );
}
