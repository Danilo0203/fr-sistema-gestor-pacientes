import { create } from "zustand";
import api from "../../helpers/libs/axios";

type DatosMedicosPacienteStoreProps = {
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

export const useDatosMedicosStore = create<DatosMedicosPacienteStoreProps>((set) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const datosMedicos = await api.get("/datos-medicos-paciente");
      set({
        ...initialState,
        success: true,
        data: datosMedicos.data.data.map((datoMedico: any) => {
          return {
            id: datoMedico.id,
            fecha: datoMedico.fecha,
            datoMedico: datoMedico.dato_medico.nombre,
            datoMedicoID: datoMedico.dato_medico.id,
            paciente: datoMedico.paciente.nombre,
            pacienteID: datoMedico.paciente.id,
            valor: datoMedico.valor,
          };
        }),
      });
    } catch (err) {
      console.error("Error al obtener los datos medicos: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));
