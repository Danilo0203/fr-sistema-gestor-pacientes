import { create } from "zustand";
import api from "../../helpers/libs/axios";

type EstadoCivilStoreProps = {
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

export const useEstadoCivilStore = create<EstadoCivilStoreProps>(
  (set, get) => ({
    ...initialState,
    execute: async () => {
      set((state) => {
        if (state.dataLoaded) return state; // Si los datos ya están cargados, no hacer nada
        return { ...state, loading: true };
      });
      try {
        const estadoCivil = await api.get("/estado-civil");
        set({
          ...initialState,
          success: true,
          data: estadoCivil.data.data.map((estado: any) => {
            return {
              id: estado.id,
              nombre: estado.nombre,
            };
          }),
          dataLoaded: true, // Se cargaron los datos
        });
      } catch (err) {
        console.error("Error al obtener los estados civiles: ", err);
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
