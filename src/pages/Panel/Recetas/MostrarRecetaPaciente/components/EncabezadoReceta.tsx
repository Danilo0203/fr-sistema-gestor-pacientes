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
import { useDatosMedicosStore } from "../../../../../store/datosMedicos/datosMedicos";

export const EncabezadoReceta = ({ idUsuario, idReceta }) => {
  const [recetaPaciente, setRecetaPaciente] = useState([]);
  const dataPacientes = usePacienteStore((state) => state.data);
  const dataReceta = useRecetasPacienteStore((state) => state.data);
  const dataUsuarios = useUsuarioStore((state) => state.data);
  const initMedicos = useDatosMedicosStore((state) => state.init);
  const datosMedicos = useDatosMedicosStore((state) => state.data);

  useEffect(() => {
    initMedicos();
    const receta = dataReceta.find((receta) => receta.recetaID == idReceta);
    setRecetaPaciente(receta);
  }, [dataReceta, idReceta, initMedicos]);

  const usuario = dataUsuarios.find((usuario) => usuario.id == idUsuario);
  const paciente = dataPacientes.find(
    (paciente) => paciente.id == recetaPaciente.pacienteID,
  );

  const fechaReceta = format(recetaPaciente?.recetaFecha, "YYYY-MM-DD");
  const nombreDatoMedico = datosMedicos.map((dato) => dato.nombre);

  const dataMedicosPacientes = useDatosMedicosPacientesStore(
    (state) => state.data,
  );
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
      console.log(nombreDatoMedico);

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
      console.log(datosRecientes);
      return datosRecientes;
    },
    [dataMedicosPacientes, nombreDatoMedico],
  );

  const datosMedicosPaciente = getDatosMedicosRecientes(
    recetaPaciente.pacienteID,
  );
  console.log(recetaPaciente);
  console.log(datosMedicosPaciente);

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
