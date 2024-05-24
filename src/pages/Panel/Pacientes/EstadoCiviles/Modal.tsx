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

import { useEstadoCivilStore } from "../../../../store/pacientes/estadoCivil";
import {
  updateEstadoCivil,
  deleteEstadoCivil,
  createEstadoCivil,
} from "helpers/api/pacientes/estado-civil";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, EstadoCivilData } from "types/index";
import { usePacienteStore } from "../../../../store/pacientes/pacientes";

export const ModalEditarEstadoCivil = ({
  idEstadoCivil,
  updateTable,
}: ModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const estadoCiviles = useEstadoCivilStore((state) => state.data);
  const executePacientes = usePacienteStore((state) => state.execute);
  const [editEstadoCivil, setEditEstadoCivil] = useState(null);
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleEdit = () => {
    const [estadoCivilID] = getUsuarioById(idEstadoCivil, estadoCiviles);
    const datosEstadoCivil = {
      id: idEstadoCivil,
      nombre: estadoCivilID.nombre,
    };
    setEditEstadoCivil(datosEstadoCivil);
    setValue("nombre", estadoCivilID.nombre);
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const actualizar = async (data: EstadoCivilData) => {
    await updateEstadoCivil(editEstadoCivil.id, data);
    updateTable();
    executePacientes();
  };

  const onSubmit = (data: EstadoCivilData) => {
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
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-azulFuerte">
                  Editar Estado Civil
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <div className="flex flex-col gap-1">
                    <Label id="nombre">Nombre</Label>
                    <Input
                      placeholder="Editar nombre"
                      {...register("nombre", {
                        required: {
                          value: true,
                          message: "Campo requerido",
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

export const ModalEliminarEstadoCivil = ({
  idEstadoCivil,
  updateTable,
}: ModalProps) => {
  const estadoCiviles = useEstadoCivilStore((state) => state.data);
  const handleDelete = async () => {
    await deleteEstadoCivil(idEstadoCivil);
    updateTable();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const estadoCivilID: EstadoCivilData = getUsuarioById(
    idEstadoCivil,
    estadoCiviles,
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
                Eliminar Estado Civil
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    ¿Desea eliminar el Estado Civil:
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    {estadoCivilID.nombre} ?
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

export const ModalAgregarEstadoCivil = ({ updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const agregarEstadoCivil = async (data) => {
    await createEstadoCivil(data);
    updateTable();
  };
  const onSubmit = (data) => {
    agregarEstadoCivil(data);
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
        Agregar Estado Civil
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
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar Estado Civil
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4">
                  <div className="flex flex-col gap-1">
                    <Label>Estado Civil</Label>
                    <Input
                      autoFocus
                      placeholder="Ingrese el estado civil"
                      type="text"
                      {...register("nombre", {
                        required: {
                          value: true,
                          message: "Campo requerido",
                        },
                      })}
                    />
                    {
                      <span className="text-xs font-medium italic text-red-600">
                        {errors.nombre?.message}
                      </span>
                    }
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
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
