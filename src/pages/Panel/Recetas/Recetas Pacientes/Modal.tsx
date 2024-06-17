import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export const BtnVerRecetaPaciente = ({ idReceta, idUsuario }) => {
  const navigate = useNavigate();
  const handleRecetaPaciente = () => {
    navigate(`/recetas-medicas/paciente/${idReceta}/${idUsuario}`);
  };
  return (
    <>
      <Button
        className="bg-azulFuerte text-white"
        onPress={handleRecetaPaciente}
      >
        Ver Receta
      </Button>
    </>
  );
};
