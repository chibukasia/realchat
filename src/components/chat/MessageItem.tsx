"use client";

import { useAuth } from "@/lib/auth";
import { cn, parseFormattedMessage } from "@/lib/utils";
import type { ChatMessage, ChatUser } from "@/lib/types";
import { getAvatarComponent } from "../Avatars";
import { formatDistanceToNow } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface MessageItemProps {
  message: ChatMessage;
  sender?: ChatUser;
}

export default function MessageItem({ message, sender }: MessageItemProps) {
  const { user } = useAuth();
  const isCurrentUser = user?.uid === message.senderId;

  const timestamp = message.timestamp
    ? formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })
    : "sending...";

  const seenCount = Object.keys(message.seenBy || {}).length;
  const isSeen = seenCount > 1;

  return (
    <div className={cn("flex items-start gap-3", isCurrentUser && "justify-end")}>
      {!isCurrentUser && (
        <div className="h-10 w-10 flex-shrink-0 rounded-full">
            {sender ? getAvatarComponent(sender.avatarUrl) : null}
        </div>
      )}
      <div className={cn("flex max-w-[75%] flex-col gap-1", isCurrentUser && "items-end")}>
        <div
          className={cn(
            "rounded-lg px-3 py-2",
            isCurrentUser
              ? "bg-primary text-primary-foreground"
              : "bg-card border"
          )}
        >
          {!isCurrentUser && sender && (
            <p className="text-xs font-semibold text-primary mb-1">{sender.displayName}</p>
          )}
          <div className="text-sm prose prose-p:my-0 prose-p:leading-normal">
            {parseFormattedMessage(message.text)}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{timestamp}</span>
          {isCurrentUser && (
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        {isSeen ? <CheckCheck className="h-4 w-4 text-accent" /> : <Check className="h-4 w-4" />}
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isSeen ? `Seen by ${seenCount - 1} other(s)` : "Sent"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
}
