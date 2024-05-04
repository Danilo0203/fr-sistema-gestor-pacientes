import { BarraNavegacion } from "components/BarraNavegacion/Barra";
import { Header } from "components/Header/Header";

import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div>
        <BarraNavegacion />
      </div>
      <div className="w-full">
        <Header />
        <Outlet />
      </div>
    </>
  );
};
