import Header from "@/components/chat/Header";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";

export default function ChatPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <MessageList />
          <MessageInput />
        </div>
      </main>
    </div>
  );
}
