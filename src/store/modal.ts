import { create } from "zustand";

type ModalStoreProps = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

export const useModalStore = create<ModalStoreProps>()((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  onOpenChange: () => set((state) => ({ isOpen: !state.isOpen })),
}));
