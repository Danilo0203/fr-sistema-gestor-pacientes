import { create } from "zustand";
import api from "../../helpers/libs/axios";

type DepartamentoStoreProps = {
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

export const useDepartamentoStore = create<DepartamentoStoreProps>()(
  (set, get) => ({
    ...initialState,
    execute: async () => {
      set((state) => {
        if (state.dataLoaded) return state; // Si los datos ya están cargados, no hacer nada
        return { ...state, loading: true };
      });
      try {
        const departamentos = await api.get("/departamentos");
        set({
          ...initialState,
          success: true,
          data: departamentos.data.data.map((departamentos: any) => {
            return {
              id: departamentos.id,
              nombre: departamentos.nombre,
            };
          }),
          dataLoaded: true, // Se cargaron los datos
        });
      } catch (err) {
        console.error("Error al obtener los departamentos: ", err);
        set({ ...initialState, error: true, errorData: err.message });
      }
    },
    init: async () => {
      const state = get();
      if (!state.dataLoaded) {
        await state.execute();
      }
    },
  }),
);
