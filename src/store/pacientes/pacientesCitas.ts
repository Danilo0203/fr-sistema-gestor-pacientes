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
  updateCitaStatus: (id: string) => Promise<void>;
  init: (id: string) => Promise<void>;
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
      const pacientes = await api.get(`/cita/paciente`);
      set({
        loading: false,
        success: true,
        data: pacientes.data.data,
        dataLoaded: true,
      });
    } catch (err) {
      set({ loading: false, error: true, errorData: err.message });
    }
  },
  updateCitaStatus: async (id) => {
    try {
      const pacientes = await api.get(`/cita/paciente/${id}`);
      set({
        data: pacientes.data.data,
      });
    } catch (err) {
      console.error("Error al actualizar el estado de la cita: ", err);
    }
  },
  init: async () => {
    const state = get();
    if (!state.dataLoaded) {
      await state.execute();
    }
  },
}));
