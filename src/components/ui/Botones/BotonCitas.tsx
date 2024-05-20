import { Button } from "@nextui-org/react";
import { getCitasPaciente } from "helpers/api/pacientes/pacientes";
import { useState, useEffect } from "react";

export const BotonCitas = ({
  idPaciente,
  updateTable,
}: {
  idPaciente: string;
  updateTable: () => void;
}) => {
  const [statusCita, setStatusCita] = useState<string>("");

  const fetchAndSetCitaStatus = async (id: string) => {
    try {
      const citas = await getCitasPaciente(id);
      const estado = citas.data.atender;
      setStatusCita(estado === 1 ? "Activo" : "Inactivo");
    } catch (error) {
      console.error("Error fetching cita status:", error);
      // Manejar el error según sea necesario
    }
  };

  useEffect(() => {
    fetchAndSetCitaStatus(idPaciente);
  }, [idPaciente]);

  const handleCita = async () => {
    await fetchAndSetCitaStatus(idPaciente);
    updateTable();
  };

  return (
    <Button
      variant="flat"
      size="sm"
      color={statusCita === "Activo" ? "success" : "danger"}
      radius="full"
      onPress={handleCita}
      className="font-semibold text-black"
    >
      {statusCita}
    </Button>
  );
};
