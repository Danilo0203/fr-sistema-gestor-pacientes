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
import { useGeneroStore } from "../../../../store/pacientes/generos";
import {
  updateGenero,
  deleteGenero,
  createGenero,
} from "helpers/api/pacientes/genero";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, GeneroData } from "types/index";

export const ModalEditarGenero = ({ idGenero, updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const generos = useGeneroStore((state) => state.data);
  const [editGenero, setEditGenero] = useState(null);
  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleEdit = () => {
    const [generoID] = getUsuarioById(idGenero, generos);
    const datosGenero = {
      id: idGenero,
      nombre: generoID.nombre,
    };
    setEditGenero(datosGenero);
    setValue("nombre", generoID.nombre);
  };

  const handleClose = () => {
    navigate("/pacientes/genero");
  };

  const actualizar = async (data: GeneroData) => {
    await updateGenero(editGenero.id, data);
    updateTable();
  };

  const onSubmit = (data: GeneroData) => {
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

        // size="2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-azulFuerte">
                  Editar Género
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <Label id="nombre">Nombre</Label>
                  <Input placeholder="Editar género" {...register("nombre")}>
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

export const ModalEliminarGenero = ({ idGenero, updateTable }: ModalProps) => {
  const generos = useGeneroStore((state) => state.data);
  const handleDelete = async () => {
    await deleteGenero(idGenero);
    updateTable();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const generoID: GeneroData = getUsuarioById(idGenero, generos)[0];

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
                Eliminar Género
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    ¿Desea eliminar el Género:
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    {generoID.nombre} ?
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

export const ModalAgregarGenero = ({ updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm();

  const agregarGenero = async (data: GeneroData) => {
    await createGenero(data);
    updateTable();
  };
  const onSubmit = (data) => {
    agregarGenero(data);
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-azulFuerte text-white"
        startContent={<Icon icon="mdi:user-add" width={20} />}
      >
        Agregar Género
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
                  Agregar Género
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4">
                  <Label>Género</Label>
                  <Input
                    autoFocus
                    placeholder="Ingrese el género"
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
