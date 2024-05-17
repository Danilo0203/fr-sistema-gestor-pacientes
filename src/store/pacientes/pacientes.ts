import { create } from "zustand";
import api from "../../helpers/libs/axios";

type PacienteStoreProps = {
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

export const usePacienteStore = create<PacienteStoreProps>()((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state; // Si los datos ya están cargados, no hacer nada
      return { ...state, loading: true };
    });
    try {
      const pacientes = await api.get("/pacientes");
      set({
        ...initialState,
        success: true,
        data: pacientes.data.data.map((paciente: any) => {
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
        dataLoaded: true, // Se cargaron los datos
      });
    } catch (err) {
      console.error("Error al obtener los pacientes: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
  init: async () => {
    const state = get();
    if (!state.dataLoaded) {
      await state.execute();
    }
  },
}));
