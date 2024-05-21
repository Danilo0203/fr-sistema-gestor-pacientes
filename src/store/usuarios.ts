import { create } from "zustand";
import api from "../helpers/libs/axios";
import { UsuarioProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const useUsuarioStore = create<StoreProps>()((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const usuarios = await api.get("/usuarios");
      set({
        ...initialState,
        success: true,
        data: usuarios.data.data.map((usuarios: UsuarioProp) => {
          return {
            id: usuarios.id,
            usuario: usuarios.usuario,
            nombre: usuarios.nombre,
            email: usuarios.email,
            rol: usuarios.rol.nombre,
            rolID: usuarios.rol.id,
          };
        }),
        dataLoaded: true,
      });
    } catch (err) {
      console.error("Error al obtener los usuarios: ", err);
      const errorMessage = (err as Error)?.message || "Unknown error";
      set({ ...initialState, error: true, errorData: errorMessage });
    }
  },
  init: async () => {
    const state = get();
    if (!state.dataLoaded || state.error) {
      await state.execute();
    }
  },
}));
