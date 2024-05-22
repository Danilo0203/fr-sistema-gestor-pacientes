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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUsuarioStore } from "../../../../store/usuarios";
import { useForm } from "react-hook-form";
import { useRolStore } from "../../../../store/usuarios/roles";
import { deleteUsuario, updateUsuario } from "helpers/api/usuarios/usuarios";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, UserData } from "types/index";
import { registerUser } from "helpers/api/auth";

export const ModalEditarUsuarios = ({ idUser, updateTable }: ModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const usuarios = useUsuarioStore((state) => state.data);
  const roles = useRolStore((state) => state.data);
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [usuarioEdit, setUsuarioEdit] = useState(null);

  const handleEdit = () => {
    const [editUsuario] = getUsuarioById(idUser, usuarios);
    const dataUsuario = {
      id: editUsuario.id,
      rol: editUsuario.rolID,
    };
    setUsuarioEdit(dataUsuario);
    setValue("usuario", editUsuario.usuario);
    setValue("nombre", editUsuario.nombre);
    setValue("email", editUsuario.email);
  };

  const handleClose = () => {
    navigate("/usuarios/tabla");
  };

  const actualizar = async (data: UserData) => {
    await updateUsuario(usuarioEdit?.id, data);
    updateTable();
  };

  const onSubmit = (data: UserData) => {
    console.log(data);
    actualizar(data);
    onClose();
    reset({ password: "", password_confirm: "" });
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
                          type="password"
                          {...register("password", {
                            required: false,
                          })}
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
                          type="password"
                          {...register("password_confirm", {
                            required: {
                              value: false,
                              message: "Confirmar la contraseña es requerido",
                            },
                            validate: (value) => {
                              if (value === watch("password")) {
                                return true;
                              } else {
                                return "Las contraseñas no coinciden";
                              }
                            },
                          })}
                        >
                          <Icon
                            icon="mdi:lock"
                            width={20}
                            className="text-azulFuerte"
                          />
                        </Input>
                        {
                          <span className="text-xs font-medium italic text-red-600">
                            {errors.password_confirm?.message}
                          </span>
                        }
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label id="rol_id">Rol</Label>
                      <Select
                        aria-label="Rol"
                        items={roles}
                        placeholder="Seleccione un rol"
                        defaultSelectedKeys={[usuarioEdit?.rol]}
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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const roles = useRolStore((state) => state.data);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const añadirUsuario = async (data: UserData) => {
    await registerUser(data);
    updateTable();
  };
  const onSubmit = (data: UserData) => {
    añadirUsuario(data);
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
        Agregar Usuario
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
        size="2xl"
        onClose={() => {
          reset();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar Usuario
                </ModalHeader>
                <Divider />
                <ModalBody className="mt-4 flex flex-col gap-8">
                  <div className="flex gap-8">
                    <div className="flex flex-col gap-1">
                      <Label>Usuario</Label>
                      <Input
                        autoFocus
                        placeholder="Ingrese el usuario"
                        type="text"
                        {...register("usuario", {
                          required: true,
                        })}
                      >
                        <Icon
                          icon="mdi:account"
                          width={20}
                          className="text-azulFuerte"
                        />
                      </Input>
                      {errors.usuario?.type === "required" && (
                        <span className="text-xs font-medium italic text-red-600">
                          El usuario es requerido
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label>Nombre</Label>
                      <Input
                        placeholder="Ingrese el nombre"
                        type="text"
                        {...register("nombre", {
                          required: true,
                        })}
                      >
                        <Icon
                          icon="mdi:account"
                          width={20}
                          className="text-azulFuerte"
                        />
                      </Input>
                      {errors.nombre?.type === "required" && (
                        <span className="text-xs font-medium italic text-red-600">
                          El nombre es requerido
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label>Correo</Label>
                    <Input
                      placeholder="Ingrese el correo"
                      type="email"
                      {...register("email", {
                        required: true,
                      })}
                    >
                      <Icon
                        icon="mdi:email"
                        width={20}
                        className="text-azulFuerte"
                      />
                    </Input>
                    {errors.email?.type === "required" && (
                      <span className="text-xs font-medium italic text-red-600">
                        El correo es requerido
                      </span>
                    )}
                  </div>
                  <div className="flex gap-8">
                    <div className="flex flex-col gap-1">
                      <Label id="password">Contraseña</Label>
                      <Input
                        placeholder="Contraseña"
                        type="password"
                        {...register("password", {
                          minLength: {
                            value: 8,
                            message: "Debe contener al menos 8 caracteres",
                          },
                          required: {
                            value: true,
                            message: "La contraseña es requerida",
                          },
                        })}
                      >
                        <Icon
                          icon="mdi:lock"
                          width={20}
                          className="text-azulFuerte"
                        />
                      </Input>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.password?.message}
                        </span>
                      }
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label id="confirm_password">Confirmar Contraseña</Label>
                      <Input
                        placeholder="Confirmar contraseña"
                        type="password"
                        {...register("confirm_password", {
                          required: {
                            value: true,
                            message: "Confirmar la contraseña es requerido",
                          },
                          validate: (value) => {
                            if (value === watch("password")) {
                              return true;
                            } else {
                              return "Las contraseñas no coinciden";
                            }
                          },
                        })}
                      >
                        <Icon
                          icon="mdi:lock"
                          width={20}
                          className="text-azulFuerte"
                        />
                      </Input>
                      {
                        <span className="text-xs font-medium italic text-red-600">
                          {errors.confirm_password?.message}
                        </span>
                      }
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label id="rol_id">Rol</Label>
                    <Select
                      aria-label="Rol"
                      items={roles}
                      placeholder="Seleccione un rol"
                      size="lg"
                      defaultSelectedKeys={["2"]}
                      {...register("rol_id", {
                        required: true,
                      })}
                    >
                      {(rol) => (
                        <SelectItem key={rol.id}>{rol.nombre}</SelectItem>
                      )}
                    </Select>
                    {errors.rol_id?.type === "required" && (
                      <span className="text-xs font-medium italic text-red-600">
                        El rol es requerido
                      </span>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose();
                      reset();
                    }}
                  >
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
