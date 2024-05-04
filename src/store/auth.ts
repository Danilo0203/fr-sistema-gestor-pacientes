import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string;
  profile: unknown;
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
      profile: null,
      logged: false,
      setToken: (token: string) => set({ token, logged: true }),
      setProfile: (profile: unknown) => set({ profile }),
      setClearToken: () =>
        set((state) => ({ ...state, token: "", logged: false })),
    }),

    { name: "auth" },
  ),
);
