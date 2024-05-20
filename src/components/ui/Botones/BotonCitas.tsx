import { Button } from "@nextui-org/react";
import { getCitasPaciente } from "helpers/api/pacientes/pacientes";

export const BotonCitas = ({
  idPaciente,
  boton,
  updateTable,
  updateCita,
}: {
  idPaciente: string;
  updateTable: () => void;
  updateCita: () => void;
}) => {
  const handleCita = async () => {
    await getCitasPaciente(idPaciente);
    updateTable();
    updateCita();
  };

  return (
    <Button
      variant="flat"
      size="sm"
      color={boton === "Activo" ? "success" : "danger"}
      radius="full"
      onPress={handleCita}
      className="font-semibold text-black"
    >
      {boton}
    </Button>
  );
};
