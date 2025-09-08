import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseFormattedMessage(text: string): React.ReactNode {
  const regex = /(\*.*?\*|_.*?_|==.*?==)/g;
  const parts = text.split(regex).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index} className="italic">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('_') && part.endsWith('_')) {
      return <u key={index} className="underline">{part.slice(1, -1)}</u>;
    }
    if (part.startsWith('==') && part.endsWith('==')) {
      return <mark key={index} className="bg-[hsl(var(--chart-4))] text-foreground rounded px-1 py-0.5">{part.slice(2, -2)}</mark>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}