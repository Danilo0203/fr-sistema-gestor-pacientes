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
import { useMunicipioStore } from "../../../../store/direcciones/municipios";
import { useDepartamentoStore } from "../../../../store/direcciones/departamentos";
import {
  updateMunicipio,
  deleteMunicipio,
  createMunicipio,
} from "helpers/api/direccion/municipios";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, MunicipioData } from "types/index";

export const ModalEditarMunicipio = ({
  idMunicipio,
  updateTable,
}: ModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const municipios = useMunicipioStore((state) => state.data);
  const departamentos = useDepartamentoStore((state) => state.data);
  const [editMunicipio, setEditMunicipio] = useState([]);

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editMunicipio) {
      setValue("nombre", editMunicipio.nombre);
      setValue("departamento_id", editMunicipio.departamento);
    }
  }, [editMunicipio, setValue]);

  const handleEdit = () => {
    const [municipioID] = getUsuarioById(idMunicipio, municipios);
    const datosMunicipio = {
      id: idMunicipio,
      nombre: municipioID.nombre,
      departamentoID: municipioID.departamentoID,
      departamento: municipioID.departamento,
    };
    setEditMunicipio(datosMunicipio);
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const actualizar = async (data: MunicipioData) => {
    await updateMunicipio(editMunicipio.id, data);
    updateTable();
  };

  // Funcion para buscar el nombre del departamento y devolver el id
  const getDepartamentoID = (nombre: string) => {
    const [departamento] = departamentos.filter(
      (departamento) => departamento.nombre === nombre,
    );
    return departamento.id;
  };

  const onSubmit = (data: MunicipioData) => {
    data.departamento_id = getDepartamentoID(data.departamento_id);
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
                  Editar Municipio
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <div className="flex flex-col gap-8">
                    <div className="flex gap-8">
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col gap-4">
                          <Label id="nombre">Nombre</Label>
                          <Input
                            placeholder="Editar nombre"
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
                        </div>
                        {
                          <span className="text-xs font-medium italic text-red-600">
                            {errors.nombre?.message}
                          </span>
                        }
                      </div>
                      <div className="flex w-1/2 flex-col gap-1">
                        <Label id="departamento_id">Departamento</Label>
                        <Select
                          aria-label="Departamento"
                          items={departamentos}
                          placeholder="Seleccione un departamento"
                          defaultSelectedKeys={[editMunicipio.departamento]}
                          size="lg"
                          variant="underlined"
                          {...register("departamento_id", {
                            required: {
                              value: true,
                              message: "Este campo es requerido",
                            },
                          })}
                        >
                          {(departamento) => (
                            <SelectItem key={departamento.nombre}>
                              {departamento.nombre}
                            </SelectItem>
                          )}
                        </Select>
                        {
                          <span className="text-xs font-medium italic text-red-600">
                            {errors.departamento_id?.message}
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

export const ModalEliminarMunicipio = ({
  idMunicipio,
  updateTable,
}: ModalProps) => {
  const municipios = useMunicipioStore((state) => state.data);
  const handleDelete = async () => {
    await deleteMunicipio(idMunicipio);
    updateTable();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const municipioID: MunicipioData = getUsuarioById(idMunicipio, municipios)[0];

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
                Eliminar Municipio
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    ¿Desea eliminar el municipio:
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    {municipioID.nombre}, {municipioID.departamento} ?
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

export const ModalAgregarMunicipio = ({ updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dataDepartamentos = useDepartamentoStore((state) => state.data);
  const { register, handleSubmit } = useForm();

  const agregarMunicipio = async (data) => {
    await createMunicipio(data);
    updateTable();
  };

  const onSubmit = (data) => {
    agregarMunicipio(data);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-azulFuerte text-white"
        startContent={<Icon icon="mdi:map-marker-plus" width={20} />}
      >
        Agregar Municipio
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
                  Agregar Municipio
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4">
                  <Label>Nombre Municipio</Label>
                  <Input
                    autoFocus
                    placeholder="Ingrese el municipio"
                    type="text"
                    {...register("nombre")}
                  />
                  <Label>Departamento</Label>
                  <Select
                    aria-label="Departamento"
                    items={dataDepartamentos}
                    placeholder="Seleccione un departamento"
                    variant="underlined"
                    size="lg"
                    {...register("departamento_id")}
                  >
                    {(depto) => (
                      <SelectItem key={depto.id}>{depto.nombre}</SelectItem>
                    )}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
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
