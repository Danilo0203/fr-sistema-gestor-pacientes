import { BotonProps } from "types/index";

export const Boton = ({ children, ...props }: BotonProps) => {
  return (
    <button
      {...props}
      className="w-full rounded-full py-4 text-xl font-semibold text-azulFuerte ring-2 ring-azulFuerte "
    >
      {children || "Iniciar sesión"}
    </button>
  );
};
