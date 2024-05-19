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

import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useUsuarioStore } from "../../../../store/usuarios";
import { useForm } from "react-hook-form";
import { useRolStore } from "../../../../store/usuarios/roles";
import { deleteUsuario, updateUsuario } from "helpers/api/usuarios/usuarios";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, UserData } from "types/index";
import { registerUser } from "helpers/api/auth";

export const ModalEditarUsuarios = ({ idUser, updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const usuarios = useUsuarioStore((state) => state.data);
  const roles = useRolStore((state) => state.data);
  // const getRoles = useRolStore((state) => state.execute);

  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  // useEffect(() => {
  //   getRoles();
  // }, [getRoles]);

  const handleEdit = () => {
    navigate(`/usuarios/tabla/editar/${idUser}`);
  };

  const { id } = params;

  const usuarioID: UserData = getUsuarioById(id, usuarios)[0];

  useEffect(() => {
    setValue("usuario", usuarioID.usuario);
    setValue("nombre", usuarioID.nombre);
    setValue("email", usuarioID.email);
  }, [usuarioID.usuario, usuarioID.nombre, usuarioID.email, setValue]);

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
        placement="top-center"
        size="2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
                        aria-label="Rol"
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
                Eliminar Usuario
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    ¿Desea eliminar el usuario?
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    {usuarioID.usuario}
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

export const ModalAgregarUsuarios = ({ updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const roles = useRolStore((state) => state.data);
  // const getRoles = useRolStore((state) => state.execute);
  const { register, handleSubmit } = useForm();
  // useEffect(() => {
  //   getRoles();
  // }, [getRoles]);

  const añadirUsuario = async (data: UserData) => {
    await registerUser(data);
    updateTable();
  };
  const onSubmit = (data: UserData) => {
    añadirUsuario(data);
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-azulFuerte text-white"
        startContent={<Icon icon="mdi:user-add" width={20} />}
      >
        Agregar Usuario
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Argegar Usuario
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4">
                  <Label>Usuario</Label>
                  <Input
                    autoFocus
                    placeholder="Ingrese el usuario"
                    type="text"
                    {...register("usuario")}
                  />
                  <Label>Nombre</Label>
                  <Input
                    placeholder="Ingrese el nombre"
                    type="text"
                    {...register("nombre")}
                  />
                  <Label>Correo</Label>
                  <Input
                    placeholder="Ingrese el correo"
                    type="email"
                    {...register("email")}
                  />
                  <Label id="password">Contraseña</Label>
                  <Input
                    placeholder="Contraseña"
                    type="password"
                    {...register("password")}
                  >
                    <Icon
                      icon="mdi:lock"
                      width={20}
                      className="text-azulFuerte"
                    />
                  </Input>

                  <Label id="passwordConfirm">Confirmar Contraseña</Label>
                  <Input placeholder="Confirmar contraseña" type="password">
                    <Icon
                      icon="mdi:lock"
                      width={20}
                      className="text-azulFuerte"
                    />
                  </Input>

                  <Label id="rol_id">Rol</Label>
                  <Select
                    aria-label="Rol"
                    items={roles}
                    placeholder="Seleccione un rol"
                    size="lg"
                    {...register("rol_id")}
                  >
                    {(rol) => (
                      <SelectItem key={rol.id}>{rol.nombre}</SelectItem>
                    )}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit" onPress={onClose}>
                    Agregar
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
