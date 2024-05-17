import { useEffect } from "react";
import { MyRoutes } from "./routes/routes";
import { useRolStore } from "./store/usuarios/roles";

export const App = () => {
  const init = useRolStore((state) => state.init);
  useEffect(() => {
    init();
  }, [init]);
  return <MyRoutes />;
};
