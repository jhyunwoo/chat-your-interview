import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface EndInterviewState {
  endInterview: () => void;
}

interface EndInterviewAction {
  setEndInterview: (func: () => void) => void;
}

export const useEndInterview = create(
  devtools<EndInterviewState & EndInterviewAction>((set) => ({
    endInterview: () => {},
    setEndInterview: (func) => set(() => ({ endInterview: func })),
  })),
);
