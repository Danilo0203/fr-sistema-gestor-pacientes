import { create } from "zustand";
import api from "../../helpers/libs/axios";

type RecetasPacienteStoreProps = {
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

export const useRecetasPacienteStore = create<RecetasPacienteStoreProps>(
  (set, get) => ({
    ...initialState,
    execute: async () => {
      set((state) => {
        if (state.dataLoaded) return state; // Si los datos ya están cargados, no hacer nada
        return { ...state, loading: true };
      });
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
          dataLoaded: true, // Se cargaron los datos
        });
      } catch (err) {
        console.error("Error al obtener las recetas: ", err);
        set({ ...initialState, error: true, errorData: err.message });
      }
    },
    init: async () => {
      const state = get();
      if (!state.dataLoaded) {
        await state.execute();
      }
    },
  }),
);
