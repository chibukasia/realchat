"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { auth, db } from '@/lib/firebase';
import type { ChatUser } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: ChatUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ChatUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // User is signed in, get their profile from Realtime DB
        const userRef = ref(db, `users/${fbUser.uid}`);
        const unsubscribeOnValue = onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUser({ uid: fbUser.uid, ...snapshot.val() });
          } else {
            // This might happen briefly on signup before the user profile is written
            setUser(null);
          }
          setLoading(false);
        });
        return () => unsubscribeOnValue();
      } else {
        // User is signed out
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
     return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
