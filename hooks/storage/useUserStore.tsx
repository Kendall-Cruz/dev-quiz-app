import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { IUser } from "@/interfaces/IUser";
import { LoggStates } from "@/context/SessionContext";


interface IUserStore {
  user: IUser | null;
  estado: LoggStates;
  setUser: (user: IUser) => void;
  setEstado: (estado: LoggStates) => void;
  clearUser: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      estado: LoggStates.verifying,
      setUser: (user) => set({ user }),
      setEstado: (estado) => set({ estado }),
      clearUser: () => set({ user: null, estado: LoggStates["not logged"] }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
