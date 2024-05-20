import { create } from "zustand";
import api from "../../helpers/libs/axios";

type Cita = {
  id: string;
  atender: number;
  paciente_id: string;
};

type PacienteStoreProps = {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: Cita[];
  errorData: string | null;
  dataLoaded: boolean;
  execute: () => Promise<void>;
  init: () => Promise<void>;
};

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const usePacienteCitasStore = create<PacienteStoreProps>((set, get) => ({
  ...initialState,
  execute: async () => {
    set({ loading: true });
    try {
      const citas = await api.get(`/citas/paciente`);
      set({
        loading: false,
        success: true,
        data: citas.data.data.map((cita: Cita) => {
          return {
            pacienteID: cita.paciente_id,
            atender: cita.atender,
          };
        }),
        dataLoaded: true,
      });
    } catch (err) {
      set({ loading: false, error: true, errorData: err.message });
    }
  },

  init: async () => {
    const state = get();
    if (!state.dataLoaded) {
      await state.execute();
    }
  },
}));
