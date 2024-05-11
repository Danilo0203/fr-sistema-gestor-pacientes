import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../src/store/auth";

export const PrivateRoute = () => {
  const logged = useAuthStore((state) => state.logged);

  return logged ? <Outlet /> : <Navigate to="/inicio-sesion" />;
};
