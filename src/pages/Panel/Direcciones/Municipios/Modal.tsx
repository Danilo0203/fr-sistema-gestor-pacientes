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
import { useModalStore } from "../../../../store/modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMunicipioStore } from "../../../../store/direcciones/municipios";
import { useDepartamentoStore } from "../../../../store/direcciones/departamentos";
import {
  updateMunicipio,
  deleteMunicipio,
} from "helpers/api/direccion/municipios";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, MunicipioData } from "types/index";

export const ModalEditarMunicipio = ({
  idMunicipio,
  updateTable,
}: ModalProps) => {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);
  const onOpenChange = useModalStore((state) => state.onOpenChange);
  const municipios = useMunicipioStore((state) => state.data);
  const departamentos = useDepartamentoStore((state) => state.data);
  const getDepartamentos = useDepartamentoStore((state) => state.execute);

  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getDepartamentos();
  }, [getDepartamentos]);

  const handleEdit = () => {
    navigate(`/direcciones/municipio/editar/${idMunicipio}`);
  };

  const { id } = params;

  const municipioID: MunicipioData = getUsuarioById(id, municipios)[0];

  useEffect(() => {
    setValue("nombre", municipioID.nombre);
    setValue("departamento", municipioID.departamento);
  }, [municipioID.nombre, municipioID.departamento]);

  const handleClose = () => {
    navigate("/direcciones/municipio");
  };

  const actualizar = async (data: MunicipioData) => {
    await updateMunicipio(municipioID.id, data);
    updateTable();
  };

  const onSubmit = (data: MunicipioData) => {
    actualizar(data);
    navigate("/direcciones/municipio");
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
                  Editar Municipio
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
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label id="departamento_id">Departamento</Label>
                      <Select
                        items={departamentos}
                        placeholder="Seleccione un departamento"
                        defaultSelectedKeys={[municipioID.departamentoID]}
                        size="lg"
                        {...register("departamento_id")}
                      >
                        {(departamento) => (
                          <SelectItem key={departamento.id}>
                            {departamento.nombre}
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
