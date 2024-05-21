import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { GeneroProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const useGeneroStore = create<StoreProps>((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const generos = await api.get("/generos");
      set({
        ...initialState,
        success: true,
        data: generos.data.data.map((genero: GeneroProp) => {
          return {
            id: genero.id,
            nombre: genero.nombre,
          };
        }),
        dataLoaded: true,
      });
    } catch (err) {
      console.error("Error al obtener los generos: ", err);
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
