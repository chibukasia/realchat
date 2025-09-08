"use server";

import { enhanceMessageFormatting } from "@/ai/flows/enhance-message-formatting";

export async function enhanceMessage(message: string): Promise<string> {
  if (!message.trim()) {
    return "";
  }
  try {
    const result = await enhanceMessageFormatting({ message });
    return result.enhancedMessage;
  } catch (error) {
    console.error("AI enhancement failed:", error);
    // In case of an error, return the original message
    return message;
  }
}
