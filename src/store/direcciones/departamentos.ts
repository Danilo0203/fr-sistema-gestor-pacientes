import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { DepartamentoProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const useDepartamentoStore = create<StoreProps>()((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const departamentos = await api.get("/departamentos");
      set({
        ...initialState,
        success: true,
        data: departamentos.data.data.map((departamentos: DepartamentoProp) => {
          return {
            id: departamentos.id,
            nombre: departamentos.nombre,
          };
        }),
        dataLoaded: true,
      });
    } catch (err) {
      console.error("Error al obtener los departamentos: ", err);
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
