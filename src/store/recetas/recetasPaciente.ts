import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { RecetasPacienteProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const useRecetasPacienteStore = create<StoreProps>((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const recetasPacientes = await api.get("/recetas-medicas-paciente");
      set({
        ...initialState,
        success: true,
        data: recetasPacientes.data.data.map(
          (recetaPaciente: RecetasPacienteProp) => {
            return {
              id: recetaPaciente.id,
              recetaFecha: recetaPaciente.receta.fecha,
              recetaID: recetaPaciente.receta.id,
              pacienteNombre: recetaPaciente.paciente.nombre,
              pacienteApellido: recetaPaciente.paciente.apellido,
              pacienteID: recetaPaciente.paciente.id,
              descripcion: recetaPaciente.descripcion,
            };
          },
        ),
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
    if (!state.dataLoaded) {
      await state.execute();
    }
  },
}));
