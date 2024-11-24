import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { MessageType } from "@/lib/types";

interface MessagesState {
  messages: MessageType[];
}

interface MessagesAction {
  setMessages: (data: MessageType[]) => void;
}

export const useMessages = create(
  devtools<MessagesState & MessagesAction>((set) => ({
    messages: [],
    setMessages: (data: MessageType[]) => set(() => ({ messages: data })),
  })),
);
