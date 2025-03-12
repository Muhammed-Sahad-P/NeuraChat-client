import React from "react";
import { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
          message.sender === "user"
            ? "bg-blue-100 text-blue-900"
            : "bg-white text-gray-900"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p className="text-right text-xs text-gray-500 mt-1">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
