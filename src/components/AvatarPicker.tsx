"use client";

import { cn } from "@/lib/utils.tsx";
import { avatarComponents, getAvatarId } from "./Avatars";
import { CheckCircle2 } from "lucide-react";

interface AvatarPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export const AvatarPicker = ({ selectedValue, onValueChange }: AvatarPickerProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {avatarComponents.map((Avatar, index) => {
        const avatarId = getAvatarId(index);
        const isSelected = selectedValue === avatarId;
        return (
          <div
            key={avatarId}
            className="relative"
            onClick={() => onValueChange(avatarId)}
          >
            <button
              type="button"
              className={cn(
                "rounded-full transition-all duration-200",
                isSelected
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "hover:scale-110",
              )}
            >
              <Avatar />
            </button>
            {isSelected && (
              <CheckCircle2 className="absolute -bottom-1 -right-1 h-5 w-5 text-accent bg-background rounded-full" />
            )}
          </div>
        );
      })}
    </div>
  );
};
