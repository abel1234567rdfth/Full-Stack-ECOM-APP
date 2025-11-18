import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: string;
  role: "admin" | "customer";
  setUserId: (userId: string) => void;
  setRole: (role: "admin" | "customer") => void;
  clearUserId: () => void;
  clearRole: () => void;
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      userId: "",
      role: "customer",
      setUserId: (userId) => set({ userId }),
      setRole: (role) => set({ role }),
      clearUserId: () => set({ userId: "" }),
      clearRole: () => set({ role: "customer" }),
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);
