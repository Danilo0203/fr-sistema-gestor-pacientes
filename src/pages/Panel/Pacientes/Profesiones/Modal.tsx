import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
  Divider,
  useDisclosure,
} from "@nextui-org/react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProfesionStore } from "../../../../store/pacientes/profesiones";
import {
  updateProfesion,
  deleteProfesion,
  createProfesion,
} from "helpers/api/pacientes/profesiones";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, ProfesionData } from "types/index";

export const ModalEditarProfesion = ({
  idProfesion,
  updateTable,
}: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const profesiones = useProfesionStore((state) => state.data);
  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [profesionEdit, setProfesionEdit] = useState(null);

  const handleEdit = () => {
    const [profesionID] = getUsuarioById(idProfesion, profesiones);
    const datosProfesion = {
      id: idProfesion,
      nombre: profesionID.nombre,
    };
    setProfesionEdit(datosProfesion);
    setValue("nombre", profesionID.nombre);
  };

  const handleClose = () => {
    navigate("/pacientes/profesion");
  };

  const actualizar = async (data: ProfesionData) => {
    await updateProfesion(profesionEdit.id, data);
    updateTable();
  };

  const onSubmit = (data: ProfesionData) => {
    actualizar(data);
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
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-azulFuerte">
                  Editar Profesión
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <Label id="nombre">Nombre</Label>
                  <Input placeholder="Editar nombre" {...register("nombre")}>
                    <Icon
                      icon="mdi:account"
                      width={20}
                      className="text-azulFuerte"
                    />
                  </Input>
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

export const ModalEliminarProfesion = ({
  idProfesion,
  updateTable,
}: ModalProps) => {
  const profesiones = useProfesionStore((state) => state.data);
  const handleDelete = async () => {
    await deleteProfesion(idProfesion);
    updateTable();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const profesionID: ProfesionData = getUsuarioById(
    idProfesion,
    profesiones,
  )[0];

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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Eliminar Profesión
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    ¿Desea eliminar la Profesión:
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    {profesionID.nombre} ?
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

export const ModalAgregarProfesion = ({ updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm();

  const agregarProfesion = async (data: UserData) => {
    await createProfesion(data);
    updateTable();
  };
  const onSubmit = (data: UserData) => {
    agregarProfesion(data);
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-azulFuerte text-white"
        startContent={<Icon icon="mdi:user-add" width={20} />}
      >
        Agregar Profesión
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar Profesión
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4">
                  <Label>Profesión</Label>
                  <Input
                    placeholder="Ingrese la profesión"
                    type="text"
                    {...register("nombre")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit" onPress={onClose}>
                    Agregar
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
