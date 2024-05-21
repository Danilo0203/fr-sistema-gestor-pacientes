import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { EstadoCivilProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const useEstadoCivilStore = create<StoreProps>((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const estadoCivil = await api.get("/estado-civil");
      set({
        ...initialState,
        success: true,
        data: estadoCivil.data.data.map((estado: EstadoCivilProp) => {
          return {
            id: estado.id,
            nombre: estado.nombre,
          };
        }),
        dataLoaded: true,
      });
    } catch (err) {
      console.error("Error al obtener los estados civiles: ", err);
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
