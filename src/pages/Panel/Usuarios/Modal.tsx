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
import { useModalStore } from "../../../store/modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useUsuarioStore } from "../../../store/usuarios";
import { useForm } from "react-hook-form";
import { useRolStore } from "../../../store/usuarios/roles";
import { deleteUsuario, updateUsuario } from "helpers/api/usuarios/usuarios";
import { getUsuarioById } from "../../../utils/getUsuarioById";
import { ModalProps, UserData } from "types/index";
import { Backdrop } from "@mui/material";

export const ModalEditarUsuarios = ({ idUser, updateTable }: ModalProps) => {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);
  const onOpenChange = useModalStore((state) => state.onOpenChange);
  const usuarios = useUsuarioStore((state) => state.data);
  const roles = useRolStore((state) => state.data);
  const getRoles = useRolStore((state) => state.execute);

  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const handleEdit = () => {
    navigate(`/usuarios/tabla/editar/${idUser}`);
  };

  const { id } = params;

  const usuarioID: UserData = getUsuarioById(id, usuarios)[0];

  useEffect(() => {
    setValue("usuario", usuarioID.usuario);
    setValue("nombre", usuarioID.nombre);
    setValue("email", usuarioID.email);
  }, [usuarioID.usuario, usuarioID.nombre, usuarioID.email]);

  const handleClose = () => {
    navigate("/usuarios/tabla");
  };

  const actualizar = async (data: UserData) => {
    await updateUsuario(usuarioID.id, data);
    updateTable();
  };

  const onSubmit = (data: UserData) => {
    actualizar(data);
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
                  Editar Usuario
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <div className="flex flex-col gap-8">
                    <div className="flex gap-8">
                      <div className="flex flex-col gap-1">
                        <Label id="usuario">Usuario</Label>
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
                      <Label id="email">Correo</Label>
                      <Input placeholder="Editar correo" {...register("email")}>
                        <Icon
                          icon="mdi:account"
                          width={20}
                          className="text-azulFuerte"
                        />
                      </Input>
                    </div>
                    <div className="flex gap-8">
                      <div className="flex flex-col gap-1">
                        <Label id="password">Contraseña</Label>
                        <Input
                          placeholder="Editar contraseña"
                          {...register("password")}
                        >
                          <Icon
                            icon="mdi:lock"
                            width={20}
                            className="text-azulFuerte"
                          />
                        </Input>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label id="passwordConfirm">Confirmar Contraseña</Label>
                        <Input
                          placeholder="Editar contraseña"
                          {...register("passwordConfirm")}
                        >
                          <Icon
                            icon="mdi:lock"
                            width={20}
                            className="text-azulFuerte"
                          />
                        </Input>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label id="rol_id">Rol</Label>
                      <Select
                        items={roles}
                        placeholder="Seleccione un rol"
                        defaultSelectedKeys={[usuarioID.rolID]}
                        size="lg"
                        {...register("rol_id")}
                      >
                        {(rol) => (
                          <SelectItem key={rol.id}>{rol.nombre}</SelectItem>
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

export const ModalEliminarUsuarios = ({ idUser, updateTable }: ModalProps) => {
  const usuarios = useUsuarioStore((state) => state.data);
  const handleDelete = async () => {
    await deleteUsuario(idUser);
    updateTable();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const usuarioID: UserData = getUsuarioById(idUser, usuarios)[0];

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
                Eliminar Usuario
              </ModalHeader>
              <ModalBody>
                <h2>Desea eliminar el usuario {usuarioID.nombre} </h2>
                <h3> Usuario 1 </h3>
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
