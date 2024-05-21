import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { CitaProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const usePacienteCitasStore = create<StoreProps>((set, get) => ({
  ...initialState,
  execute: async () => {
    set({ loading: true });
    try {
      const citas = await api.get(`/citas/paciente`);
      set({
        loading: false,
        success: true,
        data: citas.data.data.map((cita: CitaProp) => {
          return {
            pacienteID: cita.paciente_id,
            atender: cita.atender,
          };
        }),
        dataLoaded: true,
      });
    } catch (err) {
      const errorMessage = (err as Error)?.message || "Unknown error";
      console.log("Error al obtener las citas del paciente: ", errorMessage);
      set({ loading: false, error: true, errorData: errorMessage });
    }
  },

  init: async () => {
    const state = get();
    if (!state.dataLoaded) {
      await state.execute();
    }
  },
}));
