import { DateInput, Input, Spinner, TimeInput } from "@nextui-org/react";
import {
  parseDate,
  parseAbsoluteToLocal,
  CalendarDate,
} from "@internationalized/date";
import { useCallback, useEffect, useState } from "react";
import { useRecetasPacienteStore } from "../../../../../store/recetas/recetasPaciente";
import { format } from "@formkit/tempo";
import { usePacienteStore } from "../../../../../store/pacientes/pacientes";
import { useUsuarioStore } from "../../../../../store/usuarios";
import { useDatosMedicosPacientesStore } from "../../../../../store/datosMedicos/datosMedicosPaciente";

export const EncabezadoReceta = ({ idUsuario, idReceta }) => {
  const [recetaPaciente, setRecetaPaciente] = useState([]);
  const dataPacientes = usePacienteStore((state) => state.data);
  const dataReceta = useRecetasPacienteStore((state) => state.data);
  const dataUsuarios = useUsuarioStore((state) => state.data);

  useEffect(() => {
    const receta = dataReceta.find((receta) => receta.recetaID == idReceta);
    setRecetaPaciente(receta);
  }, [dataReceta, idReceta]);
  const usuario = dataUsuarios.find((usuario) => usuario.id == idUsuario);
  const paciente = dataPacientes.find(
    (paciente) => paciente.id == recetaPaciente.pacienteID,
  );

  const fechaReceta = format(recetaPaciente?.recetaFecha, "YYYY-MM-DD");

  const dataMedicosPacientes = useDatosMedicosPacientesStore(
    (state) => state.data,
  );
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

  const datosMedicosPaciente = getPesoAltura(recetaPaciente.pacienteID);

  if (recetaPaciente.length === 0 || !recetaPaciente) {
    return <Spinner label={`Cargando Receta: ${idReceta}`} />;
  }

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
            defaultValue={parseDate(fechaReceta)}
            placeholderValue={new CalendarDate(1995, 11, 6)}
          />
          <TimeInput
            className="w-fit"
            isReadOnly
            granularity="second"
            label="Hora"
            variant="underlined"
            value={parseAbsoluteToLocal(recetaPaciente?.createdAt)}
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
            defaultValue={recetaPaciente?.pacienteNombre}
            className="max-w-xs"
          />
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Apellido:"
            variant="underlined"
            defaultValue={recetaPaciente?.pacienteApellido}
            className="max-w-xs"
          />
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Originario:"
            variant="underlined"
            defaultValue={paciente?.municipio}
            className="max-w-xs"
          />
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Edad:"
            variant="underlined"
            defaultValue={`23 años`}
            className="max-w-xs"
          />
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Genero:"
            variant="underlined"
            defaultValue={paciente?.genero}
            className="max-w-xs"
          />
        </div>
        <div className="mt-3 flex gap-4">
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Estado Civil:"
            variant="underlined"
            defaultValue={paciente?.estadoCivil}
            className="max-w-xs"
          />
          <Input
            labelPlacement="outside-left"
            isReadOnly
            label="Direccion:"
            variant="underlined"
            defaultValue={paciente?.direccion}
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
