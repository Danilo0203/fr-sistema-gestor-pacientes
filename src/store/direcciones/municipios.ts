import { create } from "zustand";
import api from "../../helpers/libs/axios";

type MunicipioStoreProps = {
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

export const useMunicipioStore = create<MunicipioStoreProps>()((set) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
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
      });
    } catch (err) {
      console.error("Error al obtener los municipios: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));
