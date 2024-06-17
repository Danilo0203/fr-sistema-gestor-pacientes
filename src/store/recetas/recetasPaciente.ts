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
    try {
      const recetasPacientes = await api.get("/recetas-medicas-paciente");
      const recetas = await api.get("/recetas-medicas");

      // Funcion que devuelva el id del usuario segun el id de la receta de array de receta y recetaPaciente, no tengo el id del usuario en recetaPaciente
      const usuario = recetasPacientes.data.data.map((receta) => {
        return {
          recetaID: receta.receta.id,
          usuarioID: recetas.data.data.find(
            (recetaUsuario) => recetaUsuario.id === receta.receta.id,
          )?.usuario.id,
        };
      });

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
              createdAt: recetaPaciente.created_at,
              usuarioID: usuario.find(
                (usuario) => usuario.recetaID === recetaPaciente.receta.id,
              )?.usuarioID,
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
