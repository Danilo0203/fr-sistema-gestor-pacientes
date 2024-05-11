import { create } from "zustand";
import api from "../helpers/libs/axios";

type UsuariosStoreProps = {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: string[];
  errorData: null;
  execute: () => void;
};

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
};

export const useUsuarioStore = create<UsuariosStoreProps>()((set) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
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
      });
    } catch (err) {
      console.error("Error al obtener los usuarios: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));
