import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { MunicipioProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const useMunicipioStore = create<StoreProps>()((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const municipios = await api.get("/municipios");
      set({
        ...initialState,
        success: true,
        data: municipios.data.data.map((municipio: MunicipioProp) => {
          return {
            id: municipio.id,
            nombre: municipio.nombre,
            departamento: municipio.departamento.nombre,
            departamentoID: municipio.departamento.id,
          };
        }),
        dataLoaded: true,
      });
    } catch (err) {
      console.error("Error al obtener los municipios: ", err);
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
