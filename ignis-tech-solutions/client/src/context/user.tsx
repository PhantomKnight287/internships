import { create } from "zustand";

interface User {
  username: string;
}
interface UserStore {
  user: User;
  setUser: (user: User) => void;
  logOut: () => void;
}

export const useUser = create<UserStore>((set) => ({
  user: {} as User,
  setUser: (user: User) => set((old) => ({ ...old, user })),
  logOut: () => set((old) => ({ ...old, user: {} as User })),
}));
