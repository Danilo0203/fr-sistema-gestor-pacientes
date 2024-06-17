import { Button, Spinner, Textarea } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { EncabezadoReceta } from "./components/EncabezadoReceta";
import { useEffect } from "react";

import {
  useCrearRecetaStore,
  useRecetasStore,
} from "../../../../store/recetas/recetas";
import { useRecetasPacienteStore } from "../../../../store/recetas/recetasPaciente";

export const MostrarRecetaPaciente = () => {
  const navigate = useNavigate();

  const { idUsuario, idReceta } = useParams();

  const loadingRecetaMedica = useCrearRecetaStore((state) => state.loading);
  const initRecetaMedica = useRecetasStore((state) => state.execute);
  const dataRecetaMedica = useRecetasPacienteStore((state) => state.data);
  

  const recetaPaciente = dataRecetaMedica.find(
    (receta) => receta.recetaID == idReceta,
  );

  useEffect(() => {
    initRecetaMedica();
  }, [initRecetaMedica, idReceta]);

  if (loadingRecetaMedica) {
    return (
      <Spinner
        label="Cargando Receta Medica..."
        color="default"
        labelColor="foreground"
      />
    );
  }

  const Regresar = () => {
    navigate(-1);
    return;
  };

  return (
    <div className="flex flex-col">
      <Button
        className="self-end bg-azulFuerte"
        color="primary"
        onPress={() => Regresar()}
      >
        Regresar
      </Button>
      <div>
        <EncabezadoReceta idUsuario={idUsuario} idReceta={idReceta} />
        <Textarea
          isReadOnly
          variant="underlined"
          label="Observaciones:"
          labelPlacement="outside"
          placeholder="Ingrese la observacion de la receta medica"
          value={recetaPaciente?.descripcion}
          className="mt-5"
          minRows={8}
        />
      </div>
    </div>
  );
};
