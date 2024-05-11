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
import { Pacientes } from "pages/Panel/Pacientes/Pacientes";
import { Usuarios } from "pages/Panel/Usuarios/Usuarios";
import { TablaUsuarios } from "pages/Panel/Usuarios/TablaUsuarios";
import { ModalEditarUsuarios } from "pages/Panel/Usuarios/Modal";
import { Panel } from "pages/Panel/Panel";

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
            element: <Panel />,
          },

          {
            path: "usuarios",
            element: <Usuarios />,
            children: [
              {
                path: "tabla",
                element: <TablaUsuarios />,
                children: [
                  {
                    path: "editar/:id",
                    element: <ModalEditarUsuarios />,
                  },
                ],
              },

              {
                path: "rol",
                element: <h1>Rol</h1>,
              },
            ],
          },
          {
            path: "pacientes",
            element: <Pacientes />,
            children: [
              {
                path: "tabla",
                element: <h1>Pacientes</h1>,
              },
              {
                path: "profesion",
                element: <h1>Profesion</h1>,
              },
              {
                path: "genero",
                element: <h1>Genero</h1>,
              },
            ],
          },

          {
            path: "direcciones",
            element: <Direcciones />,
            children: [
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
