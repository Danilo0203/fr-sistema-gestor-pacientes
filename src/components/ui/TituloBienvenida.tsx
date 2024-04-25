import { TituloBienvenidaProps } from "types/index";

export const TituloBienvenida = ({ descripcion }: TituloBienvenidaProps) => {
  return (
    <>
      <h2>Bienvenido</h2>
      <span> {descripcion} </span>
    </>
  );
};
