import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ModalState {
  text: string;
  action: () => void;
}

interface ModalAction {
  setModal: (text: string, action: () => void) => void;
}

export const useModal = create(
  devtools<ModalState & ModalAction>((set) => ({
    text: "",
    action: () => {},
    setModal: (text: string, action: () => void) =>
      set(() => ({ text: text, action: action })),
  })),
);
