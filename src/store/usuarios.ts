import { create } from "zustand";
import api from "../helpers/libs/axios";

type UsuariosStoreProps = {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: string[];
  errorData: null;
  dataLoaded: boolean;
  execute: () => void;
  init: () => void;
};

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const useUsuarioStore = create<UsuariosStoreProps>()((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state; // Si los datos ya están cargados, no hacer nada
      return { ...state, loading: true };
    });
    try {
      const usuarios = await api.get("/usuarios");
      set({
        ...initialState,
        success: true,
        data: usuarios.data.data.map((usuarios: any) => {
          return {
            id: usuarios.id,
            usuario: usuarios.usuario,
            nombre: usuarios.nombre,
            email: usuarios.email,
            rol: usuarios.rol.nombre,
            rolID: usuarios.rol.id,
          };
        }),
        dataLoaded: true, // Se cargaron los datos
      });
    } catch (err) {
      console.error("Error al obtener los usuarios: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
  init: async () => {
    const state = get();
    console.log(state.error);
    if (!state.dataLoaded || state.error) {
      await state.execute();
    }
  },
}));
