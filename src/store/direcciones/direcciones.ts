import { create } from "zustand";
import api from "../../helpers/libs/axios";

type DireccionStoreProps = {
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

export const useDireccionStore = create<DireccionStoreProps>()((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state; // Si los datos ya están cargados, no hacer nada
      return { ...state, loading: true };
    });
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
        dataLoaded: true, // Se cargaron los datos
      });
    } catch (err) {
      console.error("Error al obtener los departamentos: ", err);
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
