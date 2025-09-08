"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/icons";
import { LogOut } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout Error:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out. Please try again.",
      });
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
      <Logo />
      <Button variant="ghost" size="sm" onClick={handleLogout} className="text-accent hover:bg-accent/10 hover:text-accent">
        <LogOut className="mr-2 h-4 w-4" />
        Log Out
      </Button>
    </header>
  );
}
