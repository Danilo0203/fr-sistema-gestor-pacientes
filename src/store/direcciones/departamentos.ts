import { create } from "zustand";
import api from "../../helpers/libs/axios";

type DepartamentoStoreProps = {
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

export const useDepartamentoStore = create<DepartamentoStoreProps>()((set) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
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
      });
    } catch (err) {
      console.error("Error al obtener los departamentos: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));
