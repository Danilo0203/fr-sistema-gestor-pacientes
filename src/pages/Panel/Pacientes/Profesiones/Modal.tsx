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
import { useProfesionStore } from "../../../../store/pacientes/profesiones";
import {
  updateProfesion,
  deleteProfesion,
} from "helpers/api/pacientes/profesiones";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, ProfesionData } from "types/index";

export const ModalEditarProfesion = ({
  idProfesion,
  updateTable,
}: ModalProps) => {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);
  const onOpenChange = useModalStore((state) => state.onOpenChange);
  const profesiones = useProfesionStore((state) => state.data);
  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const handleEdit = () => {
    navigate(`/pacientes/profesion/editar/${idProfesion}`);
  };

  const { id } = params;

  const profesionID: ProfesionData = getUsuarioById(id, profesiones)[0];

  useEffect(() => {
    setValue("nombre", profesionID.nombre);
  }, [profesionID.nombre, setValue]);

  const handleClose = () => {
    navigate("/pacientes/profesion");
  };

  const actualizar = async (data: ProfesionData) => {
    await updateProfesion(profesionID.id, data);
    updateTable();
  };

  const onSubmit = (data: ProfesionData) => {
    actualizar(data);
    navigate("/pacientes/profesion");
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
                  Editar Profesión
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

export const ModalEliminarProfesion = ({
  idProfesion,
  updateTable,
}: ModalProps) => {
  const profesiones = useProfesionStore((state) => state.data);
  const handleDelete = async () => {
    await deleteProfesion(idProfesion);
    updateTable();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const profesionID: ProfesionData = getUsuarioById(
    idProfesion,
    profesiones,
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
                Eliminar Profesión
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    ¿Desea eliminar la Profesión:
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    {profesionID.nombre} ?
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
