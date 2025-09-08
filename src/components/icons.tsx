import { MessageSquareText } from 'lucide-react';

export const Logo = () => (
  <div className="flex items-center gap-2">
    <MessageSquareText className="h-8 w-8 text-primary" />
    <span className="text-xl font-bold text-foreground">Realtime Chat</span>
  </div>
);
