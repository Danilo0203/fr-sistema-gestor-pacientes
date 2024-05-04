import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../src/store/auth";

export const PublicRoute = () => {
  const logged = useAuthStore((state) => state.logged);
  return logged ? <Navigate to="/panel" /> : <Outlet />;
};
