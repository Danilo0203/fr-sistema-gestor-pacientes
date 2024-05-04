import { InicioSesion } from "pages/InicioSesion/InicioSesion";
import { Registro } from "pages/Registro/Registro";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Layout } from "pages/Panel/Layout";
import { Direcciones } from "pages/Panel/Direcciones";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    errorElement: <h1>Error 404</h1>,
    children: [
      {
        path: "/*",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Navigate to="panel" />,
          },
          {
            path: "panel",
            element: <h1>Panel</h1>,
          },
          {
            path: "rol",
            element: <h1>Rol</h1>,
          },
          {
            path: "pacientes",
            element: <h1>Pacientes</h1>,
          },
          {
            path: "profesion",
            element: <h1>Profesion</h1>,
          },
          {
            path: "direcciones",
            element: <Direcciones />,
            children: [
              {
                index: true,
                element: <h1>Direcciones</h1>,
              },
              {
                path: "municipio",
                element: <h1>Municipio</h1>,
              },
              {
                path: "departamento",
                element: <h1>Departamento</h1>,
              },
            ],
          },
          {
            path: "genero",
            element: <h1>Genero</h1>,
          },
        ],
      },
    ],
  },

  {
    path: "/*",
    element: <PublicRoute />,
    children: [
      {
        path: "inicio-sesion",
        element: <InicioSesion />,
      },
      {
        path: "registro",
        element: <Registro />,
      },
    ],
  },
]);

export const MyRoutes = () => <RouterProvider router={routes} />;
