import { create } from "zustand";
import api from "../../helpers/libs/axios";

type EstadoCivilStoreProps = {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: Array<T>;
  errorData: null;
  execute: () => void;
};

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
};

export const useEstadoCivilStore = create<EstadoCivilStoreProps>((set) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
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
      });
    } catch (err) {
      console.error("Error al obtener los estados civiles: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));
