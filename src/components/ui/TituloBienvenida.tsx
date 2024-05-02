import { TituloBienvenidaProps } from "types/index";

export const TituloBienvenida = ({ descripcion }: TituloBienvenidaProps) => {
  return (
    <div className="text-center">
      <h2 className="text-5xl font-bold uppercase text-azulFuerte">
        Bienvenido
      </h2>
      <span className="font-normal text-azulFuerte"> {descripcion} </span>
    </div>
  );
};
