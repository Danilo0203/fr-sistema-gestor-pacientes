import { Divider } from "@nextui-org/react";
import { BarraNavegacion } from "components/BarraNavegacion/Barra";
import { Header } from "components/Header/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useUsuarioStore } from "../../store/usuarios";
import { useEffect } from "react";
import { useDatosMedicosPacientesStore } from "../../store/datosMedicos/datosMedicosPaciente";
import { useRecetasStore } from "../../store/recetas/recetas";

export const Layout = () => {
  const executeUser = useUsuarioStore((state) => state.init);
  const initDatosMedicosPacientes = useDatosMedicosPacientesStore(
    (state) => state.execute,
  );
  const initRecetaMedica = useRecetasStore((state) => state.init);

  useEffect(() => {
    initRecetaMedica();
    initDatosMedicosPacientes();
    executeUser();
  }, [executeUser, initDatosMedicosPacientes, initRecetaMedica]);
  return (
    <>
      <Toaster
        visibleToasts={8}
        closeButton
        expand
        position="top-center"
        richColors
      />
      <section className="flex min-h-dvh">
        <div className="flex">
          <BarraNavegacion />
        </div>
        <div className="w-full">
          <Header />
          <Divider />
          <Outlet />
        </div>
      </section>
    </>
  );
};
