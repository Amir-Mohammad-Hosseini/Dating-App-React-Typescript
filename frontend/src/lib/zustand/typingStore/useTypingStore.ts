import { create } from "zustand";

type TypingStoreType = {
  typingRooms: Record<number, boolean>;
  setTyping: (room: number, isTyping: boolean) => void;
};

const useTypingStore = create<TypingStoreType>((set) => ({
  typingRooms: {},
  setTyping: (room, isTyping) =>
    set((state) => ({
      typingRooms: { ...state.typingRooms, [room]: isTyping },
    })),
}));

export default useTypingStore;
