import React from "react";
import { Chat } from "@/types/chat";
import { Avatar, Badge, IconButton } from "@mui/material";
import {
  People as PeopleIcon,
  DonutLarge as StatusIcon,
  Chat as ChatIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: number | null;
  onChatSelect: (chatId: number) => void;
}

export default function ChatSidebar({
  chats,
  activeChat,
  onChatSelect,
}: ChatSidebarProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-3 bg-gray-50 flex justify-between items-center border-b border-gray-200">
        <Avatar className="bg-gray-300">
          <PeopleIcon />
        </Avatar>
        <div className="flex items-center space-x-2">
          <IconButton size="small">
            <StatusIcon />
          </IconButton>
          <IconButton size="small">
            <ChatIcon />
          </IconButton>
          <IconButton size="small">
            <MoreIcon />
          </IconButton>
        </div>
      </div>

      <div className="px-4 py-2 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`px-4 py-3 flex items-center hover:bg-gray-50 cursor-pointer ${
              activeChat === chat.id ? "bg-blue-50" : ""
            }`}
            onClick={() => onChatSelect(chat.id)}
          >
            <div className="relative mr-3">
              <Badge
                badgeContent={chat.unread}
                color="success"
                overlap="circular"
                invisible={chat.unread === 0}
              >
                <Avatar src={chat.avatar} alt={chat.name} />
              </Badge>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {chat.name}
                </h3>
                <span className="text-xs text-gray-500">
                  {formatDate(chat.timestamp)}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
