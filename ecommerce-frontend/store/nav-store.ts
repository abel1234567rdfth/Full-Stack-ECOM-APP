import { create } from "zustand";

interface NavStore {
  navopen: boolean;
  setnavopenFalse: () => void;
  setnavopenTrue: () => void;
}

export const useNavStore = create<NavStore>((set) => ({
  navopen: true,
  setnavopenFalse: () => set(() => ({ navopen: false })),
  setnavopenTrue: () => set(() => ({ navopen: true })),
}));
