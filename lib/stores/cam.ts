import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CamState {
  cam: boolean;
}

interface CamAction {
  toggleCam: () => void;
}

export const useCam = create(
  devtools<CamState & CamAction>((set) => ({
    cam: true,
    toggleCam: () => set((state) => ({ cam: !state.cam })),
  })),
);
