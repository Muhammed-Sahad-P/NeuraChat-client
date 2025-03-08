export interface Message {
  id: number;
  text: string;
  sender: "user" | "contact";
  timestamp: Date;
}

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}
