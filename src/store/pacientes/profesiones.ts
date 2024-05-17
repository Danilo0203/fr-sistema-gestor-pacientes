import { create } from "zustand";
import api from "../../helpers/libs/axios";

type ProfesionStoreProps = {
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

export const useProfesionStore = create<ProfesionStoreProps>((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state; // Si los datos ya están cargados, no hacer nada
      return { ...state, loading: true };
    });
    try {
      const profesiones = await api.get("/profesiones");
      set({
        ...initialState,
        success: true,
        data: profesiones.data.data.map((profesion: any) => {
          return {
            id: profesion.id,
            nombre: profesion.nombre,
          };
        }),
        dataLoaded: true, // Se cargaron los datos
      });
    } catch (err) {
      console.error("Error al obtener las profesiones: ", err);
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
