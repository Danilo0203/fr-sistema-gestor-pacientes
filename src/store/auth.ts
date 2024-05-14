import { create } from "zustand";
import { persist } from "zustand/middleware";

type Profile = {
  nombre: string;
  rol: {
    nombre: string;
  };
};

type State = {
  token: string;
  profile: Profile;
  logged: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  setProfile: (profile: Profile) => void;
  setClearToken: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      profile: { nombre: "", rol: { nombre: "" } },
      logged: false,

      setToken: (token: string) => set({ token, logged: true }),

      setProfile: (profile: Profile) => set({ profile }),

      setClearToken: () =>
        set({
          token: "",
          profile: { nombre: "", rol: { nombre: "" } },
          logged: false,
        }),
    }),

    { name: "auth" },
  ),
);
