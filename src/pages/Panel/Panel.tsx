import { useAuthStore } from "../../store/auth";
import { PanelAdmin } from "./Administrador/PanelAdmin";
import { PanelRecepcion } from "./Recepcionista/PanelRecepcion";
import { TablaAtender } from "./Recepcionista/PacientesAtender/TablaAtender";
import { TablaNoAtendidos } from "./Recepcionista/PacientesNoAtendidos/TablaNoAtendidos";
import {
  ActualizarDatosMedicos,
  AtenderPaciente,
} from "./Recepcionista/PacientesAtender/Modal";
import { Outlet, useLocation } from "react-router-dom";

export const Panel = () => {
  const rol = useAuthStore(
    (state) => state.profile.rol.nombre,
  ).toLocaleLowerCase();
  const { pathname } = useLocation();

  if (rol === "administrador" || rol === "doctor") {
    return (
      <>
        <PanelAdmin>
          {pathname.includes("/panel/atender/") ? (
            <Outlet />
          ) : (
            <TablaAtender BotonAcciones={AtenderPaciente} />
          )}
        </PanelAdmin>
      </>
    );
  } else {
    return (
      <>
        <PanelRecepcion>
          <TablaAtender BotonAcciones={ActualizarDatosMedicos} />
          <TablaNoAtendidos />
        </PanelRecepcion>
      </>
    );
  }
};
