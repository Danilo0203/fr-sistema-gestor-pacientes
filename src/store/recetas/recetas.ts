import { create } from "zustand";
import api from "../../helpers/libs/axios";

type RecetasStoreProps = {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: Array<T>;
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

export const useRecetasStore = create<RecetasStoreProps>((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state; // Si los datos ya están cargados, no hacer nada
      return { ...state, loading: true };
    });
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
        dataLoaded: true, // Se cargaron los datos
      });
    } catch (err) {
      console.error("Error al obtener las recetas: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
  init: async () => {
    const state = get();
    if (!state.dataLoaded) {
      await state.execute();
    }
  },
}));
