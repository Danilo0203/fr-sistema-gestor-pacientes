import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { PacienteProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const usePacienteStore = create<StoreProps>()((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      // if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const pacientes = await api.get("/pacientes");
      set({
        ...initialState,
        success: true,

        data: pacientes.data.data.map((paciente: PacienteProp) => {
          return {
            id: paciente.id,
            nombre: paciente.nombre,
            apellido: paciente.apellido,
            fecha_nacimiento: paciente.fecha_nacimiento,
            genero: paciente.genero.nombre,
            generoID: paciente.genero.id,
            estadoCivil: paciente.estado_civil.nombre,
            estadoCivilID: paciente.estado_civil.id,
            profesion: paciente.profesion.nombre,
            profesionID: paciente.profesion.id,
            direccion: paciente.direccion.nombre,
            direccionID: paciente.direccion.id,
            municipio: paciente.direccion.municipio.nombre,
            municipioID: paciente.direccion.municipio.id,
          };
        }),
        dataLoaded: true,
      });
    } catch (err) {
      console.error("Error al obtener los pacientes: ", err);
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
