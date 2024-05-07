import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string;
  profile: string;
  logged: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  setProfile: (token: string) => void;
  setClearToken: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      profile: "",
      logged: false,
      setToken: (token: string) => set({ token, logged: true }),
      setProfile: (profile: string) => set({ profile }),
      setClearToken: () =>
        set((state) => ({ ...state, token: "", logged: false })),
    }),

    { name: "auth" },
  ),
);
