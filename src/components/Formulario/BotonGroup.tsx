import { Boton } from "components/ui/Botones/Boton";
import { BotonRelleno } from "components/ui/Botones/BotonRelleno";

export const BotonGroup = () => {
  return (
    <div className="flex w-full items-center gap-5 self-center pt-4">
      <Boton />
      <BotonRelleno />
    </div>
  );
};
