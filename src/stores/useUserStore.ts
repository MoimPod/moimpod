import { create } from "zustand";

type User = {
  teamId: number;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

type UserStore = {
  user: User | null;
  action: {
    setUser: (user: User) => void;
    clearUser: () => void;
  };
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  action: {
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  },
}));
