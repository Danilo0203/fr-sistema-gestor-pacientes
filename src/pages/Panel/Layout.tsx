import { Divider } from "@nextui-org/react";
import { BarraNavegacion } from "components/BarraNavegacion/Barra";
import { Header } from "components/Header/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useUsuarioStore } from "../../store/usuarios";
import { useEffect } from "react";

export const Layout = () => {
  const executeUser = useUsuarioStore((state) => state.init);
  useEffect(() => {
    executeUser();
  }, [executeUser]);
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
