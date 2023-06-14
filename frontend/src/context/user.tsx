import { create } from "zustand";

export interface User {
  username?: string;
}
export interface UserState {
  user: User;
  setUser: (user: User) => void;
  logOut: () => void;
}

export const useUser = create<UserState>((set) => ({
  user: {},
  setUser: (user: User) => set((old) => ({ ...old, user })),
  logOut: () => set((old) => ({ ...old, user: {} })),
}));
