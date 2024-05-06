import { Divider } from "@nextui-org/react";
import { BarraNavegacion } from "components/BarraNavegacion/Barra";
import { Header } from "components/Header/Header";

import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <section className="flex">
        <div>
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
