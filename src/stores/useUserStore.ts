import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
  setUser: (user: User) => void;
  clearUser: () => void;
};

const getStorage = () => {
  if (typeof window !== "undefined") {
    return createJSONStorage(() => localStorage);
  }
  return createJSONStorage(() => sessionStorage);
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: getStorage(),
    },
  ),
);
