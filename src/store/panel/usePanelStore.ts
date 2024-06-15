import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { PanelStoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  dataPacientes: [],
  dataAtendidos: [],
  dataNoAtendidos: [],
  errorData: null,
  dataLoaded: false,
};

export const usePanelStore = create<PanelStoreProps>((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      // if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const panelPacientes = await api.get("/panel");

      set({
        ...initialState,
        success: true,
        dataPacientes: panelPacientes?.data.pacientes.data,
        dataAtendidos: panelPacientes?.data.pacientes_atendidos_hoy.data,
        dataNoAtendidos: panelPacientes?.data.pacientes_por_atender.data,
        dataLoaded: true,
      });
    } catch (err) {
      console.error("Error al obtener las recetas: ", err);
      const errorMessage = (err as Error)?.message || "Unknown error";

      set({ ...initialState, error: true, errorData: errorMessage });
    }
  },
  init: async () => {
    const state = get();
    if (!state.loading) {
      await state.execute();
    }
  },
}));
