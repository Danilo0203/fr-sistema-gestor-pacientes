import { BotonProps } from "types/index";

export const Boton = (props: BotonProps) => {
  return (
    <button
      {...props}
      className="w-full rounded-full border-2 border-azulFuerte py-3 text-xl font-semibold text-azulFuerte"
    >
      Iniciar Sesión
    </button>
  );
};
