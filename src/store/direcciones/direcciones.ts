import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { DireccionProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const useDireccionStore = create<StoreProps>()((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const direcciones = await api.get("/direcciones");
      set({
        ...initialState,
        success: true,
        data: direcciones.data.data.map((direcciones: DireccionProp) => {
          return {
            id: direcciones.id,
            nombre: direcciones.nombre,
            municipio: direcciones.municipio.nombre,
            municipioID: direcciones.municipio.id,
            departamento: direcciones.municipio.departamento.nombre,
            departamentoID: direcciones.municipio.departamento.id,
          };
        }),
        dataLoaded: true,
      });
    } catch (err) {
      console.error("Error al obtener los departamentos: ", err);
      const errorMessage = (err as Error)?.message || "Unknown error";
      set({ ...initialState, error: true, errorData: errorMessage });
    }
  },
  init: async () => {
    const state = get();

    if (!state.dataLoaded) {
      await state.execute();
    }
  },
}));
