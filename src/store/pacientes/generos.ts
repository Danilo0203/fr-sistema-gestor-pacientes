import { create } from "zustand";
import api from "../../helpers/libs/axios";

type GeneroStoreProps = {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: Array<T>;
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

export const useGeneroStore = create<GeneroStoreProps>((set) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const generos = await api.get("/generos");
      set({
        ...initialState,
        success: true,
        data: generos.data.data.map((genero: any) => {
          return {
            id: genero.id,
            nombre: genero.nombre,
          };
        }),
      });
    } catch (err) {
      console.error("Error al obtener los generos: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));
