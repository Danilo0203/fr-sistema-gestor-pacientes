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
  DatePicker,
  DateValue,
} from "@nextui-org/react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { usePacienteStore } from "../../../../store/pacientes/pacientes";
import { useProfesionStore } from "../../../../store/pacientes/profesiones";
import { useEstadoCivilStore } from "../../../../store/pacientes/estadoCivil";
import { useGeneroStore } from "../../../../store/pacientes/generos";

import {
  deletePaciente,
  updatePaciente,
} from "helpers/api/pacientes/pacientes";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, PacienteData } from "types/index";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useDepartamentoStore } from "../../../../store/direcciones/departamentos";
import { useDireccionStore } from "../../../../store/direcciones/direcciones";
import { useMunicipioStore } from "../../../../store/direcciones/municipios";

export const ModalEditarPaciente = ({
  idPaciente,
  updateTable,
}: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pacientes = usePacienteStore((state) => state.data);
  const direcciones = useDireccionStore((state) => state.data);
  const profesiones = useProfesionStore((state) => state.data);
  const estadoCivil = useEstadoCivilStore((state) => state.data);
  const generos = useGeneroStore((state) => state.data);
  const getDirecciones = useDireccionStore((state) => state.execute);
  const getProfesiones = useProfesionStore((state) => state.execute);
  const getEstadoCivil = useEstadoCivilStore((state) => state.execute);
  const getGeneros = useGeneroStore((state) => state.execute);

  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getDirecciones();
    getProfesiones();
    getEstadoCivil();
    getGeneros();
  }, [getDirecciones, getProfesiones, getEstadoCivil, getGeneros]);

  const handleEdit = () => {
    navigate(`/pacientes/tabla/editar/${idPaciente}`);
  };

  const { id } = params;

  const pacienteID: PacienteData = getUsuarioById(id, pacientes)[0];

  useEffect(() => {
    setValue("nombre", pacienteID.nombre);
    setValue("apellido", pacienteID.apellido);
    setValue("fecha_nacimiento", pacienteID.fecha_nacimiento);
    setValue("direccion", pacienteID.direccion);
    setValue("profesion", pacienteID.profesion);
    setValue("estadoCivil", pacienteID.estadoCivil);
    setValue("genero", pacienteID.genero);
  }, [
    pacienteID.nombre,
    pacienteID.apellido,
    pacienteID.fecha_nacimiento,
    pacienteID.direccion,
    pacienteID.profesion,
    pacienteID.estadoCivil,
    pacienteID.genero,
    setValue,
  ]);

  const handleClose = () => {
    navigate("/pacientes/tabla");
  };

  const actualizar = async (data: PacienteData) => {
    await updatePaciente(pacienteID.id, data);
    updateTable();
  };

  const onSubmit = (data: PacienteData) => {
    actualizar(data);
    navigate("/pacientes/tabla");
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
                  Editar Paciente
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <div className="flex flex-col gap-8">
                    <div className="flex gap-8">
                      <div className="flex flex-col gap-1">
                        <Label id="nombre">Nombre</Label>
                        <Input
                          placeholder="Editar nombre"
                          {...register("nombre")}
                        >
                          <Icon
                            icon="mdi:account"
                            width={20}
                            className="text-azulFuerte"
                          />
                        </Input>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label id="apellido">Apellido</Label>
                        <Input
                          placeholder="Editar apellido"
                          {...register("apellido")}
                        >
                          <Icon
                            icon="mdi:account"
                            width={20}
                            className="text-azulFuerte"
                          />
                        </Input>
                      </div>
                    </div>

                    <div className="flex gap-8">
                      <div className="flex w-1/2 flex-col gap-1">
                        <Label id="fechaNacimiento">Fecha de Nacimiento</Label>
                        <Input
                          type="date"
                          placeholder="Editar fecha de nacimiento"
                          {...register("fecha_nacimiento")}
                        >
                          <Icon
                            icon="mdi:calendar"
                            width={20}
                            className="text-azulFuerte"
                          />
                        </Input>
                      </div>
                      <div className="flex w-1/2 flex-col gap-1">
                        <Label id="genero_id">Género</Label>
                        <Select
                          items={generos}
                          placeholder="Seleccione un género"
                          defaultSelectedKeys={[pacienteID.generoID]}
                          size="lg"
                          {...register("genero_id")}
                        >
                          {(genero) => (
                            <SelectItem key={genero.id}>
                              {genero.nombre}
                            </SelectItem>
                          )}
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-8">
                      <div className="flex w-1/2 flex-col gap-1">
                        <Label id="profesion_id">Profesión</Label>
                        <Select
                          items={profesiones}
                          placeholder="Seleccione una profesión"
                          defaultSelectedKeys={[pacienteID.profesionID]}
                          size="lg"
                          {...register("profesion_id")}
                        >
                          {(profesion) => (
                            <SelectItem key={profesion.id}>
                              {profesion.nombre}
                            </SelectItem>
                          )}
                        </Select>
                      </div>
                      <div className="flex w-1/2 flex-col gap-1">
                        <Label id="estado_civil_id">Estado Civil</Label>
                        <Select
                          items={estadoCivil}
                          placeholder="Seleccione un estado civil"
                          defaultSelectedKeys={[pacienteID.estadoCivilID]}
                          size="lg"
                          {...register("estado_civil_id")}
                        >
                          {(estadoCivil) => (
                            <SelectItem key={estadoCivil.id}>
                              {estadoCivil.nombre}
                            </SelectItem>
                          )}
                        </Select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label id="direccion_id">Dirección</Label>
                      <Select
                        items={direcciones}
                        placeholder="Seleccione una dirección"
                        defaultSelectedKeys={[pacienteID.direccionID]}
                        size="lg"
                        {...register("direccion_id")}
                      >
                        {(direccion) => (
                          <SelectItem key={direccion.id}>
                            {direccion.nombre}
                          </SelectItem>
                        )}
                      </Select>
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

export const ModalEliminarPaciente = ({
  idPaciente,
  updateTable,
}: ModalProps) => {
  const pacientes = usePacienteStore((state) => state.data);
  const handleDelete = async () => {
    await deletePaciente(idPaciente);
    updateTable();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pacienteID: PacienteData = getUsuarioById(idPaciente, pacientes)[0];
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
                Eliminar Paciente
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    ¿Desea eliminar el Paciente:
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    {pacienteID.nombre} {pacienteID.apellido} ?
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

export const ModalAgregarPaciente = ({ updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const defaultDate = today(getLocalTimeZone());
  const [value, setValue] = useState<DateValue>(defaultDate);
  const dataDepartamentos = useDepartamentoStore((state) => state.data);
  const getDepartamentos = useDepartamentoStore((state) => state.execute);
  const dataMunicipios = useMunicipioStore((state) => state.data);
  const getMunicipios = useDireccionStore((state) => state.execute);
  useEffect(() => {
    getDepartamentos();
    getMunicipios();
  }, [getDepartamentos, getMunicipios]);

  console.log(dataMunicipios);

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-azulFuerte text-white"
        startContent={<Icon icon="mdi:user-add" width={20} />}
      >
        Agregar Paciente
      </Button>
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
                Argegar Paciente
              </ModalHeader>
              <Divider />
              <ModalBody className="mt-4">
                <Label>Nombres</Label>
                <Input autoFocus placeholder="Ingrese el nombre" type="text" />
                <Label>Apellidos</Label>
                <Input placeholder="Ingrese los apellidos" type="text" />
                <Label>Direccion</Label>
                <Input placeholder="Ingrese la dirección" type="text" />

                <Label>Municipio</Label>
                <Select
                  items={dataMunicipios}
                  placeholder="Seleccione un departamento"
                  variant="underlined"
                  size="lg"
                >
                  {(muni) => (
                    <SelectItem key={muni.id}>{muni.nombre}</SelectItem>
                  )}
                </Select>

                <Label>Departamento</Label>
                <Select
                  items={dataDepartamentos}
                  placeholder="Seleccione un departamento"
                  variant="underlined"
                  size="lg"
                >
                  {(depto) => (
                    <SelectItem key={depto.id}>{depto.nombre}</SelectItem>
                  )}
                </Select>
                <Label>Fecha de Nacimiento</Label>
                <DatePicker
                  variant="underlined"
                  showMonthAndYearPickers
                  value={value}
                  onChange={setValue}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
