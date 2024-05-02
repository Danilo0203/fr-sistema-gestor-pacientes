import { BotonProps } from "types/index";

export const BotonRelleno = (props: BotonProps) => {
  return (
    <button
      {...props}
      className="w-full rounded-full bg-azulFuerte py-3 text-xl font-semibold text-blanco"
    >
      Crear cuenta
    </button>
  );
};
