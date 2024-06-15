import { DateInput, Input, Spinner, TimeInput } from "@nextui-org/react";
import { parseDate, parseAbsoluteToLocal } from "@internationalized/date";
import { format } from "@formkit/tempo";
import { usePacienteStore } from "../../../../../store/pacientes/pacientes";
import { useDatosMedicosPacientesStore } from "../../../../../store/datosMedicos/datosMedicosPaciente";
import { useAuthStore } from "../../../../../store/auth";
import { useCallback } from "react";
import { useCrearRecetaStore } from "../../../../../store/recetas/recetas";

export const EncabezadoReceta = ({ idPaciente, idReceta }) => {
  const date = new Date();
  const hoy = format(date, "YYYY-MM-DD");
  const isoDate = date.toISOString();

  const dataPacientes = usePacienteStore((state) => state.data);
  const dataMedicosPacientes = useDatosMedicosPacientesStore(
    (state) => state.data,
  );
  const usuario = useAuthStore((state) => state.profile);

  // Funcion que me devuelva el dato del peso o altura segun el id del paciente
  const getPesoAltura = useCallback(
    (idPaciente: string) => {
      const datos = dataMedicosPacientes.filter(
        (dato) => dato.pacienteID == idPaciente,
      );

      if (datos.length === 0) {
        return { peso: null, altura: null };
      }

      const datosOrdenados = datos.sort(
        (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion),
      );

      const pesoMasReciente = datosOrdenados.find(
        (dato) => dato.datoMedicoID === 4,
      ); // Suponiendo que '2' es el ID para peso
      const alturaMasReciente = datosOrdenados.find(
        (dato) => dato.datoMedicoID === 2,
      ); // Suponiendo que '4' es el ID para altura

      return {
        peso: pesoMasReciente
          ? {
              id: pesoMasReciente.datoMedicoID,
              datoMedico: "Peso",
              fecha: pesoMasReciente.fecha,
              dato: pesoMasReciente.valor,
            }
          : null,
        altura: alturaMasReciente
          ? {
              id: alturaMasReciente.datoMedicoID,
              datoMedico: "Altura",
              fecha: alturaMasReciente.fecha,
              dato: alturaMasReciente.valor,
            }
          : null,
      };
    },
    [dataMedicosPacientes],
  );

  const datosMedicosPaciente = getPesoAltura(idPaciente);

  const recetaPaciente = dataPacientes.find(
    (paciente) => paciente.id == idPaciente,
  );

  const edad =
    date.getFullYear() - +recetaPaciente?.fecha_nacimiento.slice(0, 4);

  

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
          {datosMedicosPaciente.peso && (
            <Input
              labelPlacement="outside-left"
              isReadOnly
              label={datosMedicosPaciente.peso.datoMedico}
              variant="underlined"
              defaultValue={`${datosMedicosPaciente.peso.dato} LBS`}
              className="max-w-xs"
            />
          )}
          {datosMedicosPaciente.altura && (
            <Input
              labelPlacement="outside-left"
              isReadOnly
              label={datosMedicosPaciente.altura.datoMedico}
              variant="underlined"
              defaultValue={`${datosMedicosPaciente.altura.dato} MTS`}
              className="max-w-xs"
            />
          )}
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
