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

import { useForm } from "react-hook-form";
import { useRolStore } from "../../../../store/usuarios/roles";

import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, RolData } from "types/index";
import { createRol, deleteRol, updateRol } from "helpers/api/usuarios/roles";
import { useState } from "react";

export const ModalEditarRoles = ({ idRol, updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const roles = useRolStore((state) => state.data);
  const [editRol, setEditRol] = useState(null);
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleEdit = () => {
    const [rolID] = getUsuarioById(idRol, roles);
    const datosRol = {
      id: idRol,
      nombre: rolID.nombre,
      descripcion: rolID.descripcion,
    };
    setEditRol(datosRol);
    setValue("descripcion", rolID.descripcion);
    setValue("nombre", rolID.nombre);
  };

  const handleClose = () => {
    reset();
  };

  const actualizar = async (data: RolData) => {
    await updateRol(editRol.id, data);
    updateTable();
  };

  const onSubmit = (data: RolData) => {
    actualizar(data);
    onClose();
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
        size="2xl"
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-azulFuerte">
                  Editar Rol
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-1">
                      <Label id="nombre">Rol</Label>
                      <Input
                        placeholder="Editar Rol"
                        {...register("nombre", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                        })}
                      >
                        <Icon
                          icon="mdi:account"
                          width={20}
                          className="text-azulFuerte"
                        />
                      </Input>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.nombre?.message}
                        </span>
                      }
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label id="email">Descripción</Label>
                      <Input
                        placeholder="Editar descripción"
                        {...register("descripcion", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                        })}
                      >
                        <Icon
                          icon="mdi:account"
                          width={20}
                          className="text-azulFuerte"
                        />
                      </Input>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.descripcion?.message}
                        </span>
                      }
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

export const ModalEliminarRoles = ({ idRol, updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const roles = useRolStore((state) => state.data);
  const handleDelete = async () => {
    await deleteRol(idRol);
    updateTable();
  };
  const rolID: RolData = getUsuarioById(idRol, roles)[0];

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
                Eliminar Rol
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    ¿Desea eliminar el rol?
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    {rolID.nombre}
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

export const ModalAgregarRoles = ({ updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const agregarRol = async (data) => {
    await createRol(data);
    updateTable();
  };
  const onSubmit = (data) => {
    agregarRol(data);
    onClose();
    reset();
  };
  const handleClose = () => {
    onClose();
    reset();
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-azulFuerte text-white"
        startContent={<Icon icon="mdi:user-add" width={20} />}
      >
        Agregar Rol
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar Rol
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4 flex flex-col gap-8">
                  <div className="flex flex-col gap-1">
                    <Label>Rol</Label>
                    <Input
                      autoFocus
                      placeholder="Ingrese el rol"
                      type="text"
                      {...register("nombre", {
                        required: {
                          value: true,
                          message: "Este campo es requerido",
                        },
                      })}
                    >
                      <Icon
                        icon="mdi:account"
                        width={20}
                        className="text-azulFuerte"
                      />
                    </Input>
                    {
                      <span className="text-xs font-medium italic text-red-600">
                        {errors.nombre?.message}
                      </span>
                    }
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label>Descripcion</Label>
                    <Input
                      placeholder="Ingrese una descripción"
                      type="text"
                      {...register("descripcion", {
                        required: {
                          value: true,
                          message: "Este campo es requerido",
                        },
                      })}
                    >
                      <Icon
                        icon="mdi:card-text"
                        width={20}
                        className="text-azulFuerte"
                      />
                    </Input>
                    {
                      <span className="text-xs font-medium italic text-red-600">
                        {errors.descripcion?.message}
                      </span>
                    }
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={handleClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit">
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
