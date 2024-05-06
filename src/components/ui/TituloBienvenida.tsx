import { TituloBienvenidaProps } from "types/index";

export const TituloBienvenida = ({ descripcion }: TituloBienvenidaProps) => {
  return (
    <div className="text-center leading-3">
      <h2 className="text-6xl font-bold uppercase text-azulFuerte">
        Bienvenido
      </h2>
      <span className="text-lg font-normal text-azulFuerte">{descripcion}</span>
    </div>
  );
};
