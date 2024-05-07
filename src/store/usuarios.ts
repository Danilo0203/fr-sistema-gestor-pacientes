import { create } from "zustand";

type UsuariosStoreProps = {
  tablaUsuarios: [];
  setTablaUsuarios: (tablaUsuarios: []) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  usuarioId: [];
  setUsuarioId: (usuarioId: []) => void;
};

export const useUsuarioStore = create<UsuariosStoreProps>()((set) => ({
  tablaUsuarios: [],
  setTablaUsuarios: (tablaUsuarios: []) => set({ tablaUsuarios }),
  loading: true,
  setLoading: (loading: boolean) => set({ loading }),
  usuarioId: [],
  setUsuarioId: (usuarioId: []) => set({ usuarioId }),
}));
