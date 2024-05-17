import { create } from "zustand";
import api from "../../helpers/libs/axios";

type RolesStoreProps = {
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

export const useRolStore = create<RolesStoreProps>()((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state; // Si los datos ya están cargados, no hacer nada
      return { ...state, loading: true };
    });
    try {
      const roles = await api.get("/roles");
      set({
        ...initialState,
        success: true,
        data: roles.data.data.map((roles: any) => {
          return {
            id: roles.id,
            nombre: roles.nombre,
            descripcion: roles.descripcion,
          };
        }),
        dataLoaded: true, // Se cargaron los datos
      });
    } catch (err) {
      console.error("Error al obtener los roles: ", err);
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
