import { Boton } from "components/ui/Botones/Boton";
import { BotonRelleno } from "components/ui/Botones/BotonRelleno";
import { useLocation, useNavigate } from "react-router-dom";

export const BotonGroup = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onClickRegresar = () => {
    navigate(pathname === "/registro" ? "/inicio-sesion" : "/registro");
  };

  return (
    <div className="flex w-full items-center gap-5 self-center pt-4">
      <Boton onClick={onClickRegresar}> Regresar </Boton>
      <BotonRelleno type="submit" />
    </div>
  );
};
