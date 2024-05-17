import { useAuthStore } from "../../store/auth";
import { PanelAdmin } from "./Administrador/PanelAdmin";
import { PanelRecepcion } from "./Recepcionista/PanelRecepcion";

export const Panel = () => {
  const rol = useAuthStore(
    (state) => state.profile.rol.nombre,
  ).toLocaleLowerCase();

  if (rol === "administrador" || rol === "doctor") {
    return <PanelAdmin />;
  } else {
    return <PanelRecepcion />;
  }
};
