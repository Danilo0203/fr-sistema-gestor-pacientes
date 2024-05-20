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
import { useNavigate, useParams } from "react-router-dom";
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
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const pacientes = usePacienteStore((state) => state.data);
    const direcciones = useDireccionStore((state) => state.data);
    const profesiones = useProfesionStore((state) => state.data);
    const estadoCivil = useEstadoCivilStore((state) => state.data);
    const generos = useGeneroStore((state) => state.data);

    const { setValue, register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const params = useParams();

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
          placement="top-center"
          size="3xl"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
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
                        <div className="flex flex-1 flex-col gap-1">
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
                        <div className="flex flex-1 flex-col gap-1">
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
                          <Label id="fechaNacimiento">
                            Fecha de Nacimiento
                          </Label>
                          <Input
                            type="date"
                            placeholder="Editar fecha de nacimiento"
                            {...register("fecha_nacimiento")}
                          >
                            {/* <Icon
                              icon="mdi:calendar"
                              width={20}
                              className="text-azulFuerte"
                            /> */}
                          </Input>
                        </div>
                        <div className="flex w-1/2 flex-col gap-1">
                          <Label id="genero_id">Género</Label>
                          <Select
                            items={generos}
                            placeholder="Seleccione un género"
                            defaultSelectedKeys={[pacienteID.generoID]}
                            size="lg"
                            aria-label="genero"
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
                            aria-label="profesion"
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
                            aria-label="estado civil"
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
                          aria-label="direccion"
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  const { register, handleSubmit } = useForm();

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
  };

  const agregarEstadoCivil = async (data) => {
    await createEstadoCivil(data);
    updateTable();
  };

  const agregarProfesion = async (data) => {
    await createProfesion(data);
    updateTable();
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
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmitDireccion)}>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar Paciente
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4 flex flex-col gap-6">
                  <div className="flex gap-8">
                    <div className="flex flex-grow flex-col">
                      <Label>Nombres</Label>
                      <Input
                        autoFocus
                        placeholder="Ingrese el nombre"
                        type="text"
                        {...register("nombrePaciente")}
                      >
                        <Icon icon="mdi:user" />
                      </Input>
                    </div>
                    <div className="flex flex-grow flex-col">
                      <Label>Apellidos</Label>
                      <Input
                        placeholder="Ingrese los apellidos"
                        type="text"
                        {...register("apellido")}
                      >
                        <Icon icon="mdi:user" />
                      </Input>
                    </div>
                  </div>

                  <div className="flex gap-8">
                    <div className="flex flex-grow flex-col">
                      <Label>Genero</Label>
                      <Autocomplete
                        defaultItems={dataGeneros}
                        placeholder="Seleccione un genero"
                        variant="underlined"
                        size="lg"
                        aria-label="genero"
                        {...register("genero_id")}
                      >
                        {(genero) => (
                          <AutocompleteItem key={genero.id}>
                            {genero.nombre}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    </div>
                    <div className="flex flex-grow flex-col">
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
                        {...register("estado_civil_id")}
                      >
                        {(civil) => (
                          <AutocompleteItem key={civil.id}>
                            {civil.nombre}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    </div>
                  </div>

                  <div className="flex gap-8">
                    <div className="flex flex-1 flex-col gap-3">
                      <Label>Fecha de Nacimiento</Label>

                      <Input
                        type="date"
                        placeholder="Editar fecha de nacimiento"
                        {...register("fecha_nacimiento")}
                      ></Input>
                    </div>
                    <div className="flex flex-1 flex-col">
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
                        {...register("profesion_id")}
                      >
                        {(profesion) => (
                          <AutocompleteItem key={profesion.id}>
                            {profesion.nombre}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    </div>
                  </div>

                  <div>
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
                      {...register("nombreDireccion")}
                    >
                      {(direccion) => (
                        <AutocompleteItem key={direccion.id}>
                          {direccion.nombre}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </div>

                  <div className="flex gap-8">
                    <div className="flex flex-grow flex-col">
                      <Label>Departamento</Label>
                      <Autocomplete
                        defaultItems={dataDepartamentos}
                        placeholder="Seleccione un departamento"
                        variant="underlined"
                        size="lg"
                        selectedKey={deptoSelect}
                        onSelectionChange={setDeptoSelect}
                        aria-label="departamento"
                      >
                        {(depto) => (
                          <AutocompleteItem key={depto.id}>
                            {depto.nombre}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    </div>
                    <div className="flex flex-grow flex-col">
                      <Label>Municipio</Label>
                      <Autocomplete
                        defaultItems={municipiosPorDepto}
                        placeholder="Seleccione un municipio"
                        variant="underlined"
                        size="lg"
                        aria-label="municipio"
                        {...register("municipio_id")}
                      >
                        {(muni) => (
                          <AutocompleteItem key={muni.id}>
                            {muni.nombre}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit" onPress={onClose}>
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
