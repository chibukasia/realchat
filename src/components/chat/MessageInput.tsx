"use client";

import { useState, useTransition } from "react";
import { ref, push, serverTimestamp, set } from "firebase/database";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import { enhanceMessage } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { SendHorizonal, Sparkles, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function MessageInput() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const [isAiEnhancing, startAiTransition] = useTransition();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    try {
      const messagesRef = ref(db, "messages/general");
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, {
        text: message,
        senderId: user.uid,
        timestamp: serverTimestamp(),
        seenBy: { [user.uid]: true },
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        variant: "destructive",
        title: "Send Error",
        description: "Failed to send message. Please try again.",
      });
    }
  };

  const handleEnhanceMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Empty Message",
        description: "Please type a message before using the AI enhancer.",
      });
      return;
    }
    startAiTransition(async () => {
      const enhanced = await enhanceMessage(message);
      setMessage(enhanced);
    });
  };

  return (
    <div className="border-t bg-card p-4">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleEnhanceMessage}
                disabled={isAiEnhancing}
                className="text-primary hover:text-primary hover:bg-primary/10"
              >
                {isAiEnhancing ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Sparkles className="h-5 w-5" />
                )}
                <span className="sr-only">Enhance with AI</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Enhance with AI</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-background"
          autoComplete="off"
        />
        <Button type="submit" size="icon" disabled={!message.trim()}>
          <SendHorizonal className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
