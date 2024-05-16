import { create } from "zustand";
import api from "../../helpers/libs/axios";

type RecetasPacienteStoreProps = {
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

export const useRecetasPacienteStore = create<RecetasPacienteStoreProps>(
  (set) => ({
    ...initialState,
    execute: async () => {
      set({ ...initialState, loading: true });
      try {
        const recetasPacientes = await api.get("/recetas-medicas-paciente");
        set({
          ...initialState,
          success: true,
          data: recetasPacientes.data.data.map((recetaPaciente: any) => {
            return {
              id: recetaPaciente.id,
              recetaFecha: recetaPaciente.receta.fecha,
              recetaID: recetaPaciente.receta.id,
              pacienteNombre: recetaPaciente.paciente.nombre,
              pacienteApellido: recetaPaciente.paciente.apellido,
              pacienteID: recetaPaciente.paciente.id,
              descripcion: recetaPaciente.descripcion,
            };
          }),
        });
      } catch (err) {
        console.error("Error al obtener las recetas: ", err);
        set({ ...initialState, error: true, errorData: err.message });
      }
    },
  }),
);
