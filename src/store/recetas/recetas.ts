import { create } from "zustand";
import api from "../../helpers/libs/axios";

type RecetasStoreProps = {
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

export const useRecetasStore = create<RecetasStoreProps>((set) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const recetas = await api.get("/recetas-medicas");
      set({
        ...initialState,
        success: true,
        data: recetas.data.data.map((receta: any) => {
          return {
            id: receta.id,
            fecha: receta.fecha,
            usuario: receta.usuario.nombre,
            usuarioID: receta.usuario.id,
          };
        }),
      });
    } catch (err) {
      console.error("Error al obtener las recetas: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));
