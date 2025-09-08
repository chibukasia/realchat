export interface ChatUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  avatarUrl: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  timestamp: number;
  seenBy: {
    [key: string]: boolean;
  };
}
