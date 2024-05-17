import { create } from "zustand";
import api from "../../helpers/libs/axios";

type MunicipioStoreProps = {
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

export const useMunicipioStore = create<MunicipioStoreProps>()((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state; // Si los datos ya están cargados, no hacer nada
      return { ...state, loading: true };
    });
    try {
      const municipios = await api.get("/municipios");
      set({
        ...initialState,
        success: true,
        data: municipios.data.data.map((municipio: any) => {
          return {
            id: municipio.id,
            nombre: municipio.nombre,
            departamento: municipio.departamento.nombre,
            departamentoID: municipio.departamento.id,
          };
        }),
        dataLoaded: true, // Se cargaron los datos
      });
    } catch (err) {
      console.error("Error al obtener los municipios: ", err);
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
