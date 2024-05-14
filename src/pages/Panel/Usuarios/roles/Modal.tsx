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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRolStore } from "../../../../store/usuarios/roles";
import { deleteUsuario } from "helpers/api/usuarios/usuarios";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, RolData } from "types/index";
import { updateRol } from "helpers/api/usuarios/roles";

export const ModalEditarRoles = ({ idRol, updateTable }: ModalProps) => {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);
  const onOpenChange = useModalStore((state) => state.onOpenChange);
  const roles = useRolStore((state) => state.data);
  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const handleEdit = () => {
    navigate(`/usuarios/rol/editar/${idRol}`);
  };

  const { id } = params;

  const rolID: RolData = getUsuarioById(id, roles)[0];

  useEffect(() => {
    setValue("nombre", rolID.nombre);
    setValue("descripcion", rolID.descripcion);
  }, [rolID.nombre, rolID.descripcion]);

  const handleClose = () => {
    navigate("/usuarios/rol");
  };

  const actualizar = async (data: RolData) => {
    await updateRol(rolID.id, data);
    updateTable();
  };

  const onSubmit = (data: RolData) => {
    actualizar(data);
    navigate("/usuarios/rol");
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
                  Editar Rol
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-1">
                      <Label id="nombre">Rol</Label>
                      <Input placeholder="Editar Rol" {...register("nombre")}>
                        <Icon
                          icon="mdi:account"
                          width={20}
                          className="text-azulFuerte"
                        />
                      </Input>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label id="email">Descripción</Label>
                      <Input
                        placeholder="Editar descripción"
                        {...register("descripcion")}
                      >
                        <Icon
                          icon="mdi:account"
                          width={20}
                          className="text-azulFuerte"
                        />
                      </Input>
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

export const ModalEliminarRoles = ({ idRol, updateTable }: ModalProps) => {
  const roles = useRolStore((state) => state.data);
  const handleDelete = async () => {
    await deleteUsuario(idRol);
    updateTable();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const rolID: RolData = getUsuarioById(idRol, roles)[0];

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
                Eliminar Rol
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    ¿Desea eliminar el rol?
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    {rolID.nombre}
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