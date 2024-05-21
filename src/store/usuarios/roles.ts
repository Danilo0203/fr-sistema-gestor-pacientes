import { create } from "zustand";
import api from "../../helpers/libs/axios";
import { RolProp, StoreProps } from "types/index";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: [],
  errorData: null,
  dataLoaded: false,
};

export const useRolStore = create<StoreProps>()((set, get) => ({
  ...initialState,
  execute: async () => {
    set((state) => {
      if (state.dataLoaded) return state;
      return { ...state, loading: true };
    });
    try {
      const roles = await api.get("/roles");
      set({
        ...initialState,
        success: true,
        data: roles.data.data.map((roles: RolProp) => {
          return {
            id: roles.id,
            nombre: roles.nombre,
            descripcion: roles.descripcion,
          };
        }),
        dataLoaded: true,
      });
    } catch (err) {
      console.error("Error al obtener los roles: ", err);
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
