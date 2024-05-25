import { useAuthStore } from "../../store/auth";
import { PanelAdmin } from "./Administrador/PanelAdmin";
import { PanelRecepcion } from "./Recepcionista/PanelRecepcion";
import { TablaAtender } from "./Recepcionista/PacientesAtender/TablaAtender";
import { TablaReceta } from "./Administrador/TablaReceta/TablaReceta";
import { TablaNoAtendidos } from "./Recepcionista/PacientesNoAtendidos/TablaNoAtendidos";

export const Panel = () => {
  const rol = useAuthStore(
    (state) => state.profile.rol.nombre,
  ).toLocaleLowerCase();

  if (rol === "administrador" || rol === "doctor") {
    return (
      <>
        <PanelAdmin />
        <TablaReceta />
      </>
    );
  } else {
    return (
      <>
        <PanelRecepcion>
          <TablaAtender />
          <TablaNoAtendidos />
        </PanelRecepcion>
      </>
    );
  }
};
