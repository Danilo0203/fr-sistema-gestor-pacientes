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

import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDepartamentoStore } from "../../../../store/direcciones/departamentos";
import {
  updateDepartamento,
  deleteDepartamento,
} from "helpers/api/direccion/departamentos";
import { getUsuarioById } from "../../../../utils/getUsuarioById";
import { ModalProps, DepartamentoData } from "types/index";

export const ModalEditarDepartamento = ({
  idDepartamento,
  updateTable,
}: ModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const departamentos = useDepartamentoStore((state) => state.data);
  const { setValue, register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const handleEdit = () => {
    navigate(`/direcciones/departamento/editar/${idDepartamento}`);
  };

  const { id } = params;

  const departamentoID: DepartamentoData = getUsuarioById(id, departamentos)[0];

  useEffect(() => {
    setValue("nombre", departamentoID.nombre);
  }, [departamentoID.nombre, setValue]);

  const handleClose = () => {
    navigate("/direcciones/departamento");
  };

  const actualizar = async (data: DepartamentoData) => {
    await updateDepartamento(departamentoID.id, data);
    updateTable();
  };

  const onSubmit = (data: DepartamentoData) => {
    actualizar(data);
    navigate("/direcciones/departamento");
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
        // size="2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-azulFuerte">
                  Editar Departamento
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <Label id="nombre">Nombre</Label>
                  <Input placeholder="Editar nombre" {...register("nombre")}>
                    <Icon
                      icon="mdi:account"
                      width={20}
                      className="text-azulFuerte"
                    />
                  </Input>
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

export const ModalEliminarDepartamento = ({
  idDepartamento,
  updateTable,
}: ModalProps) => {
  const departamentos = useDepartamentoStore((state) => state.data);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const handleDelete = async () => {
    await deleteDepartamento(idDepartamento);
    updateTable();
  };

  const departamentoID: DepartamentoData = getUsuarioById(
    idDepartamento,
    departamentos,
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
                Eliminar Departamento
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center gap-2 py-4">
                  <h2 className="text-xl font-medium">
                    Desea eliminar el departamento:
                  </h2>
                  <h3 className="text-2xl font-bold text-red-600">
                    ¿{departamentoID.nombre}?
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
