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
import { useDepartamentoStore } from "../../../../store/direcciones/departamentos";
import {
  updateDepartamento,
  deleteDepartamento,
  createDepartamento,
} from "helpers/api/direccion/departamentos";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, DepartamentoData } from "types/index";
import { useMunicipioStore } from "../../../../store/direcciones/municipios";
import { useDireccionStore } from "../../../../store/direcciones/direcciones";

export const ModalEditarDepartamento = ({
  idDepartamento,
  updateTable,
}: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const departamentos = useDepartamentoStore((state) => state.data);
  const executeMuni = useMunicipioStore((state) => state.execute);
  const executeDirecciones = useDireccionStore((state) => state.execute);

  const [editDepto, setEditDepto] = useState(null);
  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleEdit = () => {
    const [departamentoID] = getUsuarioById(idDepartamento, departamentos);
    const datosDepartamento = {
      id: idDepartamento,
      nombre: departamentoID.nombre,
    };
    setEditDepto(datosDepartamento);
    setValue("nombre", departamentoID.nombre);
  };

  const handleClose = () => {
    navigate("/direcciones/departamento");
  };

  const actualizar = async (data: DepartamentoData) => {
    await updateDepartamento(editDepto.id, data);
    updateTable();
    executeMuni();
    executeDirecciones();
  };

  const onSubmit = (data: DepartamentoData) => {
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
                  Editar Departamento
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

export const ModalEliminarDepartamento = ({
  idDepartamento,
  updateTable,
}: ModalProps) => {
  const departamentos = useDepartamentoStore((state) => state.data);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = async () => {
    await deleteDepartamento(idDepartamento);
    updateTable();
  };

  const departamentoID: DepartamentoData = getUsuarioById(
    idDepartamento,
    departamentos,
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
                Eliminar Departamento
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    Desea eliminar el departamento:
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    ¿{departamentoID.nombre}?
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

export const ModalAgregarDepartamento = ({ updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm();

  const agregarDepartamento = async (data: DepartamentoData) => {
    await createDepartamento(data);
    updateTable();
  };

  const onSubmit = (data) => {
    agregarDepartamento(data);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-azulFuerte text-white"
        startContent={<Icon icon="mdi:map-marker-plus" width={20} />}
      >
        Agregar Departamento
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
                  Agregar Departamento
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4">
                  <Label>Departamento</Label>
                  <Input
                    autoFocus
                    placeholder="Ingrese el Departamento"
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
