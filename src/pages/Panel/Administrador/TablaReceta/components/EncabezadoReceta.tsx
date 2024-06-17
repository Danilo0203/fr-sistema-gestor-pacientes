import { DateInput, Input, TimeInput } from "@nextui-org/react";
import { parseDate, parseAbsoluteToLocal } from "@internationalized/date";
import { format } from "@formkit/tempo";
import { usePacienteStore } from "../../../../../store/pacientes/pacientes";
import { useDatosMedicosPacientesStore } from "../../../../../store/datosMedicos/datosMedicosPaciente";
import { useAuthStore } from "../../../../../store/auth";
import { useCallback } from "react";
import { useDatosMedicosStore } from "../../../../../store/datosMedicos/datosMedicos";

export const EncabezadoReceta = ({ idPaciente, idReceta }) => {
  const date = new Date();
  const hoy = format(date, "YYYY-MM-DD");

  const isoDate = date.toISOString();

  const dataPacientes = usePacienteStore((state) => state.data);
  const dataMedicosPacientes = useDatosMedicosPacientesStore(
    (state) => state.data,
  );
  const usuario = useAuthStore((state) => state.profile);

  const datosMedicos = useDatosMedicosStore((state) => state.data);

  const nombreDatoMedico = datosMedicos.map((dato) => dato.nombre);

  const recetaPaciente = dataPacientes.find(
    (paciente) => paciente.id == idPaciente,
  );

  const edad =
    date.getFullYear() - +recetaPaciente?.fecha_nacimiento.slice(0, 4);

  const getDatosMedicosRecientes = useCallback(
    (idPaciente) => {
      const datos = dataMedicosPacientes.filter(
        (dato) => dato.pacienteID == idPaciente,
      );

      if (datos.length === 0) {
        return [];
      }

      const datosOrdenados = datos.sort(
        (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion),
      );

      const datosRecientes = nombreDatoMedico
        .map((nombre) => {
          const datoReciente = datosOrdenados.find(
            (dato) => dato.datoMedico === nombre,
          );

          return datoReciente
            ? {
                id: datoReciente.datoMedicoID,
                datoMedico: datoReciente.datoMedico,
                fecha: datoReciente.fecha,
                valor: datoReciente.valor,
              }
            : null;
        })
        .filter(Boolean);

      return datosRecientes;
    },
    [dataMedicosPacientes, nombreDatoMedico],
  );
  const datosMedicosPaciente = getDatosMedicosRecientes(idPaciente);

  return (
    <>
      <div className="mt-8 flex items-end justify-between gap-5">
        <h2 className="text-2xl font-medium">Receta Medica, No: {idReceta}</h2>
        <div className="flex gap-5">
          <DateInput
            className="w-fit"
            label="Fecha"
            variant="underlined"
            isReadOnly
            defaultValue={parseDate(hoy)}
          />
          <TimeInput
            className="w-fit"
            isReadOnly
            granularity="second"
            label="Hora"
            variant="underlined"
            value={parseAbsoluteToLocal(isoDate)}
          />
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-4">
        <div className="flex gap-10">
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Nombre:"
            variant="underlined"
            defaultValue={recetaPaciente?.nombre}
            className="max-w-xs"
          />
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Apellido:"
            variant="underlined"
            defaultValue={recetaPaciente?.apellido}
            className="max-w-xs"
          />
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Originario:"
            variant="underlined"
            defaultValue={recetaPaciente?.municipio}
            className="max-w-xs"
          />
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Edad:"
            variant="underlined"
            defaultValue={`${edad.toString()} años`}
            className="max-w-xs"
          />
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Genero:"
            variant="underlined"
            defaultValue={recetaPaciente?.genero}
            className="max-w-xs"
          />
        </div>
        <div className="mt-3 flex gap-4">
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Estado Civil:"
            variant="underlined"
            defaultValue={recetaPaciente?.estadoCivil}
            className="max-w-xs"
          />
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Direccion:"
            variant="underlined"
            defaultValue={recetaPaciente?.direccion}
            classNames={{
              mainWrapper: ["w-11/12", "max-w-xs"],
            }}
          />
        </div>
        <div className="flex gap-2">
          {datosMedicosPaciente.map((dato) => (
            <Input
              key={dato.id}
              labelPlacement="outside-left"
              isReadOnly
              label={dato.datoMedico}
              variant="underlined"
              defaultValue={`${dato.valor} ${dato.datoMedico === "Peso" ? "LBS" : "MTS"}`}
              className="max-w-xs"
            />
          ))}
        </div>
        <div className="mt-3 flex gap-4">
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Remitido por:"
            variant="underlined"
            defaultValue={usuario?.usuario}
            className="max-w-xs"
          />
        </div>
      </div>
    </>
  );
};
