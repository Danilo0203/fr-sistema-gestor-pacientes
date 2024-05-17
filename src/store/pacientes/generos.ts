import { create } from "zustand";
import api from "../../helpers/libs/axios";

type GeneroStoreProps = {
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

export const useGeneroStore = create<GeneroStoreProps>((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state; // Si los datos ya están cargados, no hacer nada
      return { ...state, loading: true };
    });
    try {
      const generos = await api.get("/generos");
      set({
        ...initialState,
        success: true,
        data: generos.data.data.map((genero: any) => {
          return {
            id: genero.id,
            nombre: genero.nombre,
          };
        }),
        dataLoaded: true, // Se cargaron los datos
      });
    } catch (err) {
      console.error("Error al obtener los generos: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
  init: async () => {
    const state = get();
    // console.log(state.dataLoaded);
    if (!state.dataLoaded) {
      await state.execute();
    }
  },
}));
