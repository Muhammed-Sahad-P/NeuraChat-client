import React from "react";
import { Chat as ChatIcon } from "@mui/icons-material";

export default function ChatWelcome() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-8 text-center">
      <div>
        <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <ChatIcon className="h-12 w-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to NeuraChat
        </h2>
        <p className="text-gray-600 max-w-md">
          Select a conversation or start a new chat to begin messaging.
        </p>
      </div>
    </div>
  );
}
