"use client";

import { useEffect, useRef, useState } from "react";
import { ref, onValue, off, query, orderByKey, limitToLast, update } from "firebase/database";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import type { ChatMessage, ChatUser } from "@/lib/types";
import MessageItem from "./MessageItem";
import { Loader2 } from "lucide-react";

export default function MessageList() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<{ [key: string]: ChatUser }>({});
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Fetch all users once
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      setUsers(snapshot.val() || {});
    });

    // Fetch last 50 messages and listen for new ones
    const messagesQuery = query(ref(db, "messages/general"), orderByKey(), limitToLast(50));
    const listener = onValue(messagesQuery, (snapshot) => {
      const val = snapshot.val();
      const messageList = val ? Object.entries(val).map(([id, data]) => ({
        id,
        ...(data as Omit<ChatMessage, 'id'>),
      })) : [];
      setMessages(messageList);
      setLoading(false);
    });

    return () => off(messagesQuery, "value", listener);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // "Seen by" functionality
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute("data-message-id");
            const senderId = entry.target.getAttribute("data-sender-id");
            
            if (messageId && senderId && user && senderId !== user.uid) {
               const message = messages.find(m => m.id === messageId);
               if(message && !message.seenBy[user.uid]) {
                 const seenRef = ref(db, `messages/general/${messageId}/seenBy/${user.uid}`);
                 update(ref(db), {[`messages/general/${messageId}/seenBy/${user.uid}`]: true});
               }
            }
          }
        });
      },
      { threshold: 0.8 }
    );
    
    document.querySelectorAll('[data-message-id]').forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();

  }, [messages, user]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} data-message-id={msg.id} data-sender-id={msg.senderId}>
             <MessageItem message={msg} sender={users[msg.senderId]} />
          </div>
        ))}
      </div>
    </div>
  );
}
