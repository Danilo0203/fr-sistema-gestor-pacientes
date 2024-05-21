import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { ProfesionProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const useProfesionStore = create<StoreProps>((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const profesiones = await api.get("/profesiones");
      set({
        ...initialState,
        success: true,
        data: profesiones.data.data.map((profesion: ProfesionProp) => {
          return {
            id: profesion.id,
            nombre: profesion.nombre,
          };
        }),
        dataLoaded: true,
      });
    } catch (err) {
      console.error("Error al obtener las profesiones: ", err);
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
