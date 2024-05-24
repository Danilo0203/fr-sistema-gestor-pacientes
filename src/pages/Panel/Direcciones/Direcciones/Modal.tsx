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
import { useDireccionStore } from "../../../../store/direcciones/direcciones";
import { useMunicipioStore } from "../../../../store/direcciones/municipios";
import {
  deleteDireccion,
  updateDireccion,
  createDireccion,
} from "helpers/api/direccion/direcciones";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, DireccionData } from "types/index";
import { usePacienteStore } from "../../../../store/pacientes/pacientes";

export const ModalEditarDireccion = ({
  idDireccion,
  updateTable,
}: ModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const direcciones = useDireccionStore((state) => state.data);
  const municipios = useMunicipioStore((state) => state.data);
  const executePacientes = usePacienteStore((state) => state.execute);
  const [editDirecciones, setEditDirecciones] = useState([]);
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editDirecciones) {
      setValue("municipio_id", editDirecciones.municipio);
      setValue("nombre", editDirecciones.nombre);
    }
  }, [editDirecciones, setValue]);

  const handleEdit = () => {
    const [direccionID] = getUsuarioById(idDireccion, direcciones);
    const datosDireccion = {
      id: idDireccion,
      nombre: direccionID.nombre,
      municipioID: direccionID.municipioID,
      municipio: direccionID.municipio,
    };
    setEditDirecciones(datosDireccion);
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const actualizar = async (data: DireccionData) => {
    await updateDireccion(editDirecciones.id, data);
    updateTable();
    executePacientes();
  };
  // Funcion para buscar el nombre del municipio y devolver el id
  const buscarMunicipio = (nombreMunicipio) => {
    const municipio = municipios.find(
      (municipio) => municipio.nombre === nombreMunicipio,
    );
    return municipio.id;
  };

  const onSubmit = (data: DireccionData) => {
    data.municipio_id = buscarMunicipio(data.municipio_id);
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
        size="2xl"
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-azulFuerte">
                  Editar Dirección
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-1">
                        <Label id="nombre">Nombre</Label>
                        <Input
                          placeholder="Editar nombre"
                          {...register("nombre", {
                            required: {
                              value: true,
                              message: "El campo es requerido",
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
                        <Label id="municipio_id">Municipio</Label>
                        <Select
                          aria-label="Municipio"
                          items={municipios}
                          placeholder="Seleccione un municipio"
                          defaultSelectedKeys={[editDirecciones.municipio]}
                          size="lg"
                          {...register("municipio_id", {
                            required: {
                              value: true,
                              message: "El campo es requerido",
                            },
                          })}
                        >
                          {(municipio) => (
                            <SelectItem key={municipio.nombre}>
                              {municipio.nombre}
                            </SelectItem>
                          )}
                        </Select>
                        {
                          <span className="text-xs font-medium italic text-red-600">
                            {errors.municipio_id?.message}
                          </span>
                        }
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

export const ModalEliminarDireccion = ({
  idDireccion,
  updateTable,
}: ModalProps) => {
  const direcciones = useDireccionStore((state) => state.data);
  const handleDelete = async () => {
    await deleteDireccion(idDireccion);
    updateTable();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const direccionID: DireccionData = getUsuarioById(
    idDireccion,
    direcciones,
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
                Eliminar Dirección
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    ¿Desea eliminar la dirección:
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    {direccionID.nombre}, {direccionID.municipio} ?
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

export const ModalAgregarDireccion = ({ updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dataMunicipios = useMunicipioStore((state) => state.data);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const agregarDireccion = async (data: DireccionData) => {
    await createDireccion(data);
    updateTable();
  };

  const onSubmit = (data) => {
    agregarDireccion(data);
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
        startContent={<Icon icon="mdi:map-marker-plus" width={20} />}
      >
        Agregar Dirección
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
                  Agregar Direccion
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4">
                  <div className="flex flex-col gap-1">
                    <Label>Dirección</Label>
                    <Input
                      autoFocus
                      placeholder="Ingrese la dirección"
                      type="text"
                      {...register("nombre", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                      })}
                    />
                    {
                      <span className="text-xs font-medium italic text-red-600">
                        {errors.nombre?.message}
                      </span>
                    }
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label>Municipio</Label>
                    <Select
                      aria-label="Municipio"
                      items={dataMunicipios}
                      placeholder="Seleccione un Municipio"
                      variant="underlined"
                      size="lg"
                      {...register("municipio_id", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                      })}
                    >
                      {(municipio) => (
                        <SelectItem key={municipio.id}>
                          {municipio.nombre}
                        </SelectItem>
                      )}
                    </Select>
                    {
                      <span className="text-xs font-medium italic text-red-600">
                        {errors.municipio_id?.message}
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
