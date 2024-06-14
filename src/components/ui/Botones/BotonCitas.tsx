import { Button } from "@nextui-org/react";
import { getCitasPaciente } from "helpers/api/pacientes/pacientes";

export const BotonCitas = ({
  idPaciente,
  boton,
  updateTable,
  updateCita,
  updateRecepcion,
}: {
  idPaciente: string;
  updateTable: () => void;
  updateCita: () => void;
  updateRecepcion: () => void;
  boton: string;
}) => {
  const handleCita = async () => {
    await getCitasPaciente(idPaciente);
    setTimeout(() => {
      updateTable();
      updateCita();
      updateRecepcion();
    }, 1000);
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
