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
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePacienteStore } from "../../../../store/pacientes/pacientes";
import { useProfesionStore } from "../../../../store/pacientes/profesiones";
import { useEstadoCivilStore } from "../../../../store/pacientes/estadoCivil";
import { useGeneroStore } from "../../../../store/pacientes/generos";

import {
  createPaciente,
  deletePaciente,
  updatePaciente,
} from "helpers/api/pacientes/pacientes";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, PacienteData } from "types/index";
import { useDepartamentoStore } from "../../../../store/direcciones/departamentos";
import { useDireccionStore } from "../../../../store/direcciones/direcciones";
import { useMunicipioStore } from "../../../../store/direcciones/municipios";
import { createDireccion } from "helpers/api/direccion/direcciones";
import { createEstadoCivil } from "helpers/api/pacientes/estado-civil";
import { createProfesion } from "helpers/api/pacientes/profesiones";

export const ModalEditarPaciente = memo(
  ({ idPaciente, updateTable }: ModalProps) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [pacienteEdit, setPacienteEdit] = useState(null);
    const pacientes = usePacienteStore((state) => state.data);
    const dataDireccion = useDireccionStore((state) => state.data);
    const dataProfesiones = useProfesionStore((state) => state.data);
    const dataEstadoCivil = useEstadoCivilStore((state) => state.data);
    const dataGeneros = useGeneroStore((state) => state.data);

    const {
      setValue,
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

    useEffect(() => {
      if (pacienteEdit) {
        setValue("nombre", pacienteEdit.nombre);
        setValue("apellido", pacienteEdit.apellido);
        setValue("fecha_nacimiento", pacienteEdit.fecha_nacimiento);
        setValue("profesion_id", pacienteEdit.profesion);
        setValue("estado_civil_id", pacienteEdit.estadoCivil);
        setValue("genero_id", pacienteEdit.genero);
        setValue("direccion_id", pacienteEdit.direccion);
      }
    }, [pacienteEdit, setValue]);

    const handleEdit = () => {
      const [paciente] = getUsuarioById(idPaciente, pacientes);
      const dataPaciente = {
        id: paciente.id,
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        fecha_nacimiento: paciente.fecha_nacimiento,
        direccion: paciente.direccion,
        profesion: paciente.profesion,
        estadoCivil: paciente.estadoCivil,
        genero: paciente.genero,
        estadoCivilID: paciente.estadoCivilID,
        direccionID: paciente.direccionID,
        generoID: paciente.generoID,
        profesionID: paciente.profesionID,
        deptoID: paciente.deptoID,
      };
      setPacienteEdit(dataPaciente);
    };

    const handleClose = () => {
      onClose();
      reset();
    };

    const actualizar = async (data: PacienteData) => {
      await updatePaciente(pacienteEdit.id, data);
      updateTable();
    };

    // Funcion para buscar el nombre del genero, direccion, profesion y estado civil  y devolver el id
    const buscarPorId = (nombre: string, datos: string[]) => {
      const item = datos.find((item) => item.nombre === nombre);
      return item ? item.id : null;
    };

    const onSubmit = async (data: PacienteData) => {
      data.genero_id = buscarPorId(data.genero_id, dataGeneros);
      data.estado_civil_id = buscarPorId(data.estado_civil_id, dataEstadoCivil);
      data.profesion_id = buscarPorId(data.profesion_id, dataProfesiones);
      data.direccion_id = buscarPorId(data.direccion_id, dataDireccion);
      await actualizar(data);
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
          size="3xl"
          onClose={handleClose}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-azulFuerte">
                    Editar Paciente
                  </ModalHeader>
                  <Divider />
                  <ModalBody className="mt-4 flex flex-col gap-6">
                    <div className="flex gap-8">
                      <div className="flex flex-grow flex-col gap-1">
                        <Label>Nombres</Label>
                        <Input
                          autoFocus
                          placeholder="Ingrese el nombre"
                          type="text"
                          {...register("nombre", {
                            required: {
                              value: true,
                              message: "Este campo es requerido",
                            },
                          })}
                        >
                          <Icon icon="mdi:user" />
                        </Input>
                        {
                          <span className="text-xs font-medium italic text-red-600">
                            {errors.nombre?.message}
                          </span>
                        }
                      </div>
                      <div className="flex flex-grow flex-col gap-1">
                        <Label>Apellidos</Label>
                        <Input
                          placeholder="Ingrese los apellidos"
                          type="text"
                          {...register("apellido", {
                            required: {
                              value: true,
                              message: "Este campo es requerido",
                            },
                          })}
                        >
                          <Icon icon="mdi:user" />
                        </Input>
                        {
                          <span className="text-xs font-medium italic text-red-600">
                            {errors.apellido?.message}
                          </span>
                        }
                      </div>
                    </div>

                    <div className="flex gap-8">
                      <div className="flex flex-1 flex-col gap-1">
                        <Label>Genero</Label>
                        <Select
                          items={dataGeneros}
                          placeholder="Seleccione un genero"
                          variant="underlined"
                          size="lg"
                          aria-label="genero"
                          defaultSelectedKeys={[pacienteEdit?.genero]}
                          {...register("genero_id", {
                            required: {
                              value: true,
                              message: "Este campo es requerido",
                            },
                          })}
                        >
                          {(genero) => (
                            <SelectItem key={genero.nombre}>
                              {genero.nombre}
                            </SelectItem>
                          )}
                        </Select>
                        {
                          <span className="text-xs font-medium italic text-red-600">
                            {errors.genero_id?.message}
                          </span>
                        }
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <Label>Estado Civil</Label>
                        <Select
                          items={dataEstadoCivil}
                          placeholder="Seleccione un estado civil"
                          variant="underlined"
                          size="lg"
                          defaultSelectedKeys={[pacienteEdit?.estadoCivil]}
                          aria-label="estado civil"
                          {...register("estado_civil_id", {
                            required: {
                              value: true,
                              message: "Este campo es requerido",
                            },
                          })}
                        >
                          {(civil) => (
                            <SelectItem key={civil.nombre}>
                              {civil.nombre}
                            </SelectItem>
                          )}
                        </Select>
                        {
                          <span className="text-xs font-medium italic text-red-600">
                            {errors.estado_civil_id?.message}
                          </span>
                        }
                      </div>
                    </div>

                    <div className="flex gap-8">
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex flex-col gap-3">
                          <Label>Fecha de Nacimiento</Label>
                          <Input
                            type="date"
                            placeholder="Editar fecha de nacimiento"
                            {...register("fecha_nacimiento", {
                              required: {
                                value: true,
                                message: "Este campo es requerido",
                              },
                            })}
                          ></Input>
                        </div>
                        {
                          <span className="text-xs font-medium italic text-red-600">
                            {errors.fecha_nacimiento?.message}
                          </span>
                        }
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <Label>Profesión</Label>
                        <Select
                          items={dataProfesiones}
                          placeholder="Seleccione una profesión"
                          variant="underlined"
                          size="lg"
                          defaultSelectedKeys={[pacienteEdit?.profesion]}
                          aria-label="profesion"
                          {...register("profesion_id", {
                            required: {
                              value: true,
                              message: "Este campo es requerido",
                            },
                          })}
                        >
                          {(profesion) => (
                            <SelectItem key={profesion.nombre}>
                              {profesion.nombre}
                            </SelectItem>
                          )}
                        </Select>
                        {
                          <span className="text-xs font-medium italic text-red-600">
                            {errors.profesion_id?.message}
                          </span>
                        }
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label>Direccion</Label>
                      <Select
                        items={dataDireccion}
                        placeholder="Seleccione una dirección"
                        variant="underlined"
                        size="lg"
                        defaultSelectedKeys={[pacienteEdit?.direccion]}
                        aria-label="direccion"
                        {...register("direccion_id", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                        })}
                      >
                        {(direccion) => (
                          <SelectItem key={direccion.nombre}>
                            {direccion.nombre}
                          </SelectItem>
                        )}
                      </Select>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.direccion_id?.message}
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
  },
);

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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dataDepartamentos = useDepartamentoStore((state) => state.data);
  const dataMunicipios = useMunicipioStore((state) => state.data);
  const dataGeneros = useGeneroStore((state) => state.data);
  const dataEstadoCivil = useEstadoCivilStore((state) => state.data);
  const dataProfesiones = useProfesionStore((state) => state.data);
  const [deptoSelect, setDeptoSelect] = useState("17");
  const dataDireccion = useDireccionStore((state) => state.data);
  const [direccionSelect, setDireccionSelect] = useState("");
  const [valueDireccion, setValueDireccion] = useState("");
  const [estadoCivilSelect, setEstadoCivilSelect] = useState("");
  const [valueEstadoCivil, setValueEstadoCivil] = useState("");
  const [profesionSelect, setProfesionSelect] = useState("");
  const [valueProfesion, setValueProfesion] = useState("");
  const updateProfesiones = useProfesionStore((state) => state.init);
  const updateEstadoCivil = useEstadoCivilStore((state) => state.init);
  const updateDireccion = useDireccionStore((state) => state.init);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSelectionChange = (
    key,
    setSelectFunction,
    value,
    dataStore,
    addFunction,
  ) => {
    setSelectFunction(key);

    const selectedItem = dataStore.find((item) => item.id == key);
    if (!selectedItem) {
      const newItem = {
        nombre: value,
      };
      addFunction(newItem);
    }
  };

  const agregarDireccion = async (data) => {
    await createDireccion(data);
    updateTable();
    updateDireccion();
  };

  const agregarEstadoCivil = async (data) => {
    await createEstadoCivil(data);
    updateTable();
    updateEstadoCivil();
  };

  const agregarProfesion = async (data) => {
    await createProfesion(data);
    updateTable();
    updateProfesiones();
  };

  const agregarPaciente = async (data) => {
    await createPaciente(data);
    updateTable();
  };

  const buscarMunicipiosPorDepto = (id: string) => {
    const municipios = dataMunicipios.filter(
      (muni) => muni.departamentoID == id,
    );
    return municipios;
  };

  const municipiosPorDepto = buscarMunicipiosPorDepto(deptoSelect);

  const buscarPorId = (nombre: string, datos: string[]) => {
    const item = datos.find((item) => item.nombre === nombre);
    return item ? item.id : null;
  };

  const onSubmitDireccion = async (data) => {
    const {
      nombreDireccion,
      nombrePaciente,
      apellido,
      fecha_nacimiento,
      genero_id,
      estado_civil_id,
      profesion_id,
      municipio_id,
    } = data;

    const idMunicipio = buscarPorId(municipio_id, dataMunicipios);
    let idEstadoCivil =
      estadoCivilSelect || buscarPorId(estado_civil_id, dataEstadoCivil);
    let idProfesion =
      profesionSelect || buscarPorId(profesion_id, dataProfesiones);
    const idGenero = buscarPorId(genero_id, dataGeneros);
    let idDireccion = direccionSelect;

    if (!idDireccion) {
      const datosMunicipio = {
        nombre: nombreDireccion,
        municipio_id: idMunicipio,
      };

      const newDireccion = await createDireccion(datosMunicipio);
      idDireccion = newDireccion.data.id;
    }

    if (!idEstadoCivil) {
      const newEstadoCivil = await createEstadoCivil({
        nombre: valueEstadoCivil,
      });
      idEstadoCivil = newEstadoCivil.data.id;
    }

    if (!idProfesion) {
      const newProfesion = await createProfesion({ nombre: valueProfesion });
      idProfesion = newProfesion.data.id;
    }

    const datosPaciente = {
      nombre: nombrePaciente,
      apellido,
      fecha_nacimiento,
      genero_id: idGenero,
      estado_civil_id: idEstadoCivil,
      profesion_id: idProfesion,
      direccion_id: idDireccion,
      municipio_id: idMunicipio,
    };

    agregarPaciente(datosPaciente);
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
        Agregar Paciente
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
        size="3xl"
        onClose={handleClose}
      >
        <ModalContent>
          {() => (
            <>
              <form onSubmit={handleSubmit(onSubmitDireccion)}>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar Paciente
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4 flex flex-col gap-6">
                  <div className="flex gap-8">
                    <div className="flex flex-grow flex-col gap-1">
                      <Label>Nombres</Label>
                      <Input
                        autoFocus
                        placeholder="Ingrese el nombre"
                        type="text"
                        {...register("nombrePaciente", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                        })}
                      >
                        <Icon icon="mdi:user" />
                      </Input>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.nombrePaciente?.message}
                        </span>
                      }
                    </div>
                    <div className="flex flex-grow flex-col gap-1">
                      <Label>Apellidos</Label>
                      <Input
                        placeholder="Ingrese los apellidos"
                        type="text"
                        {...register("apellido", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                        })}
                      >
                        <Icon icon="mdi:user" />
                      </Input>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.apellido?.message}
                        </span>
                      }
                    </div>
                  </div>

                  <div className="flex gap-8">
                    <div className="flex flex-grow flex-col gap-1">
                      <Label>Genero</Label>
                      <Autocomplete
                        defaultItems={dataGeneros}
                        placeholder="Seleccione un genero"
                        variant="underlined"
                        size="lg"
                        aria-label="genero"
                        {...register("genero_id", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                        })}
                      >
                        {(genero) => (
                          <AutocompleteItem key={genero.id}>
                            {genero.nombre}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.genero_id?.message}
                        </span>
                      }
                    </div>
                    <div className="flex flex-grow flex-col gap-1">
                      <Label>Estado Civil</Label>
                      <Autocomplete
                        defaultItems={dataEstadoCivil}
                        placeholder="Seleccione un estado civil"
                        variant="underlined"
                        size="lg"
                        allowsCustomValue={true}
                        onInputChange={(value) => setValueEstadoCivil(value)}
                        onSelectionChange={(key) =>
                          handleSelectionChange(
                            key,
                            setEstadoCivilSelect,
                            valueEstadoCivil,
                            dataEstadoCivil,
                            agregarEstadoCivil,
                          )
                        }
                        aria-label="estado civil"
                        {...register("estado_civil_id", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                        })}
                      >
                        {(civil) => (
                          <AutocompleteItem key={civil.id}>
                            {civil.nombre}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.estado_civil_id?.message}
                        </span>
                      }
                    </div>
                  </div>

                  <div className="flex gap-8">
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex flex-col gap-3">
                        <Label>Fecha de Nacimiento</Label>

                        <Input
                          type="date"
                          placeholder="Editar fecha de nacimiento"
                          {...register("fecha_nacimiento", {
                            required: {
                              value: true,
                              message: "Este campo es requerido",
                            },
                          })}
                        ></Input>
                      </div>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.fecha_nacimiento?.message}
                        </span>
                      }
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <Label>Profesión</Label>
                      <Autocomplete
                        defaultItems={dataProfesiones}
                        placeholder="Seleccione una profesión"
                        variant="underlined"
                        size="lg"
                        allowsCustomValue={true}
                        onInputChange={(value) => setValueProfesion(value)}
                        onSelectionChange={(key) =>
                          handleSelectionChange(
                            key,
                            setProfesionSelect,
                            valueProfesion,
                            dataProfesiones,
                            agregarProfesion,
                          )
                        }
                        aria-label="profesion"
                        {...register("profesion_id", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                        })}
                      >
                        {(profesion) => (
                          <AutocompleteItem key={profesion.id}>
                            {profesion.nombre}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.profesion_id?.message}
                        </span>
                      }
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>Direccion</Label>
                    <Autocomplete
                      defaultItems={dataDireccion}
                      placeholder="Seleccione una dirección"
                      variant="underlined"
                      size="lg"
                      allowsCustomValue={true}
                      onInputChange={(value) => setValueDireccion(value)}
                      onSelectionChange={(key) =>
                        handleSelectionChange(
                          key,
                          setDireccionSelect,
                          valueDireccion,
                          dataDireccion,
                          agregarDireccion,
                        )
                      }
                      aria-label="direccion"
                      {...register("nombreDireccion", {
                        required: {
                          value: true,
                          message: "Este campo es requerido",
                        },
                      })}
                    >
                      {(direccion) => (
                        <AutocompleteItem key={direccion.id}>
                          {direccion.nombre}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    {
                      <span className="text-xs font-medium italic text-red-600">
                        {errors.nombreDireccion?.message}
                      </span>
                    }
                  </div>

                  <div className="flex gap-8">
                    <div className="flex flex-grow flex-col gap-1">
                      <Label>Departamento</Label>
                      <Autocomplete
                        defaultItems={dataDepartamentos}
                        placeholder="Seleccione un departamento"
                        variant="underlined"
                        size="lg"
                        selectedKey={deptoSelect}
                        onSelectionChange={(key) => setDeptoSelect(key)}
                        aria-label="departamento"
                        {...register("departamento_id", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                        })}
                      >
                        {(depto) => (
                          <AutocompleteItem key={depto.id}>
                            {depto.nombre}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.departamento_id?.message}
                        </span>
                      }
                    </div>
                    <div className="flex flex-grow flex-col gap-1">
                      <Label>Municipio</Label>
                      <Autocomplete
                        defaultItems={municipiosPorDepto}
                        placeholder="Seleccione un municipio"
                        variant="underlined"
                        size="lg"
                        aria-label="municipio"
                        {...register("municipio_id", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                        })}
                      >
                        {(muni) => (
                          <AutocompleteItem key={muni.id}>
                            {muni.nombre}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.municipio_id?.message}
                        </span>
                      }
                    </div>
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
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
