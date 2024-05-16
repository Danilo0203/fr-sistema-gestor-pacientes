import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
  Select,
  SelectItem,
  Divider,
  useDisclosure,
} from "@nextui-org/react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecetasStore } from "../../../../store/recetas/recetas";
import {
  updateRecetaMedica,
  deleteRecetaMedica,
} from "helpers/api/recetaMedica/recetas-medicas";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, RecetasData } from "types/index";
import { useUsuarioStore } from "../../../../store/usuarios";

export const ModalEditarReceta = ({ idReceta, updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const recetas = useRecetasStore((state) => state.data);
  const usuarios = useUsuarioStore((state) => state.data);
  const getUsuarios = useUsuarioStore((state) => state.execute);
  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getUsuarios();
  }, [getUsuarios]);

  const handleEdit = () => {
    navigate(`/recetas-medicas/tabla/editar/${idReceta}`);
  };

  const { id } = params;

  const recetaMedicaID: RecetasData = getUsuarioById(id, recetas)[0];

  useEffect(() => {
    setValue("fecha", recetaMedicaID.fecha);
    setValue("usuario", recetaMedicaID.usuario);
  }, [recetaMedicaID.fecha, recetaMedicaID.usuario, setValue]);

  const handleClose = () => {
    navigate("/recetas-medicas/tabla");
  };

  const actualizar = async (data: RecetasData) => {
    await updateRecetaMedica(recetaMedicaID.id, data);
    updateTable();
  };

  const onSubmit = (data: RecetasData) => {
    actualizar(data);
    navigate("/recetas-medicas/tabla");
  };

  return (
    <>
      <button onClick={handleEdit}>
        <Tooltip content="Editar" color="primary">
          <span className="cursor-pointer text-lg text-azulFuerte active:opacity-50">
            <Icon
              icon="mdi:account-box-edit-outline"
              width={25}
              onClick={onOpen}
            />
          </span>
        </Tooltip>
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        classNames={{ backdrop: "bg-black/10 blur-[1px]" }}
        size="2xl"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-8"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-azulFuerte">
                  Editar Receta Médica
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <div className="flex flex-col gap-8">
                    <div className="flex gap-8">
                      <div className="flex w-1/2 flex-col gap-1">
                        <Label id="fecha">Fecha de Emisión</Label>
                        <Input
                          type="date"
                          placeholder="Editar fecha"
                          {...register("fecha")}
                        >
                          <Icon
                            icon="mdi:calendar"
                            width={20}
                            className="text-azulFuerte"
                          />
                        </Input>
                      </div>
                      <div className="flex w-1/2 flex-col gap-1">
                        <Label id="user_id">Usuario</Label>
                        <Select
                          items={usuarios}
                          placeholder="Seleccione un usuario"
                          defaultSelectedKeys={[recetaMedicaID.usuarioID]}
                          size="lg"
                          {...register("user_id")}
                        >
                          {(usuario) => (
                            <SelectItem key={usuario.id}>
                              {usuario.nombre}
                            </SelectItem>
                          )}
                        </Select>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    onClick={handleClose}
                  >
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit" onPress={onClose}>
                    Editar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export const ModalEliminarReceta = ({ idReceta, updateTable }: ModalProps) => {
  const recetas = useRecetasStore((state) => state.data);
  const handleDelete = async () => {
    await deleteRecetaMedica(idReceta);
    updateTable();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const recetaMedicaID: RecetasData = getUsuarioById(idReceta, recetas)[0];

  return (
    <>
      <button>
        <Tooltip content="Eliminar" color="danger">
          <span className="cursor-pointer text-lg text-azulFuerte active:opacity-50">
            <Icon
              icon="mdi:delete"
              width={25}
              className="text-red-600"
              onClick={onOpen}
            />
          </span>
        </Tooltip>
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Eliminar Receta Médica
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    ¿Desea eliminar la Receta Médica No. {recetaMedicaID.id} ?
                    con fecha:
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    {recetaMedicaID.fecha} ?
                  </h3>
                </div>
                <div className="flex gap-3">
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    className="flex-grow"
                  >
                    Cerrar
                  </Button>
                  <Button
                    color="primary"
                    onPress={onClose}
                    onClick={handleDelete}
                    className="flex-grow"
                  >
                    Eliminar
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
