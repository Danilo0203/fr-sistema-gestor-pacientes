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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDatosMedicosStore } from "../../../../store/datosMedicos/datosMedicos";
import {
  updateDatoMedico,
  deleteDatoMedico,
  createDatoMedico,
} from "helpers/api/datosMedicos/datos-medicos";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, DatosMedicosData } from "types/index";

export const ModalEditarDatoMedico = ({
  idDatoMedico,
  updateTable,
}: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const datosMedicos = useDatosMedicosStore((state) => state.data);
  const [editDatosMedicos, setEditDatosMedicos] = useState(null);
  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleEdit = () => {
    const [datoMedicoID] = getUsuarioById(idDatoMedico, datosMedicos);
    const dataMedicos = {
      id: idDatoMedico,
      nombre: datoMedicoID.nombre,
    };
    setEditDatosMedicos(dataMedicos);
    setValue("nombre", datoMedicoID.nombre);
  };

  const handleClose = () => {
    navigate("/datos-medicos/tabla");
  };

  const actualizar = async (data: DatosMedicosData) => {
    await updateDatoMedico(editDatosMedicos.id, data);
    updateTable();
  };

  const onSubmit = (data: DatosMedicosData) => {
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
                  Editar Dato Médico
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

export const ModalEliminarDatoMedico = ({
  idDatoMedico,
  updateTable,
}: ModalProps) => {
  const datosMedicos = useDatosMedicosStore((state) => state.data);
  const handleDelete = async () => {
    await deleteDatoMedico(idDatoMedico);
    updateTable();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const datoMedicoID: DatosMedicosData = getUsuarioById(
    idDatoMedico,
    datosMedicos,
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
                Eliminar Dato Médico
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    ¿Desea eliminar el Dato Médico:
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    {datoMedicoID.nombre} ?
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

export const ModalAgregarDatoMedico = ({ updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm();

  const agregarDatoMedico = async (data: DatosMedicosData) => {
    await createDatoMedico(data);
    updateTable();
  };
  const onSubmit = (data) => {
    agregarDatoMedico(data);
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-azulFuerte text-white"
        startContent={<Icon icon="mdi:user-add" width={20} />}
      >
        Agregar Dato Médico
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
                  Agregar Dato Médico
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4">
                  <Label>Dato Médico</Label>
                  <Input
                    autoFocus
                    placeholder="Ingrese el dato médico"
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
