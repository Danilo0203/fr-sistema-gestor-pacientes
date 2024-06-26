import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { RecetasProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const useRecetasStore = create<StoreProps>((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const recetas = await api.get("/recetas-medicas");
      set({
        ...initialState,
        success: true,
        data: recetas.data.data.map((receta: RecetasProp) => {
          return {
            id: receta.id,
            fecha: receta.fecha,
            usuario: receta.usuario.nombre,
            usuarioID: receta.usuario.id,
          };
        }),
        dataLoaded: true,
      });
    } catch (err) {
      console.error("Error al obtener las recetas: ", err);
      const errorMessage = (err as Error)?.message || "Unknown error";
      set({ ...initialState, error: true, errorData: errorMessage });
    }
  },
  init: async () => {
    const state = get();
    if (!state.dataLoaded) {
      await state.execute();
    }
  },
}));

interface CreateRecetaMedica {
  execute: (req: unknown) => Promise<void>;
  loading: boolean;
  loadingDelete: boolean;
  success: boolean;
  error: boolean;
  errorData: string;
  eliminarReceta: (id: string) => Promise<void>;
}

const initialStateCreateRecetaMedica = {
  loading: false,
  loadingDelete: false,
  success: false,
  error: false,
  errorData: "",
};

export const useCrearRecetaStore = create<CreateRecetaMedica>((set, get) => ({
  ...initialStateCreateRecetaMedica,
  execute: async (req: unknown) => {
    set({ ...initialStateCreateRecetaMedica, loading: true });
    try {
      await api.post("/recetas-medicas", req);
      set({ ...initialStateCreateRecetaMedica, success: true });
    } catch (err) {
      console.error("Error al crear la receta: ", err);
      const errorMessage = (err as Error)?.message || "Unknown error";
      set({
        ...initialStateCreateRecetaMedica,
        error: true,
        errorData: errorMessage,
      });
    }
  },
  eliminarReceta: async (id: string) => {
    set({ ...initialStateCreateRecetaMedica, loadingDelete: true });
    try {
      await api.delete(`/recetas-medicas/${id}`);
      set({ ...initialStateCreateRecetaMedica, success: true });
    } catch (err) {
      console.error("Error al eliminar la receta: ", err);
      const errorMessage = (err as Error)?.message || "Unknown error";
      set({
        ...initialStateCreateRecetaMedica,
        error: true,
        errorData: errorMessage,
      });
    }
  },
}));
