import { create } from "zustand";
import api from "../../helpers/libs/axios";

type DireccionStoreProps = {
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

export const useDireccionStore = create<DireccionStoreProps>()((set) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const direcciones = await api.get("/direcciones");
      set({
        ...initialState,
        success: true,
        data: direcciones.data.data.map((direcciones: any) => {
          return {
            id: direcciones.id,
            nombre: direcciones.nombre,
            municipio: direcciones.municipio.nombre,
            municipioID: direcciones.municipio.id,
            departamento: direcciones.municipio.departamento.nombre,
            departamentoID: direcciones.municipio.departamento.id,
          };
        }),
      });
    } catch (err) {
      console.error("Error al obtener los departamentos: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));
