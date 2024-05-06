import { useNavigate } from "react-router-dom";
import { BotonProps } from "types/index";

export const BotonRelleno = (props: BotonProps) => {
  const navigate = useNavigate();
  return (
    <button
      {...props}
      className="w-full rounded-full bg-azulFuerte py-2 text-lg font-semibold text-blanco"
      onClick={() => navigate("/registro")}
    >
      Crear cuenta
    </button>
  );
};
