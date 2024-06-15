import { Button, Spinner, Textarea } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { EncabezadoReceta } from "./components/EncabezadoReceta";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  useCrearRecetaStore,
  useRecetasStore,
} from "../../../../store/recetas/recetas";
import { createRecetaMedicaPaciente } from "helpers/api/recetaMedica/recetas-medicas-paciente";
import { getCitasPaciente } from "helpers/api/pacientes/pacientes";
import { usePanelStore } from "../../../../store/panel/usePanelStore";
import { usePacienteCitasStore } from "../../../../store/pacientes/pacientesCitas";

export const TablaReceta = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const { idPaciente } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loadingRecetaMedica = useCrearRecetaStore((state) => state.loading);
  const loadingDeleteRecetaMedica = useCrearRecetaStore(
    (state) => state.loadingDelete,
  );
  const updatePanelStore = usePanelStore((state) => state.execute);

  const eliminarRecetaMedica = useCrearRecetaStore(
    (state) => state.eliminarReceta,
  );
  const initRecetaMedica = useRecetasStore((state) => state.execute);
  const updateCitas = usePacienteCitasStore((state) => state.execute);

  useEffect(() => {
    initRecetaMedica();
  }, [initRecetaMedica]);
  const dataRecetaMedica = useRecetasStore((state) => state.data);
  // funcion para recuperara el id de la ultima receta medica
  const lastRecetaMedica = dataRecetaMedica[dataRecetaMedica.length - 1];

  const onSubmitRecetaMedica = (data: any) => {
    data = {
      ...data,
      paciente_id: idPaciente,
      receta_id: lastRecetaMedica.id,
    };
    createRecetaMedicaPaciente(data);
    navigate(-1);
    updateCitas();
    getCitasPaciente(idPaciente);
    updatePanelStore();
  };

  if (loadingRecetaMedica) {
    return (
      <Spinner
        label="Creando Receta Medica..."
        color="default"
        labelColor="foreground"
      />
    );
  }
  if (loadingDeleteRecetaMedica) {
    return (
      <Spinner
        label="Eliminado Receta Medica..."
        color="default"
        labelColor="foreground"
      />
    );
  }
  const eliminarReceta = async () => {
    await eliminarRecetaMedica(lastRecetaMedica.id);
    initRecetaMedica();
    navigate(-1);
    return;
  };
  return (
    <div className="flex flex-col">
      <Button
        className="self-end bg-azulFuerte"
        color="primary"
        onPress={() => eliminarReceta()}
      >
        Regresar al panel
      </Button>
      <div>
        <EncabezadoReceta
          idPaciente={idPaciente}
          idReceta={lastRecetaMedica?.id}
        />
        <form
          onSubmit={handleSubmit(onSubmitRecetaMedica)}
          action="POST"
          className="flex flex-col gap-4"
        >
          <Textarea
            variant="underlined"
            label="Observaciones:"
            labelPlacement="outside"
            placeholder="Ingrese la observacion de la receta medica"
            value={value}
            onValueChange={setValue}
            className="mt-5"
            minRows={8}
            {...register("descripcion", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          />
          {
            <span className="text-sm font-medium italic text-red-600">
              {errors.descripcion && errors.descripcion.message}
            </span>
          }
          <Button
            color="primary"
            className="self-end bg-azulFuerte"
            type="submit"
          >
            Guardar Receta
          </Button>
        </form>
      </div>
    </div>
  );
};
