import { create } from "zustand";
import api from "../../helpers/libs/axios";

type RolesStoreProps = {
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

export const useRolStore = create<RolesStoreProps>()((set) => ({
  ...initialState,
  execute: async () => {
    set({ ...initialState, loading: true });
    try {
      const roles = await api.get("/roles");
      set({
        ...initialState,
        success: true,
        data: roles.data.data.map((roles: any) => {
          return {
            id: roles.id,
            nombre: roles.nombre,
            descripcion: roles.descripcion,
          };
        }),
      });
    } catch (err) {
      console.error("Error al obtener los roles: ", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
}));
