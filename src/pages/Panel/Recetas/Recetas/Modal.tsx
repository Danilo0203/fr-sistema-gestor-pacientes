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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecetasStore } from "../../../../store/recetas/recetas";
import {
  updateRecetaMedica,
  deleteRecetaMedica,
} from "helpers/api/recetaMedica/recetas-medicas";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, RecetasData } from "types/index";
import { useUsuarioStore } from "../../../../store/usuarios";

export const ModalEditarReceta = ({ idReceta, updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const recetas = useRecetasStore((state) => state.data);
  const usuarios = useUsuarioStore((state) => state.data);
  const [editRecetas, setEditRecetas] = useState(null);
  const { setValue, register, handleSubmit, reset } = useForm();

  const handleEdit = () => {
    const [recetaMedicaID] = getUsuarioById(idReceta, recetas);

    const datosReceta = {
      id: idReceta,
      usuarioID: recetaMedicaID.usuarioID,
      usuario: recetaMedicaID.usuario,
      fecha: recetaMedicaID.fecha,
    };
    setEditRecetas(datosReceta);
    setValue("usuario", recetaMedicaID.usuarioID);
    setValue("fecha", recetaMedicaID.fecha);
  };

  const handleClose = () => {
    onClose();
    reset();
  };
  const actualizar = async (data: RecetasData) => {
    await updateRecetaMedica(editRecetas.id, data);
    updateTable();
  };

  // Funcion para buscar el nombre del usuario y mandar el id
  const userByID = (usuario: string) => {
    const user = usuarios.find((user) => user.nombre == usuario);
    return user.id;
  };

  const onSubmit = (data: RecetasData) => {
    data.user_id = userByID(data.user_id);
    actualizar(data);
    onClose();
    reset();
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
        placement="top-center"
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-azulFuerte">
                  Editar Receta Médica
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-8 py-4">
                      <div className="flex flex-col">
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
                      <div className="flex flex-col">
                        <Label id="user_id">Usuario</Label>
                        <Select
                          aria-label="Usuario"
                          variant="underlined"
                          items={usuarios}
                          placeholder="Seleccione un usuario"
                          defaultSelectedKeys={[editRecetas.usuario]}
                          size="lg"
                          {...register("user_id")}
                        >
                          {(usuario) => (
                            <SelectItem key={usuario.nombre}>
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
                  <Button color="primary" type="submit">
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
                  <h2 className="text-center text-xl font-medium">
                    ¿Desea eliminar la Receta Médica? con fecha:
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
