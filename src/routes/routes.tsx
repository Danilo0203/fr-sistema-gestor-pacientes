import { InicioSesion } from "pages/InicioSesion/InicioSesion";
import { Registro } from "pages/Registro/Registro";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/inicio-sesion" />,
    errorElement: <h1>Error 404</h1>,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/inicio-sesion",
    element: <InicioSesion />,
  },
]);

export const MyRoutes = () => <RouterProvider router={routes} />;
