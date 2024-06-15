import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { DatosMedicosPacienteProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const useDatosMedicosPacientesStore = create<StoreProps>((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const datosMedicos = await api.get("/datos-medicos-paciente");

      set({
        ...initialState,
        success: true,
        data: datosMedicos.data.data.map(
          (datoMedico: DatosMedicosPacienteProp) => {
            return {
              id: datoMedico.id,
              fecha: datoMedico.fecha,
              datoMedico: datoMedico.dato_medico.nombre,
              datoMedicoID: datoMedico.dato_medico.id,
              paciente: datoMedico.paciente.nombre,
              pacienteID: datoMedico.paciente.id,
              valor: datoMedico.valor,
              fechaCreacion: datoMedico.created_at,
            };
          },
        ),
        dataLoaded: true,
      });
    } catch (err) {
      console.error("Error al obtener los datos medicos: ", err);
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
