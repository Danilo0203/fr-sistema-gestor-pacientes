import { Boton } from "components/ui/Botones/Boton";
import { BotonRelleno } from "components/ui/Botones/BotonRelleno";

export const BotonGroup = () => {
  return (
    <div className="flex items-center gap-5 pt-4">
      <BotonRelleno />
      <Boton />
    </div>
  );
};
