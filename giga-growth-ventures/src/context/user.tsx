import { create } from "zustand";

interface UserState {
  user: {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
  } | null;
  setUser: (user: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set((old) => ({ ...old, user })),
}));
