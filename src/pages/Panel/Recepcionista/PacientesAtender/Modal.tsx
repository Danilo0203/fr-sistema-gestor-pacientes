import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";

import { useForm } from "react-hook-form";

import { useProfesionStore } from "../../../../store/pacientes/profesiones";
import { useEstadoCivilStore } from "../../../../store/pacientes/estadoCivil";
import { useGeneroStore } from "../../../../store/pacientes/generos";

import { createPaciente } from "helpers/api/pacientes/pacientes";

import { ModalProps } from "types/index";
import { useDepartamentoStore } from "../../../../store/direcciones/departamentos";
import { useDireccionStore } from "../../../../store/direcciones/direcciones";
import { useMunicipioStore } from "../../../../store/direcciones/municipios";
import { createDireccion } from "helpers/api/direccion/direcciones";
import { createEstadoCivil } from "helpers/api/pacientes/estado-civil";
import { createProfesion } from "helpers/api/pacientes/profesiones";
import { useState } from "react";
import { useDatosMedicosStore } from "../../../../store/datosMedicos/datosMedicos";
import { createDatoMedicoPaciente } from "helpers/api/datosMedicos/datos-medicos-paciente";
import { format } from "@formkit/tempo";

export const ModalAgregarPaciente = ({
  updateTable,
  updateRecepcion,
}: ModalProps) => {
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
  const updateProfesiones = useProfesionStore((state) => state.execute);
  const updateEstadoCivil = useEstadoCivilStore((state) => state.execute);
  const updateDireccion = useDireccionStore((state) => state.execute);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const agregarPaciente = async (data) => {
    await createPaciente(data);
    updateTable();
    updateRecepcion();
    updateDireccion();
    updateEstadoCivil();
    updateProfesiones();
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
    let idDireccion =
      direccionSelect || buscarPorId(nombreDireccion, dataDireccion);
    let idEstadoCivil =
      estadoCivilSelect || buscarPorId(estado_civil_id, dataEstadoCivil);
    let idProfesion =
      profesionSelect || buscarPorId(profesion_id, dataProfesiones);
    const idGenero = buscarPorId(genero_id, dataGeneros);

    if (!idDireccion) {
      const datosMunicipio = {
        nombre: valueDireccion,
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

    onClose();
    agregarPaciente(datosPaciente);
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
                        onSelectionChange={(key) => setEstadoCivilSelect(key)}
                        //   handleSelectionChange(
                        //     key,
                        //     setEstadoCivilSelect,
                        //     valueEstadoCivil,
                        //     dataEstadoCivil,
                        //     agregarEstadoCivil,
                        //   )
                        // }
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
                        onSelectionChange={(key) => setProfesionSelect(key)}
                        // handleSelectionChange(
                        // key,
                        // setProfesionSelect,
                        // valueProfesion,
                        // dataProfesiones,
                        // agregarProfesion,
                        // )
                        // }
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
                      onSelectionChange={(key) => setDireccionSelect(key)}
                      // handleSelectionChange(
                      // key,
                      // setDireccionSelect,
                      // valueDireccion,
                      // dataDireccion,
                      // agregarDireccion,
                      // )
                      // }
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

export const ActualizarDatosMedicos = ({
  idPaciente,
}: {
  idPaciente: string;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const l = "en";
  const t = new Date();

  const datosMedicos = useDatosMedicosStore((state) => state.data);

  // funcion para buscar el id del dato medico
  const buscarPorId = (nombre: string, datos: string[]) => {
    const item = datos.find((item) => item.nombre === nombre);
    return item ? item.id : null;
  };
  const onSubmitDatosMedicos = (data) => {
    data = {
      ...data,
      fecha: format(t, "YYYY-MM-DD", l),
      paciente_id: idPaciente,
      dato_medico_id: buscarPorId(data.dato_medico_id, datosMedicos),
    };
    createDatoMedicoPaciente(data);
    reset();
    onClose();
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <>
      <Button onPress={onOpen} className="bg-azulFuerte text-white">
        Actualizar datos medicos
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
        onClose={handleClose}
      >
        <ModalContent>
          {() => (
            <>
              <form onSubmit={handleSubmit(onSubmitDatosMedicos)}>
                <ModalHeader className="flex flex-col gap-1">
                  Actualizar Datos Medicos
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4 flex flex-col gap-6">
                  <div className="flex gap-8">
                    <div className="flex flex-grow flex-col gap-4">
                      <Label>Dato Medico</Label>
                      <Autocomplete
                        defaultItems={datosMedicos}
                        placeholder="Seleccione un dato medico"
                        variant="underlined"
                        size="lg"
                        aria-label="dato medico"
                        {...register("dato_medico_id", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                        })}
                      >
                        {(datoMedico) => (
                          <AutocompleteItem key={datoMedico.id}>
                            {datoMedico.nombre}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.dato_medico_id?.message}
                        </span>
                      }
                      <div>
                        <Input
                          placeholder="Ingrese el valor"
                          type="number"
                          step={0.01}
                          {...register("valor", {
                            required: {
                              value: true,
                              message: "Este campo es requerido",
                            },
                          })}
                        />
                        {
                          <span className="text-xs font-medium italic text-red-600">
                            {errors.valor?.message}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={handleClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit">
                    Actualizar
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
