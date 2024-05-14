import { create } from "zustand";
import api from "../../helpers/libs/axios";

type ProfesionStoreProps = {
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

export const useProfesionStore = create<ProfesionStoreProps>((set) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
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
      });
    } catch (err) {
      console.error("Error al obtener las profesiones: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));
