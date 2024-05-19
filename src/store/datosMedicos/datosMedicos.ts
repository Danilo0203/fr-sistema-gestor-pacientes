import { create } from "zustand";
import api from "../../helpers/libs/axios";

type DatosMedicosStoreProps = {
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

export const useDatosMedicosStore = create<DatosMedicosStoreProps>(
  (set, get) => ({
    ...initialState,
    execute: async () => {
      set((state) => {
        if (state.dataLoaded) return state; // Si los datos ya están cargados, no hacer nada
        return { ...state, loading: true };
      });
      try {
        const datosMedicos = await api.get("/datos-medicos");
        set({
          ...initialState,
          success: true,
          data: datosMedicos.data.data.map((datoMedico: any) => {
            return {
              id: datoMedico.id,
              nombre: datoMedico.nombre,
            };
          }),
          dataLoaded: true, // Se cargaron los datos
        });
      } catch (err) {
        console.error("Error al obtener los datos medicos: ", err);
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