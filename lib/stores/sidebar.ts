import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SidebarState {
  isOpen: boolean;
}

interface SidebarAction {
  toggleSidebar: () => void;
}

export const useSidebar = create(
  devtools<SidebarState & SidebarAction>((set) => ({
    isOpen: false,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  })),
);
