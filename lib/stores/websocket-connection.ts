import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface WebsocketConnectionState {
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
}

interface WebsocketConnectionAction {
  setConnect: (func: () => void) => void;
  setDisconnect: (func: () => void) => void;
  setIsConnected: (state: boolean) => void;
}

export const useWebsocketConnection = create(
  devtools<WebsocketConnectionState & WebsocketConnectionAction>((set) => ({
    isConnected: false,
    connect: () => {},
    disconnect: () => {},
    setConnect: (func: () => void) => set(() => ({ connect: func })),
    setDisconnect: (func: () => void) => set(() => ({ disconnect: func })),
    setIsConnected: (state: boolean) => set(() => ({ isConnected: state })),
  })),
);
