import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { useModalStore } from "../../../store/modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUsuario } from "helpers/api/usuarios/usuarios";
import { useUsuarioStore } from "../../../store/usuarios";
import { useForm } from "react-hook-form";

export const ModalEditarUsuarios = ({ idUser }: { idUser?: string }) => {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);
  const onOpenChange = useModalStore((state) => state.onOpenChange);
  const usuarioID = useUsuarioStore((state) => state.usuarioId);
  const setUsuarioID = useUsuarioStore((state) => state.setUsuarioId);
  const navigate = useNavigate();
  const params = useParams();
  const { setValue, register } = useForm();

  const handleEdit = () => {
    navigate(`/usuarios/tabla/editar/${idUser}`);
  };

  const getUsuarioId = async (id: string) => {
    const usuarios = await getUsuario(id);
    setUsuarioID(usuarios);
  };

  const { id } = params;
  useEffect(() => {
    if (!id) return;
    getUsuarioId(id);
  }, [id]);

  useEffect(() => {
    setValue("usuario", usuarioID.usuario);
    setValue("nombre", usuarioID.nombre);
    setValue("correo", usuarioID.email);
  }, [usuarioID.usuario, usuarioID.nombre, usuarioID.email]);
  const handleClose = () => {
    navigate("/usuarios/tabla");
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Usuario
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <Label>Usuario</Label>
                    <Input
                      placeholder="Editar usuario"
                      {...register("usuario")}
                    >
                      <Icon
                        icon="mdi:account"
                        width={20}
                        className="text-azulFuerte"
                      />
                    </Input>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label>Nombre</Label>
                    <Input placeholder="Editar nombre" {...register("nombre")}>
                      <Icon
                        icon="mdi:account"
                        width={20}
                        className="text-azulFuerte"
                      />
                    </Input>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label>Correo</Label>
                    <Input placeholder="Editar correo" {...register("correo")}>
                      <Icon
                        icon="mdi:account"
                        width={20}
                        className="text-azulFuerte"
                      />
                    </Input>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
