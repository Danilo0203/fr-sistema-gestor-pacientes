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
import { useModalStore } from "../../../../store/modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEstadoCivilStore } from "../../../../store/pacientes/estadoCivil";
import {
  updateEstadoCivil,
  deleteEstadoCivil,
} from "helpers/api/pacientes/estado-civil";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, EstadoCivilData } from "types/index";

export const ModalEditarEstadoCivil = ({
  idEstadoCivil,
  updateTable,
}: ModalProps) => {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);
  const onOpenChange = useModalStore((state) => state.onOpenChange);
  const estadoCiviles = useEstadoCivilStore((state) => state.data);
  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const handleEdit = () => {
    navigate(`/pacientes/estado-civil/editar/${idEstadoCivil}`);
  };

  const { id } = params;

  const estadoCivilID: EstadoCivilData = getUsuarioById(id, estadoCiviles)[0];

  useEffect(() => {
    setValue("nombre", estadoCivilID.nombre);
  }, [estadoCivilID.nombre, setValue]);

  const handleClose = () => {
    navigate("/pacientes/estado-civil");
  };

  const actualizar = async (data: EstadoCivilData) => {
    await updateEstadoCivil(estadoCivilID.id, data);
    updateTable();
  };

  const onSubmit = (data: EstadoCivilData) => {
    actualizar(data);
    navigate("/pacientes/estado-civil");
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
                  Editar Estado Civil
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
