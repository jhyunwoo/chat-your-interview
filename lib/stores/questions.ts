import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { MessageType } from "@/lib/types";
import { useMessages } from "@/lib/stores/messages";

interface QuestionsState {
  questions: MessageType[];
}

interface QuestionsAction {
  setQuestions: (data: MessageType[]) => void;
  handleNextQuestion: () => void;
}

export const useQuestions = create(
  devtools<QuestionsState & QuestionsAction>((set) => ({
    questions: [],
    setQuestions: (data: MessageType[]) => set(() => ({ questions: data })),

    handleNextQuestion: () =>
      set((state) => {
        const { messages, setMessages } = useMessages((state) => state);
        setMessages([...messages, state.questions[0]]);
        const copyArray = state.questions;
        copyArray.shift();
        return { questions: copyArray };
      }),
  })),
);
