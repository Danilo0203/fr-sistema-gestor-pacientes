import { Registro } from "pages/Registro/Registro";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Registro />,
    errorElement: <h1>Error 404</h1>,
  },
]);

export const MyRoutes = () => <RouterProvider router={routes} />;
